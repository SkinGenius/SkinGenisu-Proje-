// Firebase yapılandırması
const firebaseConfig = {
    // Firebase yapılandırma bilgileri buraya gelecek
};

// Firebase başlatma
firebase.initializeApp(firebaseConfig);

// DOM elementleri
const skinHealthLevel = document.getElementById('skinHealthLevel');
const skinHealthValue = document.getElementById('skinHealthValue');
const skinHealthText = document.getElementById('skinHealthText');
const skinIssuesList = document.getElementById('skinIssuesList');
const moistureLevel = document.getElementById('moistureLevel');
const moistureValue = document.getElementById('moistureValue');
const moistureText = document.getElementById('moistureText');
const oilLevel = document.getElementById('oilLevel');
const oilValue = document.getElementById('oilValue');
const oilText = document.getElementById('oilText');
const recommendationsList = document.getElementById('recommendationsList');
const analysisDate = document.getElementById('analysisDate');

// Analiz sonuçlarını yükle
document.addEventListener('DOMContentLoaded', () => {
    // Analiz tarihini ayarla
    const now = new Date();
    analysisDate.textContent = now.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // URL'den analiz sonuçlarını al
    const urlParams = new URLSearchParams(window.location.search);
    const analysisResults = JSON.parse(decodeURIComponent(urlParams.get('results') || '{}'));

    // Sonuçları göster
    displayResults(analysisResults);
});

