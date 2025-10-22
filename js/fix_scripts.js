//@ Inicialización y configuración de WoW JS
new WOW().init();

//? Retirar atributos de delay en telefonos moviles.
document.addEventListener("DOMContentLoaded", function() {
    // Espera un poco a que WOW.js inicialice y asigne los delays
    setTimeout(function() {
        if (window.innerWidth <= 768) {
            const elements = document.querySelectorAll('.individual_value.wow');

            elements.forEach(el => {
                // Quita el atributo
                el.removeAttribute('data-wow-duration');
                el.removeAttribute('data-wow-delay');

                // Anula los estilos inline aplicados por WOW.js
                el.style.animationDelay = '0s';
                el.style.webkitAnimationDelay = '0s';
            });
        }
    }, 300);
});

//? Asignar espacio entre el navbar y el primer bloque.
document.addEventListener('DOMContentLoaded', () => {
    PRIMER_SECTION = '.promos'
    const navbar = document.querySelector('.fixed-top');
    const promos = document.querySelector(PRIMER_SECTION);
    if (navbar && promos) {
        const navbarHeight = navbar.offsetHeight;
        promos.style.marginTop = `${navbarHeight}px`;
    }
});

//? Cerrar el menú movil cuando se selecciona una opción
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navigation');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            bsCollapse.hide();
        });
    });
});

//? Agregar un movimiento menos brusco al moverse dentro de los #ids de la web
const TIEMPO_DE_MOVIMIENTO = 1000;

$("a[href^='#']").click(function(e) {
    e.preventDefault();
    
    var position = $($(this).attr("href")).offset().top;

    // Aquí está el cambio:
    $("body, html").stop().animate({
        scrollTop: position
    }, TIEMPO_DE_MOVIMIENTO);
});

//? Gestión del summary - details
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los <summary> dentro de .services
    const allSummaries = document.querySelectorAll('.services details summary');

    allSummaries.forEach((summary) => {
        summary.addEventListener('click', (event) => {
        // Prevenir el comportamiento por defecto (abrir/cerrar al instante)
        event.preventDefault();

        // Busca el elemento <details> padre
        const details = summary.closest('details');
        
        // Busca el <span> de "Ver más" dentro de este summary específico
        const span = summary.querySelector('.see_more span');

        // Revisa si se está cerrando (ya está abierto y no está en proceso de cierre)
        if (details.open && !details.classList.contains('closing')) {
            
            // --- INICIO DE CAMBIO ---
            // Cambia el texto a "Ver más"
            if (span) {
            span.textContent = 'Ver más';
            }
            // --- FIN DE CAMBIO ---

            // 1. Añade la clase .closing para iniciar la animación de CSS
            details.classList.add('closing');

            // 2. Espera a que la animación termine (0.8s)
            setTimeout(() => {
            // 3. Ahora sí, cierra el <details> y limpia la clase
            details.open = false;
            details.classList.remove('closing');
            }, 800);

        } else if (!details.open) {
            
            // --- INICIO DE CAMBIO ---
            // Cambia el texto a "Ver menos"
            if (span) {
            span.textContent = 'Ver menos';
            }
            // --- FIN DE CAMBIO ---

            // Si está cerrado, simplemente ábrelo.
            // El CSS [open] se encargará de la animación.
            details.open = true;
        }
        });
    });
});
//? Control del icono de WhatsApp
/* $('.to-top a').click(function(){
    $('html,body').animate({'scrollTop': 0,},1000);

    return false;
});

$(window).scroll(function(){
    if($(window).scrollTop()>200){
        $('.to-top a').show();
    }
    else (
        $('.to-top a').hide()
    );
})
 */

// Funcion para la seccion en deprecado
/* document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration) {
     let obj = document.getElementById(id),
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
       current += increment;
       obj.textContent = current;
       if (current == end) {
        clearInterval(timer);
       }
      }, step);


    }
    counter("count1", 0, 120, 1000);
    counter("count2", 0, 100, 1000);
    counter("count3", 0, 1200, 1000);
    counter("count4", 0, 130, 1000);
   }); */


