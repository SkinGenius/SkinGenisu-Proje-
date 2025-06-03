// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyB9VGtzN7pgsdBl4XXa_1L6wMjh3T13w-k",
    authDomain: "skingenius-ea7d0.firebaseapp.com",
    projectId: "skingenius-ea7d0",
    storageBucket: "skingenius-ea7d0.appspot.com",
    messagingSenderId: "770543146334",
    appId: "1:770543146334:web:2f0d2141934c460c45abcf",
    measurementId: "G-TYP3GJH5B3"
};

// Domain kontrolü
const currentDomain = window.location.hostname;
console.log('Mevcut domain:', currentDomain);

// Firebase'i başlat
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase başarıyla başlatıldı');
    
    // Domain kontrolü
    if (currentDomain === 'localhost' || currentDomain === '127.0.0.1') {
        console.log('Geliştirme ortamında çalışıyor');
    } else {
        console.log('Production ortamında çalışıyor');
    }
} catch (error) {
    console.error('Firebase başlatma hatası:', error);
}

// Firebase servislerinin hazır olduğunu kontrol et
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Firebase Auth servisi hazır, kullanıcı durumu:', user);
    } else {
        console.log('Firebase Auth servisi hazır, kullanıcı giriş yapmamış');
    }
});

// Giriş işlemi
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Giriş denemesi:', { email }); // Şifreyi loglamıyoruz güvenlik için

    if (!email || !password) {
        alert('Lütfen e-posta ve şifre alanlarını doldurun.');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Firebase auth başarılı:', user);
            
            if (user.emailVerified) {
                console.log('E-posta doğrulanmış, giriş yapılıyor...');
                alert("Giriş başarılı! Hoş geldiniz.");
                window.location.href = "index.html";
            } else {
                console.log('E-posta doğrulanmamış, doğrulama maili gönderiliyor...');
                user.sendEmailVerification()
                    .then(() => {
                        alert("Lütfen e-posta adresinizi doğrulayın. Yeni doğrulama maili e-posta adresinize gönderildi.");
                    })
                    .catch((error) => {
                        console.error('Doğrulama maili gönderme hatası:', error);
                        alert("Doğrulama maili gönderilemedi: " + error.message);
                    });
                firebase.auth().signOut();
            }
        })
        .catch((error) => {
            console.error('Giriş hatası:', error);
            let errorMessage = "";
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "Geçersiz e-posta adresi.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "Bu hesap devre dışı bırakılmış.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Hatalı şifre.";
                    break;
                default:
                    errorMessage = "Bir hata oluştu: " + error.message;
            }
            alert(errorMessage);
        });
}

// Kayıt işlemi
function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Kayıt başarılı
            const user = userCredential.user;
            console.log("Kayıt başarılı:", user);
            // E-posta doğrulama gönder
            user.sendEmailVerification()
                .then(() => {
                    alert("Kayıt işlemi başarılı! Lütfen e-posta adresinizi doğrulayın. Doğrulama maili gönderildi.");
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    alert("Doğrulama e-postası gönderilemedi: " + error.message);
                });
        })
        .catch((error) => {
            // Hata durumu
            let errorMessage = "";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "Bu e-posta adresi zaten kullanımda.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Geçersiz e-posta adresi.";
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = "E-posta/şifre girişi etkin değil.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin.";
                    break;
                default:
                    errorMessage = "Bir hata oluştu: " + error.message;
            }
            alert(errorMessage);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.form');

    if (tabBtns.length && forms.length) {
        // URL'den tab parametresini al
        const urlParams = new URLSearchParams(window.location.search);
        const activeTab = urlParams.get('tab');

        // Eğer URL'de tab parametresi varsa ve register ise, register sekmesini aktif et
        if (activeTab === 'register') {
            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            document.querySelector('[data-tab="register"]').classList.add('active');
            document.getElementById('registerForm').classList.add('active');
        }

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and forms
                tabBtns.forEach(b => b.classList.remove('active'));
                forms.forEach(f => f.classList.remove('active'));

                // Add active class to clicked button and corresponding form
                btn.classList.add('active');
                document.getElementById(`${btn.dataset.tab}Form`).classList.add('active');
            });
        });
    }

    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm && registerForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            login();
        });

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            register();
        });
    }

    // Sidebar'ı güncelle
    updateSidebarContent();

    // Auth durumu değişikliklerini dinle
    firebase.auth().onAuthStateChanged((user) => {
        updateSidebarContent();
    });

    initializeSettings();
    updateLogoForTheme(); // Sayfa yüklenince logoyu temaya göre ayarla
});

