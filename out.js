// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyDxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
    authDomain: "skingenius-xxxxx.firebaseapp.com",
    projectId: "skingenius-xxxxx",
    storageBucket: "skingenius-xxxxx.appspot.com",
    messagingSenderId: "xxxxxxxxxxxx",
    appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxx",
    measurementId: "G-XXXXXXXXXX"
};

// Firebase başlatma
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

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

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Tema kontrolü
    initTheme();
    
    // Analiz sonuçlarını yükle
    loadAnalysisResults();
    
    // Görsel büyütme işlevi
    initImageZoom();
    
    // Analitik
    logPageView();
});

// Tema yönetimi
function initTheme() {
    const savedSettings = localStorage.getItem('skingeniusSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        applyTheme(settings.theme);
    } else {
        applyTheme('light');
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Logo güncelleme
    const logo = document.querySelector('.site-logo');
    if (logo) {
        logo.src = theme === 'dark' ? 'logo-dark.png' : 'logo.png';
    }
}

// Analiz sonuçlarını yükleme
function loadAnalysisResults() {
    // Örnek veri - Gerçek uygulamada API'den gelecek
    const analysisData = {
        date: new Date().toLocaleDateString('tr-TR'),
        userPhoto: 'user-photo.jpg', // Kullanıcının yüklediği fotoğraf
        aiAnalysis: {
            findings: [
                {
                    icon: 'water_drop',
                    text: 'Cildinizde orta seviyede nem eksikliği tespit edildi.'
                },
                {
                    icon: 'brightness_6',
                    text: 'Hafif pigmentasyon sorunları mevcut.'
                },
                {
                    icon: 'texture',
                    text: 'Cilt dokusunda ince çizgiler görülüyor.'
                },
                {
                    icon: 'opacity',
                    text: 'T bölgesinde yağlanma eğilimi var.'
                }
            ],
            suggestions: [
                {
                    icon: 'spa',
                    title: 'Nemlendirme',
                    text: 'Hyaluronik asit içeren nemlendiriciler kullanmanız önerilir.'
                },
                {
                    icon: 'wb_sunny',
                    title: 'Güneş Koruması',
                    text: 'Yüksek SPF içeren güneş kremi kullanımı önemli.'
                },
                {
                    icon: 'cleaning_services',
                    title: 'Temizlik',
                    text: 'Yağ dengesini koruyan bir temizleyici kullanın.'
                }
            ],
            routine: [
                {
                    step: 1,
                    title: 'Sabah Rutini',
                    text: 'Temizleyici, tonik, serum ve nemlendirici kullanın.'
                },
                {
                    step: 2,
                    title: 'Akşam Rutini',
                    text: 'Çift temizleme, serum ve gece kremi uygulayın.'
                },
                {
                    step: 3,
                    title: 'Haftalık Bakım',
                    text: 'Haftada 1-2 kez peeling ve maske uygulayın.'
                }
            ]
        }
    };

    // Tarih güncelleme
    document.getElementById('analysisDate').textContent = analysisData.date;

    // Kullanıcı fotoğrafını güncelleme
    const userPhoto = document.getElementById('userPhoto');
    if (userPhoto) {
        userPhoto.src = analysisData.userPhoto;
    }

    // AI Analiz sonuçlarını güncelleme
    updateAIFindings(analysisData.aiAnalysis.findings);
    updateAISuggestions(analysisData.aiAnalysis.suggestions);
    updateAIRoutine(analysisData.aiAnalysis.routine);
}

// AI Bulgularını güncelleme
function updateAIFindings(findings) {
    const findingsList = document.getElementById('aiFindings');
    if (findingsList) {
        findingsList.innerHTML = findings.map(finding => `
            <li>
                <span class="material-icons">${finding.icon}</span>
                <span>${finding.text}</span>
            </li>
        `).join('');
    }
}

// AI Önerilerini güncelleme
function updateAISuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-card">
                <h4>
                    <span class="material-icons">${suggestion.icon}</span>
                    ${suggestion.title}
                </h4>
                <p>${suggestion.text}</p>
            </div>
        `).join('');
    }
}

// AI Bakım rutinini güncelleme
function updateAIRoutine(routine) {
    const routineContainer = document.getElementById('routineSteps');
    if (routineContainer) {
        routineContainer.innerHTML = routine.map(step => `
            <div class="routine-step">
                <div class="step-number">${step.step}</div>
                <div class="step-content">
                    <h4>${step.title}</h4>
                    <p>${step.text}</p>
                </div>
            </div>
        `).join('');
    }
}

// Görsel büyütme işlevi
function initImageZoom() {
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.addEventListener('click', () => {
            const image = imageContainer.querySelector('img');
            if (image) {
                const modal = document.createElement('div');
                modal.className = 'image-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="modal-close">&times;</span>
                        <img src="${image.src}" alt="Büyük Görsel">
                    </div>
                `;
                document.body.appendChild(modal);

                // Modal kapatma
                const closeBtn = modal.querySelector('.modal-close');
                closeBtn.onclick = () => modal.remove();
                modal.onclick = (e) => {
                    if (e.target === modal) modal.remove();
                };
            }
        });
    }
}

// Sonuçları indirme
function downloadResults() {
    // PDF oluşturma ve indirme işlemi
    alert('Sonuçlar indiriliyor...');
    // Gerçek uygulamada PDF oluşturma ve indirme işlemi yapılacak
}

// Analitik
function logPageView() {
    analytics.logEvent('page_view', {
        page_title: 'Analiz Sonuçları',
        page_location: window.location.href,
        page_path: window.location.pathname
    });
}

// Storage event listener for theme changes
window.addEventListener('storage', (e) => {
    if (e.key === 'skingeniusSettings') {
        const settings = JSON.parse(e.newValue);
        applyTheme(settings.theme);
    }
});

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