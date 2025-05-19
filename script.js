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
                window.location.href = "dashboard.html";
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
});

// Google giriş işlemleri
function initGoogleAuth() {
    // Google OAuth 2.0 client ID
    const clientId = 'YOUR_GOOGLE_CLIENT_ID';
    
    // Google API'yi yükle
    gapi.load('auth2', () => {
        gapi.auth2.init({
            client_id: clientId,
            scope: 'email profile'
        }).then(() => {
            console.log('Google API başarıyla yüklendi');
            // Google giriş butonlarına tıklama olaylarını ekle
            document.querySelectorAll('.google-btn').forEach(button => {
                button.addEventListener('click', () => {
                    console.log('Google giriş butonuna tıklandı');
                    handleGoogleSignIn();
                });
            });
        }).catch(error => {
            console.error('Google API yükleme hatası:', error);
        });
    });
}

function handleGoogleSignIn() {
    console.log('handleGoogleSignIn fonksiyonu çağrıldı');
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(
        (googleUser) => {
            // Başarılı giriş
            const profile = googleUser.getBasicProfile();
            const userData = {
                id: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail(),
                imageUrl: profile.getImageUrl()
            };
            
            console.log('Google giriş başarılı:', userData);
            alert('Google ile giriş başarılı! Hoş geldiniz, ' + userData.name);
        },
        (error) => {
            console.error('Google giriş hatası:', error);
            alert('Google ile giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    );
}

// Sayfa yüklendiğinde Google API'yi yükle
const script = document.createElement('script');
script.src = 'https://apis.google.com/js/platform.js';
script.onload = () => {
    console.log('Google API script yüklendi');
    initGoogleAuth();
};
document.body.appendChild(script);

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
        const profileImage = document.getElementById('userProfileImage');
        if (user.photoURL) {
            profileImage.src = user.photoURL;
        } else {
            profileImage.src = 'default-avatar.png';
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
