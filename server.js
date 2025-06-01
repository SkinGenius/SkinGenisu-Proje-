const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// CORS ayarları
app.use(cors({
    origin: '*', // Tüm originlere izin ver
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Hata ayıklama middleware'i
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Multer ayarları
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Test endpoint'i
app.get('/api/test', (req, res) => {
    res.json({ message: 'API çalışıyor!' });
});

// Cilt analizi endpoint'i
app.post('/api/analyze-skin', upload.single('image'), async (req, res) => {
    try {
        console.log('Analiz isteği alındı');
        
        if (!req.file) {
            console.log('Dosya yüklenmedi');
            return res.status(400).json({ error: 'Lütfen bir fotoğraf yükleyin' });
        }

        console.log('Dosya alındı:', req.file.originalname);

        // Kullanıcının seçtiği cilt tipi ve sorunları
        const userInput = {
            skinType: req.body.skinType,
            skinIssues: req.body.skinIssues ? req.body.skinIssues.split(',') : []
        };

        console.log('Kullanıcı girdileri:', userInput);

        // Basit analiz sonuçları
        const analysis = {
            hydration: Math.floor(Math.random() * 100),
            oiliness: Math.floor(Math.random() * 100),
            sensitivity: Math.floor(Math.random() * 100),
            confidence: 0.85
        };

        // Önerileri oluştur
        const recommendations = generateRecommendations(analysis, userInput);

        console.log('Analiz tamamlandı, sonuçlar gönderiliyor');

        res.json({
            skinCondition: {
                ...analysis,
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

// Önerileri oluştur
function generateRecommendations(analysis, userInput) {
    const recommendations = [];

    // Nem seviyesine göre öneriler
    if (analysis.hydration < 30) {
        recommendations.push('Cildin biraz kuru görünüyor. Ona iyi bakmak için hyaluronik asit veya gliserin gibi nemlendirici içeren bir serum veya krem kullanmayı düşünebilirsin!');
    } else if (analysis.hydration > 70) {
        recommendations.push('Harika! Cildin yeterince nemli. Bu güzel rutinine devam et. Nemlendirici serum veya kremini düzenli kullanmayı sürdür!');
    }

    // Yağ seviyesine göre öneriler
    if (analysis.oiliness > 70) {
        recommendations.push('Cildin biraz yağlı olabilir. Yağ dengeleyici ürünlerle daha rahat hissetmeni sağlayabilirsin. Niasinamid içeren bir tonik veya hafif yapılı su bazlı bir nemlendirici deneyebilirsin.');
    } else if (analysis.oiliness < 30) {
        recommendations.push('Cildin nemlendirilmeye ihtiyaç duyuyor gibi. Yağ bazlı temizleyiciler ve seramid gibi lipidleri içeren yoğun nemlendiriciler cildine çok iyi gelecektir.');
    }

    // Hassasiyet seviyesine göre öneriler
    if (analysis.sensitivity > 70) {
        recommendations.push('Cildin hassas olabilir, ona nazik davranalım. Parfüm, alkol ve sert kimyasallar içermeyen, yatıştırıcı içeriklere sahip (papatya, aloe vera gibi) ürünleri tercih etmelisin.');
    }

    // Tespit edilen sorunlara göre öneriler
    userInput.skinIssues.forEach(issue => {
        switch(issue) {
            case 'acne':
                recommendations.push('Akne sorunların için salisilik asit (BHA) içeren bir temizleyici veya serum kullanmayı düşünebilirsin. Bu, gözenekleri temizlemeye yardımcı olur.');
                break;
            case 'wrinkles':
                recommendations.push('Kırışıklıkların görünümünü hafifletmek için gece rutinine retinol içeren bir serum veya krem eklemeyi düşünebilirsin. Başlangıçta düşük konsantrasyonla başlamak önemlidir.');
                break;
            case 'dark_spots':
                recommendations.push('Lekelerin görünümünü aydınlatmak için C vitamini veya niacinamide içeren bir serum kullanabilirsin. Güneş koruyucu kullanmayı da unutma!');
                break;
        }
    });

    return recommendations;
}

// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor`);
    console.log(`Test için: http://localhost:${port}/api/test`);
}); 