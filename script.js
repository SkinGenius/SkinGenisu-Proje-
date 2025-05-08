// Firebase yapılandırması
const firebaseConfig = {
    // Firebase Console'dan alacağınız yapılandırma bilgilerini buraya ekleyin
    apiKey: "AIzaSyB9VGtzN7pgsdBl4XXa_1L6wMjh3T13w-k",
    authDomain: "skingenius-ea7d0.firebaseapp.com",
    projectId: "skingenius-ea7d0",
    storageBucket: "skingenius-ea7d0.firebasestorage.app",
    messagingSenderId: "770543146334",
    appId: "1:770543146334:web:2f0d2141934c460c45abcf",
    measurementId: "G-TYP3GJH5B3"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Giriş işlemi
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Giriş başarılı
            const user = userCredential.user;
            console.log("Giriş başarılı:", user);
            alert("Giriş başarılı! Hoş geldiniz.");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            // Hata durumu
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
            alert("Kayıt işlemi başarılı! Hoş geldiniz.");
            window.location.href = "dashboard.html";
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

// Kullanıcı durumunu dinle
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Kullanıcı giriş yapmış
        console.log("Kullanıcı giriş yapmış:", user);
    } else {
        // Kullanıcı çıkış yapmış
        console.log("Kullanıcı çıkış yapmış");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.form');

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

    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Basic validation
        if (!email || !password) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password });
        // For now, just show a success message
        alert('Giriş başarılı!');
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        const privacyCheck = document.getElementById('privacyCheck').checked;

        // Basic validation
        if (!name || !email || !password || !passwordConfirm) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        if (password !== passwordConfirm) {
            alert('Şifreler eşleşmiyor!');
            return;
        }

        if (password.length < 6) {
            alert('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        if (!privacyCheck) {
            alert('Lütfen kişisel verilerin işlenmesine izin verin.');
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Register attempt:', { name, email, password });
        // For now, just show a success message
        alert('Kayıt başarılı!');
    });

    // Google login/register buttons
    const googleBtns = document.querySelectorAll('.google-btn');
    googleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Here you would implement Google OAuth
            console.log('Google login/register clicked');
            alert('Google ile giriş özelliği yakında eklenecek!');
        });
    });

    // Password visibility toggle
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.position = 'absolute';
        toggleBtn.style.right = '0';
        toggleBtn.style.top = '50%';
        toggleBtn.style.transform = 'translateY(-50%)';
        toggleBtn.style.background = 'none';
        toggleBtn.style.border = 'none';
        toggleBtn.style.cursor = 'pointer';
        
        input.parentElement.style.position = 'relative';
        input.parentElement.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });

    // Form geçişi için toggle fonksiyonu
    function toggleForm() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
    }
});

// Google ile giriş
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Giriş başarılı
            const user = result.user;
            console.log("Google ile giriş başarılı:", user);
            alert("Google ile giriş başarılı! Hoş geldiniz.");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            // Hata durumu
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