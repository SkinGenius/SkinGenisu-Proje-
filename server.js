require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const vision = require('@google-cloud/vision');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer ayarları
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Google Cloud Vision client
const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// Cilt analizi endpoint'i
app.post('/api/analyze-skin', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Lütfen bir fotoğraf yükleyin' });
        }

        // Görüntüyü Google Cloud Vision API'ye gönder
        const [result] = await client.faceDetection({
            image: {
                content: req.file.buffer
            }
        });

        // Cilt analizi sonuçlarını işle
        const skinAnalysis = analyzeSkinImage(result);

        // Kullanıcının seçtiği cilt tipi ve sorunları
        const userInput = {
            skinType: req.body.skinType,
            skinIssues: req.body.skinIssues ? req.body.skinIssues.split(',') : []
        };

        // Önerileri oluştur
        const recommendations = generateRecommendations(skinAnalysis, userInput);

        res.json({
            skinCondition: {
                ...skinAnalysis,
                type: userInput.skinType,
                issues: userInput.skinIssues
            },
            recommendations
        });

    } catch (error) {
        console.error('Analiz hatası:', error);
        res.status(500).json({ error: 'Cilt analizi sırasında bir hata oluştu' });
    }
});

// Cilt analizi fonksiyonu
function analyzeSkinImage(visionResult) {
    // Google Cloud Vision API sonuçlarını işle
    const faces = visionResult.faceAnnotations || [];
    
    if (faces.length === 0) {
        return {
            hydration: 0,
            oiliness: 0,
            sensitivity: 0
        };
    }

    const face = faces[0];
    
    // Yüz özelliklerini analiz et
    const hydration = calculateHydration(face);
    const oiliness = calculateOiliness(face);
    const sensitivity = calculateSensitivity(face);

    return {
        hydration,
        oiliness,
        sensitivity
    };
}

// Nem seviyesi hesaplama
function calculateHydration(face) {
    // Yüz özelliklerine göre nem seviyesini hesapla
    // Bu örnek bir hesaplama, gerçek uygulamada daha karmaşık olabilir
    const baseScore = 50;
    const adjustments = {
        joyLikelihood: face.joyLikelihood === 'VERY_LIKELY' ? 10 : 0,
        sorrowLikelihood: face.sorrowLikelihood === 'VERY_LIKELY' ? -10 : 0,
        angerLikelihood: face.angerLikelihood === 'VERY_LIKELY' ? -5 : 0
    };

    return Math.min(100, Math.max(0, baseScore + 
        adjustments.joyLikelihood + 
        adjustments.sorrowLikelihood + 
        adjustments.angerLikelihood));
}

// Yağ seviyesi hesaplama
function calculateOiliness(face) {
    // Yüz özelliklerine göre yağ seviyesini hesapla
    const baseScore = 50;
    const adjustments = {
        joyLikelihood: face.joyLikelihood === 'VERY_LIKELY' ? 5 : 0,
        surpriseLikelihood: face.surpriseLikelihood === 'VERY_LIKELY' ? 10 : 0
    };

    return Math.min(100, Math.max(0, baseScore + 
        adjustments.joyLikelihood + 
        adjustments.surpriseLikelihood));
}

// Hassasiyet seviyesi hesaplama
function calculateSensitivity(face) {
    // Yüz özelliklerine göre hassasiyet seviyesini hesapla
    const baseScore = 50;
    const adjustments = {
        angerLikelihood: face.angerLikelihood === 'VERY_LIKELY' ? 15 : 0,
        sorrowLikelihood: face.sorrowLikelihood === 'VERY_LIKELY' ? 10 : 0
    };

    return Math.min(100, Math.max(0, baseScore + 
        adjustments.angerLikelihood + 
        adjustments.sorrowLikelihood));
}

// Öneriler oluşturma
function generateRecommendations(skinAnalysis, userInput) {
    const recommendations = [];

    // Nem seviyesine göre öneriler
    if (skinAnalysis.hydration < 40) {
        recommendations.push('Cildiniz kuru görünüyor. Nemlendirici kullanmanızı öneririz.');
    } else if (skinAnalysis.hydration > 70) {
        recommendations.push('Cildiniz iyi nemlenmiş durumda. Bu rutini koruyun.');
    }

    // Yağ seviyesine göre öneriler
    if (skinAnalysis.oiliness > 70) {
        recommendations.push('Cildinizde fazla yağlanma var. Yağ düzenleyici ürünler kullanmanızı öneririz.');
    } else if (skinAnalysis.oiliness < 30) {
        recommendations.push('Cildiniz kuru görünüyor. Nemlendirici kullanmanızı öneririz.');
    }

    // Hassasiyet seviyesine göre öneriler
    if (skinAnalysis.sensitivity > 70) {
        recommendations.push('Cildiniz hassas görünüyor. Yumuşak ve hipoalerjenik ürünler kullanmanızı öneririz.');
    }

    // Cilt tipine göre öneriler
    switch (userInput.skinType) {
        case 'dry':
            recommendations.push('Kuru cilt tipiniz için zengin nemlendiriciler kullanın.');
            break;
        case 'oily':
            recommendations.push('Yağlı cilt tipiniz için yağsız ve matlaştırıcı ürünler tercih edin.');
            break;
        case 'combination':
            recommendations.push('Karma cilt tipiniz için bölgesel bakım yapın.');
            break;
        case 'sensitive':
            recommendations.push('Hassas cilt tipiniz için hipoalerjenik ürünler kullanın.');
            break;
    }

    // Cilt sorunlarına göre öneriler
    userInput.skinIssues.forEach(issue => {
        switch (issue) {
            case 'acne':
                recommendations.push('Sivilce sorununuz için salisilik asit içeren ürünler kullanın.');
                break;
            case 'wrinkles':
                recommendations.push('Kırışıklıklar için retinol içeren ürünler kullanın.');
                break;
            case 'darkSpots':
                recommendations.push('Lekeler için C vitamini içeren ürünler kullanın.');
                break;
            case 'redness':
                recommendations.push('Kızarıklık için yatıştırıcı ve anti-inflamatuar ürünler kullanın.');
                break;
            case 'dryness':
                recommendations.push('Kuruluk için hyaluronik asit içeren nemlendiriciler kullanın.');
                break;
        }
    });

    return recommendations;
}

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 