// Ayarları localStorage'dan yükle
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('skingeniusSettings')) || {
        emailNotifications: true,
        analysisNotifications: true,
        theme: 'light',
        fontSize: 'medium',
        dataCollection: true,
        personalizedSuggestions: true
    };

    // Toggle switch'leri ayarla
    document.getElementById('emailNotifications').checked = settings.emailNotifications;
    document.getElementById('analysisNotifications').checked = settings.analysisNotifications;
    document.getElementById('dataCollection').checked = settings.dataCollection;
    document.getElementById('personalizedSuggestions').checked = settings.personalizedSuggestions;

    // Select elementlerini ayarla
    document.getElementById('themeSelect').value = settings.theme;
    document.getElementById('fontSizeSelect').value = settings.fontSize;

    // Tema ve yazı boyutunu uygula
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
}

// Ayarları kaydet
function saveSettings() {
    const settings = {
        emailNotifications: document.getElementById('emailNotifications').checked,
        analysisNotifications: document.getElementById('analysisNotifications').checked,
        theme: document.getElementById('themeSelect').value,
        fontSize: document.getElementById('fontSizeSelect').value,
        dataCollection: document.getElementById('dataCollection').checked,
        personalizedSuggestions: document.getElementById('personalizedSuggestions').checked
    };

    localStorage.setItem('skingeniusSettings', JSON.stringify(settings));
    
    // Tema ve yazı boyutunu uygula
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
}

// Ayarları sıfırla
function resetSettings() {
    const defaultSettings = {
        emailNotifications: true,
        analysisNotifications: true,
        theme: 'light',
        fontSize: 'medium',
        dataCollection: true,
        personalizedSuggestions: true
    };

    localStorage.setItem('skingeniusSettings', JSON.stringify(defaultSettings));
    loadSettings();
    if (window.showNotification) {
        window.showNotification('Ayarlar varsayılana sıfırlandı!', 'success');
    }
}

// Tema uygula
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Ayarları yükle
    loadSettings();

    // Kaydet butonu
    const saveBtn = document.querySelector('.save-settings-btn');
    if (saveBtn) {
        const form = saveBtn.closest('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                saveSettings();
            });
        } else {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                saveSettings();
            });
        }
    }

    // Sıfırla butonu
    document.querySelector('.reset-settings-btn').addEventListener('click', () => {
        if (confirm('Tüm ayarları varsayılana sıfırlamak istediğinizden emin misiniz?')) {
            resetSettings();
        }
    });

    // Tema değişikliği
    document.getElementById('themeSelect').addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });

    // Yazı boyutu değişikliği
    document.getElementById('fontSizeSelect').addEventListener('change', (e) => {
        applyFontSize(e.target.value);
    });
}); 