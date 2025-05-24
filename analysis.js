document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlerini seç
    const uploadArea = document.getElementById('uploadArea');
    const photoUpload = document.getElementById('photoUpload');
    const previewImage = document.getElementById('previewImage');
    const skinType = document.getElementById('skinType');
    const analyzeButton = document.getElementById('analyzeButton');
    const analysisResults = document.getElementById('analysisResults');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    const uploadActions = document.querySelector('.upload-actions');

    // API endpoint
    const API_URL = 'http://localhost:3000/api/analyze-skin';

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
                uploadPlaceholder.style.display = 'none';
                uploadActions.hidden = false;
                checkFormValidity();
            };
            reader.readAsDataURL(file);
        }
    });

    // Cilt tipi kartları için tıklama olayı
    const skinTypeCards = document.querySelectorAll('.skin-type-card');
    const skinTypeInput = document.getElementById('skinType');
    skinTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            skinTypeCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            skinTypeInput.value = this.getAttribute('data-type');
            checkFormValidity();
        });
    });

    // Cilt sorunları için checkbox olayı
    const skinIssueCards = document.querySelectorAll('.skin-issue-card input[type="checkbox"]');
    const skinIssuesInput = document.getElementById('skinIssues');
    skinIssueCards.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedIssues = Array.from(skinIssueCards)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            skinIssuesInput.value = selectedIssues.join(',');
            checkFormValidity();
        });
    });

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
            // Butonu devre dışı bırak ve yükleniyor durumuna geç
            analyzeButton.disabled = true;
            analyzeButton.innerHTML = '<span class="material-icons">hourglass_empty</span> Analiz Yapılıyor...';

            // Form verilerini hazırla
            const formData = new FormData();
            formData.append('image', photoUpload.files[0]);
            formData.append('skinType', skinType.value);
            
            // Seçili cilt sorunlarını al
            const selectedIssues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value);
            formData.append('skinIssues', selectedIssues.join(','));

            // API'ye istek gönder
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('API yanıt vermedi');
            }

            const results = await response.json();

            // Sonuçları göster
            displayResults(results);

        } catch (error) {
            console.error('Analiz hatası:', error);
            alert('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            // Butonu normal duruma getir
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

    // Yeniden çek butonu
    document.getElementById('retakePhoto').addEventListener('click', () => {
        photoUpload.value = '';
        previewImage.hidden = true;
        uploadPlaceholder.style.display = 'flex';
        uploadActions.hidden = true;
        checkFormValidity();
    });

    // Değiştir butonu
    document.getElementById('changePhoto').addEventListener('click', () => {
        photoUpload.click();
    });

    // Sürükle-bırak işlevselliği
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.hidden = false;
                uploadPlaceholder.style.display = 'none';
                uploadActions.hidden = false;
                checkFormValidity();
            };
            reader.readAsDataURL(file);
            // input'u da güncelle
            photoUpload.files = files;
        }
    });
}); 