// Google ile giriş
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    // Google giriş popup'ını aç
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Giriş başarılı
            const user = result.user;
            console.log("Google ile giriş başarılı:", user);
            
            // Kullanıcı bilgilerini kontrol et
            if (user.emailVerified) {
                alert("Google ile giriş başarılı! Hoş geldiniz.");
                window.location.href = "index.html";
            } else {
                // Google hesabı zaten doğrulanmış olduğu için bu duruma düşmemeli
                console.log("Google hesabı doğrulanmış:", user);
                alert("Google ile giriş başarılı! Hoş geldiniz.");
                window.location.href = "index.html";
            }
        })
        .catch((error) => {
            // Hata durumu
            console.error("Google giriş hatası:", error);
            let errorMessage = "";
            switch (error.code) {
                case 'auth/account-exists-with-different-credential':
                    errorMessage = "Bu e-posta adresi başka bir giriş yöntemiyle kayıtlı.";
                    break;
                case 'auth/popup-blocked':
                    errorMessage = "Popup penceresi engellendi. Lütfen popup engelleyiciyi kapatın.";
                    break;
                case 'auth/popup-closed-by-user':
                    errorMessage = "Giriş işlemi iptal edildi.";
                    break;
                case 'auth/cancelled-popup-request':
                    errorMessage = "Giriş işlemi iptal edildi.";
                    break;
                default:
                    errorMessage = "Bir hata oluştu: " + error.message;
            }
            alert(errorMessage);
        });
}

// Sidebar açma/kapama
const openSidebar = document.getElementById('openSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

if (openSidebar && closeSidebar && sidebar && overlay) {
    function openMenu() {
        sidebar.classList.add('open');
        overlay.style.display = 'block';
    }
    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
    }
    openSidebar.addEventListener('click', openMenu);
    closeSidebar.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
}

// Kullanıcı durumunu kontrol et ve sidebar'ı güncelle
function updateSidebarContent() {
    const userProfile = document.getElementById('userProfile');
    const guestProfile = document.getElementById('guestProfile');
    const user = firebase.auth().currentUser;

    if (user) {
        // Kullanıcı giriş yapmış
        userProfile.style.display = 'block';
        guestProfile.style.display = 'none';
        
        // Kullanıcı bilgilerini güncelle
        document.getElementById('userName').textContent = user.displayName || 'Kullanıcı';
        document.getElementById('userEmail').textContent = user.email;
        
        // Profil resmini güncelle
        const profileImageContainer = document.querySelector('#userProfile .profile-section');
        let profileImageElement = document.getElementById('userProfileImage');

        // Mevcut profil resmini kaldır (varsa)
        if (profileImageElement) {
            profileImageElement.remove();
        }

        if (user.photoURL) {
            // Google profil fotoğrafı varsa img etiketi oluştur
            profileImageElement = document.createElement('img');
            profileImageElement.id = 'userProfileImage';
            profileImageElement.className = 'profile-image'; // Apply existing styles
            profileImageElement.alt = 'User Avatar';
            profileImageElement.src = user.photoURL;
            profileImageContainer.insertBefore(profileImageElement, profileImageContainer.firstChild); // Add at the beginning
        } else {
            // Profil fotoğrafı yoksa baş harfi olan div oluştur
            const initials = (user.displayName || user.email)[0].toUpperCase();
            profileImageElement = document.createElement('div');
            profileImageElement.id = 'userProfileImage';
            profileImageElement.className = 'profile-image'; // Apply existing styles
            profileImageElement.textContent = initials;
            profileImageElement.style.backgroundColor = generateColor(initials); // Dinamik renk ataması
            profileImageElement.style.color = 'white';
            profileImageElement.style.display = 'flex';
            profileImageElement.style.alignItems = 'center';
            profileImageElement.style.justifyContent = 'center';
            profileImageElement.style.fontSize = '1.5rem'; // Adjust font size as needed
            profileImageElement.style.fontWeight = 'bold';

            profileImageContainer.insertBefore(profileImageElement, profileImageContainer.firstChild);
        }
    } else {
        // Kullanıcı giriş yapmamış
        userProfile.style.display = 'none';
        guestProfile.style.display = 'block';
    }
}

