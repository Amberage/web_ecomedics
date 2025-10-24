//? --- Cargar campañas desde el backend ---
function load_campaigns() {
    const CONTROLLER = "/src/controller/controller.php";
    const CAMPAIGN_CONTAINER = document.getElementById("campaigns");
    let activateBanner = false;

    if (!CAMPAIGN_CONTAINER) return;

    const formData = new FormData();
    formData.append("action", "load_campaigns");

    fetch(CONTROLLER, { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            const requestStatus = data.request_status?.[0];
            const requestMessage = data.request_status?.[1];

            if (requestStatus === true) {
                const campaigns = data.campaigns;
                let html = "";

                if (campaigns.length > 0) {
                    campaigns.forEach((campaign) => {
                        html += `
                            <article class="comunity__card">
                                <div class="card_media">
                                    <img src="${campaign.img_path}" alt="">
                                </div>
                                <footer class="card__footer">
                                    <div class="card__job-summary">
                                        <div class="card__job">
                                            <p class="card__job-title">${campaign.campaign_title}</p>
                                            <p class="text-muted description">${campaign.campaign_description}</p>
                                            <p class="text-muted date">${campaign.campaign_year}</p>
                                        </div>
                                    </div>
                                </footer>
                            </article>`;
                    });

                    CAMPAIGN_CONTAINER.innerHTML = html;
                    activateBanner = true;
                } else {
                    if(!data.campaigns === null){
                        console.error("Error al cargar promociones:", requestMessage);
                    }
                    CAMPAIGN_CONTAINER.innerHTML = "";
                    activateBanner = false;
                }
            } else {
                console.error("Error al cargar campañas:", requestMessage);
                CAMPAIGN_CONTAINER.innerHTML = "";
            }

            // Activar banner si hay campañas
            if (activateBanner) {
                initCampaignBanner();
            }
        })
        .catch((err) => console.error("Error en la solicitud:", err));
}


//? --- Inicializar carrusel de campañas ---
function initCampaignBanner() {
    const container = document.querySelector('#campaigns');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.comunity__card'));

    // No hay campañas visibles
    if (cards.length === 0) {
        container.style.display = 'none';
        return;
    }

    // Si hay pocas tarjetas, no iniciar carrusel
    if (cards.length <= 1 && window.innerWidth < 768) return;
    if (cards.length <= 2 && window.innerWidth >= 768) return;

    // --- Crear estructura del track ---
    const track = document.createElement('div');
    track.className = 'campaigns__track';

    cards.forEach((card) => {
        const slide = document.createElement('div');
        slide.className = 'campaigns__slide';
        slide.appendChild(card);
        track.appendChild(slide);
    });

    // Clonar primeros 3 para efecto infinito
    cards.slice(0, 3).forEach((card) => {
        const clone = card.cloneNode(true);
        const slide = document.createElement('div');
        slide.className = 'campaigns__slide';
        slide.appendChild(clone);
        track.appendChild(slide);
    });

    // Reemplazar contenido original
    container.innerHTML = '';
    container.appendChild(track);

    // --- Controles ---
    const leftBtn = document.createElement('button');
    leftBtn.className = 'campaigns__control left';
    leftBtn.innerHTML = '❮';
    container.appendChild(leftBtn);

    const rightBtn = document.createElement('button');
    rightBtn.className = 'campaigns__control right';
    rightBtn.innerHTML = '❯';
    container.appendChild(rightBtn);

    // --- Variables de control ---
    let index = 0;
    let isAnimating = false;
    let autoSlideInterval;

    const getVisibleCount = () => (window.innerWidth < 768 ? 1 : 3);

    function slideTo(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        const visible = getVisibleCount();
        index = newIndex;

        track.style.transition = 'transform 0.6s ease';
        track.style.transform = `translateX(-${index * (100 / visible)}%)`;

        setTimeout(() => {
            if (index >= cards.length) {
                track.style.transition = 'none';
                index = 0;
                track.style.transform = `translateX(0)`;
            } else if (index < 0) {
                track.style.transition = 'none';
                index = cards.length - 1;
                track.style.transform = `translateX(-${index * (100 / visible)}%)`;
            }
            isAnimating = false;
        }, 700);
    }

    function slideNext() {
        slideTo(index + 1);
    }

    function slidePrev() {
        slideTo(index - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(slideNext, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // --- Eventos de botones ---
    leftBtn.addEventListener('click', () => {
        slidePrev();
        resetAutoSlide();
    });

    rightBtn.addEventListener('click', () => {
        slideNext();
        resetAutoSlide();
    });

    // --- Auto-slide inicial ---
    startAutoSlide();

    // --- Reset al cambiar tamaño ---
    window.addEventListener('resize', () => {
        track.style.transition = 'none';
        track.style.transform = `translateX(0)`;
        index = 0;
    });
}


//? --- Inicializar al cargar la página ---
document.addEventListener('DOMContentLoaded', () => {
    load_campaigns();
});
