document.addEventListener('DOMContentLoaded', function() {
    const promosSection = document.getElementById('promos');
    const promoImages = promosSection.querySelectorAll('img');
    const breakpoint = 767;
    let currentMode = null;
    let autoSlideInterval = null;
    const SLIDE_INTERVAL = 7000; // 7 segundos

    // --- FUNCIONES DE RESPONSIVE ---
    function getNewSrc(src, mode) {
        return src.replace(/_mobile|_desktop/, `_${mode}`);
    }

    function updatePromoImages(force = false) {
        const newMode = window.innerWidth > breakpoint ? 'desktop' : 'mobile';
        if (!force && newMode === currentMode) return;
        currentMode = newMode;

        promoImages.forEach(img => {
            const currentSrc = img.getAttribute('src');
            const newSrc = getNewSrc(currentSrc, newMode);
            if (newSrc === currentSrc) return;

            const tempImg = new Image();
            tempImg.src = newSrc;
            tempImg.onload = () => {
                img.src = newSrc;
            };
        });
    }

    // --- FUNCIONES DEL SLIDER ---
    function initSlider() {
        const total = promoImages.length;

        // Si no hay imágenes -> ocultar sección
        if (total === 0) {
            promosSection.style.display = 'none';
            return;
        }

        // Si hay solo una imagen -> mostrarla sin controles
        if (total === 1) {
            promoImages[0].classList.add('active');
            return;
        }

        // Hay varias imágenes -> crear controles
        let currentIndex = 0;
        promoImages[currentIndex].classList.add('active');

        const leftBtn = document.createElement('button');
        leftBtn.className = 'control left';
        leftBtn.innerHTML = '&#10094;'; // ‹
        promosSection.appendChild(leftBtn);

        const rightBtn = document.createElement('button');
        rightBtn.className = 'control right';
        rightBtn.innerHTML = '&#10095;'; // ›
        promosSection.appendChild(rightBtn);

        function showSlide(index) {
            promoImages.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % total;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + total) % total;
            showSlide(currentIndex);
        }

        leftBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        rightBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        // --- AUTO SLIDE ---
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
    }

    // --- INICIALIZACIÓN ---
    updatePromoImages(true);
    initSlider();
    window.addEventListener('resize', updatePromoImages);
});