// Sonuçları görüntüle
function displayResults(results) {
    // Cilt sağlığı
    if (results.skinHealth) {
        const health = results.skinHealth;
        skinHealthLevel.style.width = `${health}%`;
        skinHealthValue.textContent = `${health}%`;
        skinHealthText.textContent = getSkinHealthText(health);
        
        // Animasyon efekti
        setTimeout(() => {
            skinHealthLevel.style.transition = 'width 1s ease-in-out';
        }, 100);
    }

    // Cilt tipi
    if (results.skinType) {
        skinTypeResult.textContent = results.skinType;
    }

    // Cilt sorunları
    if (results.skinIssues && results.skinIssues.length > 0) {
        skinIssuesList.innerHTML = results.skinIssues.map(issue => `
            <li>
                <span class="material-icons">warning</span>
                ${issue}
            </li>
        `).join('');
    } else {
        skinIssuesList.innerHTML = '<li>Önemli bir sorun tespit edilmedi</li>';
    }

    // Nem seviyesi
    if (results.moistureLevel) {
        const moisture = results.moistureLevel;
        moistureLevel.style.width = `${moisture}%`;
        moistureValue.textContent = `${moisture}%`;
        moistureText.textContent = getMoistureText(moisture);
        
        // Animasyon efekti
        setTimeout(() => {
            moistureLevel.style.transition = 'width 1s ease-in-out';
        }, 100);
    }

    // Yağ seviyesi
    if (results.oilLevel) {
        const oil = results.oilLevel;
        oilLevel.style.width = `${oil}%`;
        oilValue.textContent = `${oil}%`;
        oilText.textContent = getOilText(oil);
        
        // Animasyon efekti
        setTimeout(() => {
            oilLevel.style.transition = 'width 1s ease-in-out';
        }, 100);
    }

    // Öneriler
    if (results.recommendations && results.recommendations.length > 0) {
        recommendationsList.innerHTML = results.recommendations.map(rec => `
            <div class="recommendation-card">
                <span class="material-icons recommendation-icon">${getRecommendationIcon(rec.type)}</span>
                <div class="recommendation-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Önerilen bitkiler butonunu ekle
    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons) {
        const plantsButton = document.createElement('button');
        plantsButton.className = 'action-btn primary';
        plantsButton.innerHTML = `
            <span class="material-icons">spa</span>
            Önerilen Bitkileri Gör
        `;
        plantsButton.onclick = () => {
            const resultsParam = encodeURIComponent(JSON.stringify(results));
            window.location.href = `products.html?results=${resultsParam}`;
        };
        actionButtons.appendChild(plantsButton);
    }
}

// Cilt sağlığı metni
function getSkinHealthText(level) {
    if (level < 30) return 'Cildiniz bakıma ihtiyaç duyuyor. Düzenli bakım rutini oluşturmanız önerilir.';
    if (level < 50) return 'Cildiniz orta seviyede sağlıklı. Bazı iyileştirmeler yapılabilir.';
    if (level < 80) return 'Cildiniz sağlıklı durumda. Mevcut bakım rutininizi sürdürün.';
    return 'Cildiniz mükemmel durumda! Mevcut bakım rutininiz çok etkili.';
}

// Nem seviyesi metni
function getMoistureText(level) {
    if (level < 30) return 'Çok Kuru';
    if (level < 50) return 'Kuru';
    if (level < 70) return 'Normal';
    return 'Nemli';
}

// Yağ seviyesi metni
function getOilText(level) {
    if (level < 30) return 'Çok Kuru';
    if (level < 50) return 'Normal';
    if (level < 70) return 'Yağlı';
    return 'Çok Yağlı';
}

// Öneri ikonu
function getRecommendationIcon(type) {
    const icons = {
        'cleanser': 'cleaning_services',
        'moisturizer': 'water_drop',
        'serum': 'science',
        'sunscreen': 'wb_sunny',
        'treatment': 'healing',
        'default': 'spa'
    };
    return icons[type] || icons.default;
}

// Sonuçları indir
function downloadResults() {
    // Tüm sonuçları topla
    const results = {
        analizTarihi: analysisDate.textContent,
        ciltSağlığı: {
            seviye: parseInt(skinHealthLevel.style.width),
            durum: skinHealthText.textContent
        },
        nemSeviyesi: {
            seviye: parseInt(moistureLevel.style.width),
            durum: moistureText.textContent
        },
        yağSeviyesi: {
            seviye: parseInt(oilLevel.style.width),
            durum: oilText.textContent
        },
        ciltSorunları: Array.from(skinIssuesList.children).map(li => li.textContent.trim()),
        öneriler: Array.from(recommendationsList.children).map(card => ({
            başlık: card.querySelector('h4').textContent,
            açıklama: card.querySelector('p').textContent
        }))
    };

    // JSON formatında düzenle
    const jsonContent = JSON.stringify(results, null, 2);

    // Dosya adını oluştur
    const date = new Date();
    const fileName = `skingenius-analiz-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.json`;

    // Blob oluştur
    const blob = new Blob([jsonContent], { 
        type: 'application/json;charset=utf-8' 
    });

    // İndirme bağlantısı oluştur
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    
    // İndirmeyi başlat
    document.body.appendChild(a);
    a.click();
    
    // Temizlik
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);

    // Kullanıcıya bildirim göster
    showNotification('Sonuçlar başarıyla indirildi!');
}

// Bildirim gösterme fonksiyonu
function showNotification(message) {
    // Bildirim elementi oluştur
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span class="material-icons">check_circle</span>
        <span>${message}</span>
    `;

    // Sayfaya ekle
    document.body.appendChild(notification);

    // Animasyon için timeout
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Bildirimi kaldır
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Sidebar işlemleri
document.getElementById('openSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('active');
    document.getElementById('sidebarOverlay').classList.add('active');
});

document.getElementById('closeSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
});

document.getElementById('sidebarOverlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
});

// Kullanıcı durumunu kontrol et
firebase.auth().onAuthStateChanged((user) => {
    const userProfile = document.getElementById('userProfile');
    const guestProfile = document.getElementById('guestProfile');

    if (user) {
        userProfile.style.display = 'block';
        guestProfile.style.display = 'none';
        document.getElementById('userName').textContent = user.displayName || 'Kullanıcı';
        document.getElementById('userEmail').textContent = user.email;
    } else {
        userProfile.style.display = 'none';
        guestProfile.style.display = 'block';
    }
});

// Çıkış yap
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Çıkış yapılırken hata oluştu:', error);
    });
} 