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

//? Agregar un movimiento menos brusco al moverse dentro de los id's de la web
const TIEMPO_DE_MOVIMIENTO = 1000;

$("a[href^='#']").click(function(e) {
    e.preventDefault();
    
    var position = $($(this).attr("href")).offset().top;

    // Aquí está el cambio:
    $("body, html").stop().animate({
        scrollTop: position
    }, TIEMPO_DE_MOVIMIENTO);
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


