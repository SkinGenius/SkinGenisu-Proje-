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
    }

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
}); 