// Çıkış yapma fonksiyonu
function logout() {
    firebase.auth().signOut()
        .then(() => {
            console.log('Çıkış yapıldı');
            updateSidebarContent();
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Çıkış yapma hatası:', error);
            alert('Çıkış yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
        });
}

// Ayarlar sayfası fonksiyonları
function initializeSettings() {
    console.log('Ayarlar başlatılıyor...');
    
    const themeSelect = document.getElementById('themeSelect');
    const fontSizeSelect = document.getElementById('fontSizeSelect');
    const languageSelect = document.getElementById('languageSelect');
    const saveButton = document.querySelector('.save-settings-btn');
    const resetButton = document.querySelector('.reset-settings-btn');

    // LocalStorage kontrolü
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        console.log('LocalStorage çalışıyor');
    } catch (e) {
        console.error('LocalStorage hatası:', e);
        alert('Tarayıcınızda localStorage desteği yok veya devre dışı bırakılmış.');
        return;
    }

    // Kayıtlı ayarları yükle
    loadSettings();

    // Ayarları kaydet
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            console.log('Kaydet butonuna tıklandı');
            
            const theme = themeSelect.value;
            const fontSize = fontSizeSelect.value;
            const language = languageSelect.value;

            console.log('Seçilen tema:', theme);
            console.log('Seçilen yazı boyutu:', fontSize);
            console.log('Seçilen dil:', language);

            try {
                // Ayarları LocalStorage'a kaydet
                localStorage.setItem('theme', theme);
                localStorage.setItem('fontSize', fontSize);
                localStorage.setItem('language', language);
                
                console.log('Ayarlar kaydedildi');
                
                // Tema değişikliğini uygula
                applyTheme(theme);

                showNotification('Ayarlar başarıyla kaydedildi!', 'success');
                
                // Sayfayı yenile
                window.location.reload();
            } catch (e) {
                console.error('Ayarları kaydetme hatası:', e);
                alert('Ayarlar kaydedilirken bir hata oluştu!');
            }
        });
    }

    // Ayarları sıfırla
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            console.log('Sıfırla butonuna tıklandı');
            
            try {
                localStorage.removeItem('theme');
                localStorage.removeItem('fontSize');
                localStorage.removeItem('language');
                
                console.log('Ayarlar sıfırlandı');
                
                // Varsayılan temayı uygula
                applyTheme('light');
                
                // Select elementlerini sıfırla
                themeSelect.value = 'light';
                fontSizeSelect.value = 'medium';
                languageSelect.value = 'tr';
                
                showNotification('Ayarlar varsayılana sıfırlandı!', 'success');
                
                // Sayfayı yenile
                window.location.reload();
            } catch (e) {
                console.error('Ayarları sıfırlama hatası:', e);
                alert('Ayarlar sıfırlanırken bir hata oluştu!');
            }
        });
    }
}

