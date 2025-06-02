document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

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