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

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Mesajınız başarıyla gönderildi!');
                contactForm.reset();
            } else {
                throw new Error('Bir hata oluştu');
            }
        } catch (error) {
            alert('Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            console.error('Error:', error);
        }
    });
}); 