function loadSettings() {
    console.log('Ayarlar yükleniyor...');
    
    try {
        // LocalStorage'dan ayarları yükle
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        const savedLanguage = localStorage.getItem('language') || 'tr';

        console.log('Kayıtlı tema:', savedTheme);
        console.log('Kayıtlı yazı boyutu:', savedFontSize);
        console.log('Kayıtlı dil:', savedLanguage);

        // Select elementlerini güncelle
        const themeSelect = document.getElementById('themeSelect');
        const fontSizeSelect = document.getElementById('fontSizeSelect');
        const languageSelect = document.getElementById('languageSelect');

        if (themeSelect) themeSelect.value = savedTheme;
        if (fontSizeSelect) fontSizeSelect.value = savedFontSize;
        if (languageSelect) languageSelect.value = savedLanguage;

        // Tema değişikliğini uygula
        applyTheme(savedTheme);
    } catch (e) {
        console.error('Ayarları yükleme hatası:', e);
    }
}

// Ayarları localStorage'dan yükle ve uygula
function loadAndApplySettings() {
    const settings = JSON.parse(localStorage.getItem('skingeniusSettings')) || {
        emailNotifications: true,
        analysisNotifications: true,
        theme: 'light',
        fontSize: 'medium',
        dataCollection: true,
        personalizedSuggestions: true,
        language: 'tr'
    };

    // Tema uygula
    applyTheme(settings.theme);
    
    // Yazı boyutunu uygula
    applyFontSize(settings.fontSize);

    // Dil ayarını uygula
    applyLanguage(settings.language);

    // Bildirim ayarlarını uygula
    applyNotificationSettings(settings);
}

// Tema değiştiğinde logoyu güncelle
function updateLogoForTheme() {
    const logoImg = document.querySelector('.site-logo');
    if (!logoImg) return;
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        logoImg.src = 'logo-dark.png';
    } else {
        logoImg.src = 'logo.png';
    }
}

// applyTheme fonksiyonunu güncelle
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateLogoForTheme();
    
    // Tema değişkenlerini güncelle
    const root = document.documentElement;
    if (theme === 'dark') {
        root.style.setProperty('--bg-color', '#1a1a1a');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--header-bg', '#2d2d2d');
        root.style.setProperty('--sidebar-bg', '#2d2d2d');
        root.style.setProperty('--card-bg', '#2d2d2d');
        root.style.setProperty('--border-color', '#ff8ba3');
        root.style.setProperty('--shadow-color', 'rgba(255, 139, 163, 0.2)');
        root.style.setProperty('--box-bg', '#2d2d2d');
        root.style.setProperty('--box-text', '#ffffff');
        root.style.setProperty('--box-border', '#ff8ba3');
        root.style.setProperty('--box-shadow', 'rgba(255, 139, 163, 0.2)');
    } else {
        root.style.setProperty('--bg-color', '#fff9fb');
        root.style.setProperty('--text-color', '#2d3436');
        root.style.setProperty('--header-bg', '#ffffff');
        root.style.setProperty('--sidebar-bg', '#ffffff');
        root.style.setProperty('--card-bg', '#ffffff');
        root.style.setProperty('--border-color', '#ffeef2');
        root.style.setProperty('--shadow-color', 'rgba(255, 182, 193, 0.12)');
        root.style.setProperty('--box-bg', '#ffffff');
        root.style.setProperty('--box-text', '#2d3436');
        root.style.setProperty('--box-border', '#ffeef2');
        root.style.setProperty('--box-shadow', 'rgba(255, 182, 193, 0.12)');
    }
}

// Yazı boyutunu uygula
function applyFontSize(size) {
    const root = document.documentElement;
    switch(size) {
        case 'small':
            root.style.fontSize = '14px';
            break;
        case 'medium':
            root.style.fontSize = '16px';
            break;
        case 'large':
            root.style.fontSize = '18px';
            break;
    }
}

// Dil ayarını uygula
function applyLanguage(language) {
    // Dil değişikliği için gerekli işlemler
    document.documentElement.lang = language;
    
    // Sayfa içeriğini güncelle
    updatePageContent(language);
}

