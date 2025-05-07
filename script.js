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
}); 