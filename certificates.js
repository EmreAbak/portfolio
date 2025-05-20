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
document.querySelectorAll('.certificate-image').forEach(image => {
    image.addEventListener('click', function() {
        const img = this.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        // Modalı kapatma
        modal.addEventListener('click', function() {
            this.remove();
        });
    });
}); 