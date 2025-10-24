//? --- Cargar Promociones y activar banner dinámico ---
function load_promotions() {
    const CONTROLLER = "/src/controller/controller.php";
    const PROMOTION_CONTAINER = document.getElementById("promo_inyection");
    const track = document.querySelector(".promo-track");

    if (!PROMOTION_CONTAINER || !track) return;

    let action = "load_promotions";
    let formData = new FormData();
    formData.append("action", action);

    fetch(CONTROLLER, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => {
            const requestStatus = data.request_status?.[0];
            const requestMessage = data.request_status?.[1];
            let activateBanner = false;

            if (requestStatus === true) {
                const promotions = data.promotions;
                let promotionsHTML = "";

                // Si hay promociones activas
                if (promotions.length > 0) {
                    promotions.forEach((promotion) => {
                        promotionsHTML += `<img class="img-fluid" src="${promotion.img_path}" alt="Promoción">`;
                    });

                    PROMOTION_CONTAINER.innerHTML = promotionsHTML;
                    activateBanner = true;
                } else {
                    PROMOTION_CONTAINER.innerHTML = "";
                    activateBanner = false;
                }
            } else {
                if(!data.promotions === null){
                    console.error("Error al cargar promociones:", requestMessage);
                }
                PROMOTION_CONTAINER.innerHTML = "";
            }

            // Si hay promociones activas, inicializar el banner
            if (activateBanner) {
                initPromoBanner();
            }
        })
        .catch((err) => console.error("Error en la solicitud:", err));
}


//? --- Inicializar el banner (carousel) ---
function initPromoBanner() {
    const track = document.querySelector(".promo-track");
    if (!track) return;

    const images = Array.from(track.querySelectorAll("img"));
    const prevBtn = document.querySelector(".promo-prev");
    const nextBtn = document.querySelector(".promo-next");

    // No hay imágenes
    if (images.length === 0) return;

    // Solo una imagen (sin controles)
    if (images.length === 1) {
        images[0].classList.add("active");
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
    }

    // --- Carousel funcional ---
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

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextImage, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Botones
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

    // Inicializar carousel
    showImage(currentIndex);
    startAutoSlide();
}


document.addEventListener("DOMContentLoaded", () => {
    load_promotions();
});

