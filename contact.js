document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Tema değişikliğini dinle ve uygula
    function initTheme() {
        const settings = JSON.parse(localStorage.getItem('skingeniusSettings')) || {
            theme: 'light',
            fontSize: 'medium'
        };
        applyTheme(settings.theme);
    }

    // Tema uygula
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

    // Initialize theme
    initTheme();

    // Tema değişikliğini dinle
    window.addEventListener('storage', function(e) {
        if (e.key === 'skingeniusSettings') {
            const settings = JSON.parse(e.newValue);
            applyTheme(settings.theme);
        }
    });

    // Form gönderimini dinle
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Form verilerini al
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Loading durumunu göster
        const submitBtn = document.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="material-icons">hourglass_empty</span> Gönderiliyor...';
        submitBtn.disabled = true;

        // EmailJS ile e-posta gönder
        emailjs.send("skingenius_serviceid", "template_jsa9nri", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: "skingenius12@gmail.com"
        })
        .then(function() {
            // Başarılı gönderim
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            contactForm.reset();
        })
        .catch(function(error) {
            // Hata durumu
            showNotification('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            // Loading durumunu kaldır
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });

    // Bildirim gösterme fonksiyonu
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="material-icons">${type === 'success' ? 'check_circle' : 'error'}</span>
            ${message}
        `;
        document.body.appendChild(notification);

        // Bildirimi göster
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Bildirimi kaldır
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}); 