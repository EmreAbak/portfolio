function setActive(img) {
    document.querySelectorAll('.carousel-item').forEach(el => el.classList.remove('active'));
    img.classList.add('active');
}

function openModal(element) {
    const title = element.querySelector('h3').textContent;
    const detay = element.getAttribute('data-detay');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalText').textContent = detay;
    document.getElementById('sectorModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('sectorModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('sectorModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
function openImageModal(el) {
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('imageModalTitle');
    const modalImg = document.getElementById('imageModalContent');

    modal.style.display = 'flex';
    modalTitle.textContent = el.getAttribute('data-title');
    modalImg.src = el.getAttribute('data-detay');
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Modal dışına tıklanınca kapatma
window.addEventListener('click', function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    
});
