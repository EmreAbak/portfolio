// Sertifika kartları için animasyon
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.certificate-card');
    
    // Her karta fade-in sınıfını ekle, ama gecikmeli olarak
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100); // Her kart 100ms gecikmeli olarak görünür
    });

    // Görüntü yükleme hatalarını yönet
    const images = document.querySelectorAll('.certificate-image img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/placeholder.jpg'; // Yedek görsel
        });
    });
});


// Sertifika görseline tıklandığında modal aç
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imageModalContent');

    document.querySelectorAll('.certificate-image img').forEach(img => {
        img.addEventListener('click', function () {
            modal.style.display = 'flex';
            modalImg.src = this.src;
        });
    });

    document.querySelector('.modal .close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
