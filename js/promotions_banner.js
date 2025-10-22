document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".promo-track");
    if (!track) return; // Si no existe el contenedor, salir

    const images = Array.from(track.querySelectorAll("img"));
    const prevBtn = document.querySelector(".promo-prev");
    const nextBtn = document.querySelector(".promo-next");

    // Si no hay imágenes, salir sin hacer nada
    if (images.length === 0) return;

    // Si hay solo una imagen, mostrarla y ocultar controles
    if (images.length === 1) {
        images[0].classList.add("active");
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
    }

    // Si hay más de una imagen, activar el carousel
    let currentIndex = 0;
    let autoSlideInterval;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // Auto-slide cada 5s
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextImage, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Eventos
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextImage();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevImage();
            startAutoSlide();
        });
    }

    // Inicializar
    showImage(currentIndex);
    startAutoSlide();
});
