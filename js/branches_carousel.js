document.addEventListener('DOMContentLoaded', function() {
    const row = document.querySelector('#branches .row');
    const cards = Array.from(row.children);

    // Crear estructura del carrusel
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('branches_carousel-container');

    const carouselTrack = document.createElement('div');
    carouselTrack.classList.add('branches_carousel-track');

    // Mover las tarjetas al track
    cards.forEach(card => carouselTrack.appendChild(card));

    // Insertar estructura en el DOM
    carouselContainer.appendChild(carouselTrack);
    row.parentNode.replaceChild(carouselContainer, row);

    // Botones de navegación
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    prevButton.classList.add('branches_carousel-btn', 'prev');
    nextButton.classList.add('branches_carousel-btn', 'next');
    prevButton.innerHTML = '&#10094;';
    nextButton.innerHTML = '&#10095;';
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

    let currentIndex = 0;
    const totalCards = cards.length;
    let visibleCards = getVisibleCards();

    // Ajustar número visible según el ancho del viewport
    function getVisibleCards() {
        if (window.innerWidth < 768) return 1; // móviles
        else if (window.innerWidth < 992) return 2; // tablets
        else return 3; // escritorio
    }

    // Actualizar tamaño de las tarjetas dinámicamente
    function updateCardWidths() {
        const containerWidth = carouselContainer.offsetWidth;
        const cardWidth = containerWidth / visibleCards;
        cards.forEach(card => {
            card.style.minWidth = cardWidth + 'px';
            card.style.maxWidth = cardWidth + 'px';
        });
        updateCarousel();
    }

    // Mover el carrusel
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // Función para reiniciar el contador del auto-slide
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => nextButton.click(), 5000);
    }

    // Botones con reinicio de contador
    nextButton.addEventListener('click', () => {
        if (currentIndex < totalCards - visibleCards) currentIndex++;
        else currentIndex = 0; // volver al inicio
        updateCarousel();
        resetAutoSlide(); // reinicia el temporizador
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) currentIndex--;
        else currentIndex = totalCards - visibleCards;
        updateCarousel();
        resetAutoSlide(); // reinicia el temporizador
    });

    // Auto-slide cada 5s
    let autoSlide = setInterval(() => nextButton.click(), 5000);

    // Recalcular cuando cambia el tamaño de pantalla
    window.addEventListener('resize', () => {
        visibleCards = getVisibleCards();
        updateCardWidths();
    });

    // Inicializar
    updateCardWidths();
});