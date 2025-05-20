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

// Sertifika görsellerini büyütme fonksiyonu
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('enlargedImage');

    document.querySelectorAll('.certificate-image img').forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('active');
            modalImg.src = this.src;
        });
    });

    modal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
});

}); 