// Sayfa içeriğini güncelle
function updatePageContent(language) {
    // Sayfa başlığını güncelle
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        switch(currentPage) {
            case 'index':
                pageTitle.textContent = language === 'tr' ? 'SkinGenius - Ana Sayfa' : 'SkinGenius - Home';
                break;
            case 'analysis':
                pageTitle.textContent = language === 'tr' ? 'SkinGenius - Cilt Analizi' : 'SkinGenius - Skin Analysis';
                break;
            case 'settings':
                pageTitle.textContent = language === 'tr' ? 'SkinGenius - Ayarlar' : 'SkinGenius - Settings';
                break;
            // Diğer sayfalar için de benzer şekilde devam edebilirsiniz
        }
    }
}

// Bildirim ayarlarını uygula
function applyNotificationSettings(settings) {
    // E-posta bildirimleri
    if (!settings.emailNotifications) {
        // E-posta bildirimlerini devre dışı bırak
        console.log('E-posta bildirimleri devre dışı');
    }

    // Analiz bildirimleri
    if (!settings.analysisNotifications) {
        // Analiz bildirimlerini devre dışı bırak
        console.log('Analiz bildirimleri devre dışı');
    }
}

// Sidebar işlemleri
document.addEventListener('DOMContentLoaded', () => {
    // Ayarları yükle ve uygula
    loadAndApplySettings();

    // Sidebar açma/kapama
    const openSidebar = document.getElementById('openSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (openSidebar && closeSidebar && sidebar && sidebarOverlay) {
        openSidebar.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.style.display = 'block';
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.style.display = 'none';
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.style.display = 'none';
        });
    }

    // Kullanıcı durumunu kontrol et
    checkUserStatus();
});

// Kullanıcı durumunu kontrol et
function checkUserStatus() {
    const userProfile = document.getElementById('userProfile');
    const guestProfile = document.getElementById('guestProfile');

    if (userProfile && guestProfile) {
        // Firebase Auth durumunu kontrol et
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // Kullanıcı giriş yapmış
                userProfile.style.display = 'block';
                guestProfile.style.display = 'none';
                
                // Kullanıcı bilgilerini güncelle
                document.getElementById('userName').textContent = user.displayName || 'Kullanıcı';
                document.getElementById('userEmail').textContent = user.email;
            } else {
                // Kullanıcı giriş yapmamış
                userProfile.style.display = 'none';
                guestProfile.style.display = 'block';
            }
        });
    }
}

// Modern, temaya uygun, sağ altta kayan bildirim fonksiyonu
window.showNotification = function(message, type = '') {
    // Önce eski bildirimi kaldır (çakışma olmasın)
    const old = document.querySelector('.notification');
    if (old) old.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    if (type === 'success') notification.classList.add('success');
    notification.innerHTML = (type === 'success'
        ? '<span style="font-size:1.5em;margin-right:16px;margin-left:-28px;color:#fff;font-weight:bold;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.10));">&#10004;</span>'
        : '') + message;
    document.body.appendChild(notification);

    // Animasyon için opacity'yi tetikle
    setTimeout(() => notification.style.opacity = '1', 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 400);
    }, 2600);
};

// Baş harfe göre renk üreten basit bir fonksiyon (isteğe bağlı olarak geliştirilebilir)
function generateColor(initial) {
    const colors = [
        '#FF6347', // Tomato
        '#FF4500', // OrangeRed
        '#FF8C00', // DarkOrange
        '#FFD700', // Gold
        '#ADFF2F', // GreenYellow
        '#7FFF00', // Chartreuse
        '#00FA9A', // MediumSpringGreen
        '#00FFFF', // Cyan
        '#1E90FF', // DodgerBlue
        '#4169E1', // RoyalBlue
        '#8A2BE2', // BlueViolet
        '#9932CC', // DarkOrchid
        '#FF69B4', // HotPink
        '#FF1493'  // DeepPink
    ];
    const index = initial.charCodeAt(0) % colors.length;
    return colors[index];
}
