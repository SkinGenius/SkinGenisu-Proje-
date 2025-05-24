document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlerini seç
    const uploadArea = document.getElementById('uploadArea');
    const photoUpload = document.getElementById('photoUpload');
    const previewImage = document.getElementById('previewImage');
    const skinType = document.getElementById('skinType');
    const analyzeButton = document.getElementById('analyzeButton');
    const analysisResults = document.getElementById('analysisResults');

    // Fotoğraf yükleme alanına tıklama olayı
    uploadArea.addEventListener('click', () => {
        photoUpload.click();
    });

    // Fotoğraf yükleme olayı
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.hidden = false;
                uploadArea.querySelector('.upload-placeholder').style.display = 'none';
                checkFormValidity();
            };
            reader.readAsDataURL(file);
        }
    });

    // Cilt tipi değişikliği olayı
    skinType.addEventListener('change', checkFormValidity);

    // Form geçerliliğini kontrol et
    function checkFormValidity() {
        const hasImage = !previewImage.hidden;
        const hasSkinType = skinType.value !== '';
        const hasSkinIssues = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;

        analyzeButton.disabled = !(hasImage && hasSkinType && hasSkinIssues);
    }

    // Checkbox değişikliklerini dinle
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', checkFormValidity);
    });

    // Analiz butonuna tıklama olayı
    analyzeButton.addEventListener('click', async () => {
        try {
            analyzeButton.disabled = true;
            analyzeButton.innerHTML = '<span class="material-icons">hourglass_empty</span> Analiz Yapılıyor...';

            // Burada yapay zeka analizi yapılacak
            // Şimdilik örnek bir gecikme ekleyelim
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Örnek analiz sonuçları
            const results = {
                skinCondition: {
                    type: skinType.value,
                    issues: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
                    hydration: Math.floor(Math.random() * 100),
                    oiliness: Math.floor(Math.random() * 100),
                    sensitivity: Math.floor(Math.random() * 100)
                },
                recommendations: [
                    'Günde iki kez yüz temizliği yapın',
                    'Nemlendirici kullanın',
                    'Güneş koruyucu kullanın',
                    'Bol su için',
                    'Düzenli uyku uyuyun'
                ]
            };

            // Sonuçları göster
            displayResults(results);
        } catch (error) {
            console.error('Analiz sırasında bir hata oluştu:', error);
            alert('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            analyzeButton.disabled = false;
            analyzeButton.innerHTML = '<span class="material-icons">psychology</span> Analizi Başlat';
        }
    });

    // Sonuçları görüntüle
    function displayResults(results) {
        const conditionDetails = document.querySelector('.condition-details');
        const recommendationList = document.querySelector('.recommendation-list');

        // Cilt durumu detaylarını göster
        conditionDetails.innerHTML = `
            <div class="condition-item">
                <strong>Cilt Tipi:</strong> ${results.skinCondition.type}
            </div>
            <div class="condition-item">
                <strong>Tespit Edilen Sorunlar:</strong> ${results.skinCondition.issues.join(', ')}
            </div>
            <div class="condition-item">
                <strong>Nem Seviyesi:</strong> ${results.skinCondition.hydration}%
            </div>
            <div class="condition-item">
                <strong>Yağ Seviyesi:</strong> ${results.skinCondition.oiliness}%
            </div>
            <div class="condition-item">
                <strong>Hassasiyet Seviyesi:</strong> ${results.skinCondition.sensitivity}%
            </div>
        `;

        // Önerileri göster
        recommendationList.innerHTML = results.recommendations
            .map(rec => `<div class="recommendation-item">${rec}</div>`)
            .join('');

        // Sonuçları görünür yap
        analysisResults.hidden = false;
        analysisResults.scrollIntoView({ behavior: 'smooth' });
    }
}); 