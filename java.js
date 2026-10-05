/* =========================================================
   CONFIGURACIÓN GENERAL MYTECH 3D
   SEGURIDAD / MANTENIMIENTO:
   - El número comercial se define UNA sola vez.
   - No coloques contraseñas, tokens ni API keys en este archivo.
========================================================= */
const MYTECH_WHATSAPP = "51926850884";

function configurarEnlacesWhatsApp() {
    document.querySelectorAll("[data-whatsapp-link]").forEach(enlace => {
        enlace.href = `https://wa.me/${MYTECH_WHATSAPP}`;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", configurarEnlacesWhatsApp);
} else {
    configurarEnlacesWhatsApp();
}

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        menu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");

    });

    menu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");

        });

    });

}




/* =========================================================
   PRECIOS DEL CATÁLOGO
   Para cambiar un precio, edita data-cost="S/ XX" en index.html.
========================================================= */
document.querySelectorAll(".catalogo-product").forEach(producto => {
    const precio = producto.querySelector(".catalogo-precio");
    if (precio) {
        precio.textContent = producto.dataset.cost || "Consultar";
    }
});

const formulario = document.getElementById("formulario");

/* =========================================================
   PEDIDO DIRECTO POR WHATSAPP
   Abre el WhatsApp de MyTech 3D con los datos del formulario
   y el número de la pieza seleccionada del catálogo.
========================================================= */

if (formulario) {

    formulario.addEventListener("submit", function (e) {

        e.preventDefault();

        const nombre =
            document.getElementById("nombre")?.value.trim() || "";

        const tipo =
            document.getElementById("tipo")?.value || "";

        const tamano =
            document.getElementById("tamano")?.value.trim() || "";

        const descripcion =
            document.getElementById("descripcion")?.value.trim() || "";

        const piezaNombre =
            document.getElementById("pedidoPiezaNombre")?.textContent.trim() || "";

        const piezaNumero =
            formulario.dataset.catalogoNumero || "";

        const piezaPrecio =
            formulario.dataset.catalogoPrecio || "";

        if (!nombre || !tipo || !descripcion) {
            return;
        }

        let piezaTexto = "";

        if (piezaNumero) {
            piezaTexto = `Pieza del catálogo: N.º ${piezaNumero}`;

            if (piezaNombre && piezaNombre !== "—") {
                piezaTexto += ` — ${piezaNombre}`;
            }

            piezaTexto += "\n";
            if (piezaPrecio) {
                piezaTexto += `Precio: ${piezaPrecio}\n`;
            }
        }

        const mensaje =
            `Hola MyTech 3D. Me gustaría solicitar una cotización.\n\n` +
            `Nombre: ${nombre}\n` +
            `Tipo de proyecto: ${tipo || "No especificado"}\n` +
            `Tamaño aproximado: ${tamano || "No especificado"}\n` +
            piezaTexto +
            `Descripción: ${descripcion}\n\n` +
            `Quedo atento a su respuesta y a la cotización correspondiente. Gracias.`;
        const urlWhatsApp =
            `https://wa.me/${MYTECH_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

        window.open(urlWhatsApp, "_blank", "noopener,noreferrer");

        // Reinicia el formulario inmediatamente después de abrir WhatsApp.
        formulario.reset();
        delete formulario.dataset.catalogoNumero;
        delete formulario.dataset.catalogoPrecio;

        const piezaSeleccionada =
            document.getElementById("pedidoPiezaSeleccionada");

        const piezaNombreElemento =
            document.getElementById("pedidoPiezaNombre");

        const piezaImagenElemento =
            document.getElementById("pedidoPiezaImagen");

        if (piezaSeleccionada) {
            piezaSeleccionada.hidden = true;
            piezaSeleccionada.classList.remove("is-visible");
        }

        if (piezaNombreElemento) {
            piezaNombreElemento.textContent = "—";
        }

        if (piezaImagenElemento) {
            piezaImagenElemento.removeAttribute("src");
            piezaImagenElemento.alt = "Pieza seleccionada";
        }
    });
}


const year = document.getElementById("year"); 
 
if (year) { 
    year.textContent = new Date().getFullYear(); 
} 
 
 
/* ========================================================= 
   ANIMACIONES GSAP 
========================================================= */ 
 
if ( 
    typeof gsap !== "undefined" && 
    typeof ScrollTrigger !== "undefined" 
) { 
 
    gsap.registerPlugin(ScrollTrigger); 
 
    const reduceMotion = 
        window.matchMedia("(prefers-reduced-motion: reduce)").matches; 
 
    if (!reduceMotion) { 
 
        gsap.to("#scrollProgress", { 
 
            width: "100%", 
 
            ease: "none", 
 
            scrollTrigger: { 
                trigger: document.body, 
                start: "top top", 
                end: "bottom bottom", 
                scrub: true 
            } 
 
        }); 
 
 
        /* ===================================================== 
           HERO 
           ANIMACIÓN PARA EL VIDEO + TEXTO 
        ====================================================== */ 
 
        const heroTimeline = 
            gsap.timeline({ 
                defaults: { 
                    ease: "power3.out" 
                } 
            }); 
 
 
        heroTimeline 
 
            .from(".hero-video", { 
 
                opacity: 0, 
                duration: 1.8, 
                ease: "power2.out" 
 
            }) 
 
            .from(".hero-overlay", { 
 
                opacity: 0, 
                duration: 1.2 
 
            }, "-=1.2") 
 
            .from(".hero-reveal", { 
 
                y: 35, 
                opacity: 0, 
                duration: 0.6, 
                stagger: 0.03 
 
            }, "-=1.1"); 
 
 
        /* ===================================================== 
           MOVIMIENTO SUAVE DEL VIDEO 
        ====================================================== */ 
 
        gsap.to(".hero-video", { 
 
            scale: 1.08, 
 
            ease: "none", 
 
            scrollTrigger: { 
 
                trigger: ".hero", 
                start: "top top", 
                end: "bottom top", 
                scrub: 2 
 
            } 
 
        }); 
 
 
        /* ===================================================== 
           MOVIMIENTO DEL TEXTO AL HACER SCROLL 
        ====================================================== */ 
 
        gsap.to(".hero-text", { 
 
            y: -55, 
            opacity: 0.25, 
 
            ease: "none", 
 
            scrollTrigger: { 
 
                trigger: ".hero", 
                start: "top top", 
                end: "bottom top", 
                scrub: 1 
 
            } 
 
        }); 
 
 
        /* ===================================================== 
           MOVIMIENTO DEL BRILLO 
        ====================================================== */ 
 
        gsap.to(".hero-light", { 
 
            x: 130, 
            y: -50, 
            scale: 1.25, 
 
            ease: "none", 
 
            scrollTrigger: { 
 
                trigger: ".hero", 
                start: "top top", 
                end: "bottom top", 
                scrub: 1.5 
 
            } 
 
        }); 
 
 
        /* ===================================================== 
           RESTO DE ANIMACIONES ORIGINALES 
        ====================================================== */ 
 
        gsap.utils 
            .toArray(".reveal-up") 
            .forEach(element => { 
 
                gsap.fromTo( 
 
                    element, 
 
                    { 
                        y: 60, 
                        opacity: 0 
                    }, 
 
                    { 
                        y: 0, 
                        opacity: 1, 
                        duration: 1, 
                        ease: "power3.out", 
 
                        scrollTrigger: { 
 
                            trigger: element, 
                            start: "top 85%", 
                            toggleActions: 
                                "play none none reverse" 
 
                        } 
 
                    } 
                ); 
 
            }); 
 
 
        gsap.utils 
            .toArray(".reveal-card") 
            .forEach((card, index) => { 
 
                gsap.fromTo( 
 
                    card, 
 
                    { 
                        y: 70, 
                        opacity: 0, 
                        scale: 0.96 
                    }, 
 
                    { 
 
                        y: 0, 
                        opacity: 1, 
                        scale: 1, 
                        duration: 0.9, 
                        delay: (index % 4) * 0.08, 
                        ease: "power3.out", 
 
                        scrollTrigger: { 
 
                            trigger: card, 
                            start: "top 88%", 
                            toggleActions: 
                                "play none none reverse" 
 
                        } 
 
                    } 
 
                ); 
 
            }); 
 
 
        gsap.utils 
            .toArray(".image-reveal") 
            .forEach(item => { 
 
                const image = 
                    item.querySelector("img"); 
 
                gsap.fromTo( 
 
                    image, 
 
                    { 
                        scale: 1.22, 
                        yPercent: 7 
                    }, 
 
                    { 
 
                        scale: 1, 
                        yPercent: 0, 
                        ease: "none", 
 
                        scrollTrigger: { 
 
                            trigger: item, 
                            start: "top 95%", 
                            end: "center 48%", 
                            scrub: 1.1 
 
                        } 
 
                    } 
 
                ); 
 
            }); 
 
 
        gsap.utils 
            .toArray(".galeria-item") 
            .forEach((item, index) => { 
 
                let targetY = -60; 
 
                if (index === 4) { 
                    targetY = 70; 
                } 
 
                if (index === 1) { 
                    targetY = 40; 
                } 
 
                gsap.to(item, { 
 
                    y: targetY, 
                    ease: "none", 
 
                    scrollTrigger: { 
 
                        trigger: item, 
                        start: "top bottom", 
                        end: "bottom top", 
                        scrub: 1.5 
 
                    } 
 
                }); 
 
            }); 
 
 
        gsap.utils 
            .toArray(".service-card") 
            .forEach((card, index) => { 
 
                gsap.to(card, { 
 
                    y: index % 2 === 0 ? -18 : 18, 
                    ease: "none", 
 
                    scrollTrigger: { 
 
                        trigger: "#servicios", 
                        start: "top bottom", 
                        end: "bottom top", 
                        scrub: 1.4 
 
                    } 
 
                }); 
 
            }); 
 
 
        gsap.utils 
            .toArray(".paso") 
            .forEach((step, index) => { 
 
                gsap.fromTo( 
 
                    step, 
 
                    { 
                        x: index % 2 === 0 ? -35 : 35, 
                        opacity: 0 
                    }, 
 
                    { 
 
                        x: 0, 
                        opacity: 1, 
                        duration: 0.8, 
                        ease: "power3.out", 
 
                        scrollTrigger: { 
 
                            trigger: step, 
                            start: "top 88%", 
                            toggleActions: 
                                "play none none reverse" 
 
                        } 
 
                    } 
 
                ); 
 
            }); 
 
 
        gsap.fromTo( 
 
            ".pedido-form", 
 
            { 
                y: 70, 
                opacity: 0, 
                scale: 0.97 
            }, 
 
            { 
 
                y: 0, 
                opacity: 1, 
                scale: 1, 
                duration: 1, 
                ease: "power3.out", 
 
                scrollTrigger: { 
 
                    trigger: ".pedido-form", 
                    start: "top 85%", 
                    toggleActions: 
                        "play none none reverse" 
 
                } 
 
            } 
 
        ); 
 
 
        window.addEventListener( 
            "load", 
            () => ScrollTrigger.refresh() 
        ); 
 
    } 
 
} 
 
 
/* ========================================================= 
   ROBOT MYTECH 
   EDITA AQUÍ LAS FRASES, VELOCIDAD E INTERACCIONES. 
========================================================= */ 
 
document.addEventListener("DOMContentLoaded", () => { 
 
    const area = 
        document.getElementById("mytech-robot-container"); 
 
    const robot = 
        document.getElementById("mytech-robot"); 
 
    const body = 
        document.getElementById("mytech-robot-body"); 
 
    const speech = 
        document.getElementById("mytech-robot-speech"); 
 
    const text = 
        document.getElementById("mytech-robot-text"); 
 
    const eyeL = 
        document.getElementById("mytech-eye-l"); 
 
    const eyeR = 
        document.getElementById("mytech-eye-r"); 
 
 
    if ( 
        !area || 
        !robot || 
        !body || 
        !speech || 
        !text || 
        !eyeL || 
        !eyeR 
    ) { 
        return; 
    } 
 
 
    const frases = [ 
 
        "¡Hola! 👋", 
 
        "¡Bienvenido a MyTech 3D! 🤖", 
 
        "¿Qué vamos a crear hoy? 💡", 
 
        "¿Necesitas una pieza personalizada?", 
 
        "Puedo ayudarte a pedir una impresión 3D.", 
 
        "¿Tienes un modelo 3D? Podemos imprimirlo.", 
 
        "¿Necesitas diseñar una pieza desde cero? 📐", 
 
        "¡Tu idea puede convertirse en una pieza real!", 
 
        "¿Quieres una cotización para tu proyecto? 💰", 
 
        "Trabajamos con impresión 3D personalizada.", 
 
        "¿Qué tamaño tendrá tu pieza? 📏", 
 
        "¡Envíanos tu idea y cotizamos tu proyecto!", 
 
        "Filamento listo... 🧵", 
 
        "Impresora preparada. 🖨️", 
 
        "Modelo cargado correctamente. ⚙️", 
 
        "Precisión al milímetro. 📐", 
 
        "¿Ya viste nuestros trabajos?", 
 
        "También hacemos piezas a medida.", 
 
        "¿Buscas una pieza difícil de conseguir?", 
 
        "Podemos convertir tu idea en un modelo 3D.", 
 
        "¡MyTech 3D crea, imprime y transforma! 💚", 
 
        "¿Tienes una idea? Yo te acompaño. 🤖", 
 
        "¡Ese proyecto merece una impresión 3D!", 
 
        "No necesitas saber modelar, cuéntanos tu idea.", 
 
        "¡Listos para crear algo increíble! 🚀", 
 
        "MyTech 3D 💚" 
 
    ]; 
 
 
    let velocidad = 1.15; 
 
 
    let x = 20; 
    let direccion = 1; 
    let interactuando = false; 
    let hablando = false; 
    let ultimoDobleClick = 0; 
    let contadorClicks = 0; 
 
 
    function hablar(mensaje) { 
 
        if (!mensaje) { 
 
            mensaje = 
                frases[ 
                    Math.floor( 
                        Math.random() * frases.length 
                    ) 
                ]; 
 
        } 
 
        text.textContent = mensaje; 
 
        speech.classList.add("active"); 
 
        hablando = true; 
 
        clearTimeout(speech.timer); 
 
        speech.timer = setTimeout(() => { 
 
            speech.classList.remove("active"); 
 
            hablando = false; 
 
        }, 3600); 
 
    } 
 
 
    function ojos(tipo) { 
 
        const estados = { 
 
            feliz: [ 
                "M72 82 A13 13 0 0 1 92 82 A5 5 0 0 1 72 82Z", 
                "M108 82 A13 13 0 0 1 128 82 A5 5 0 0 1 108 82Z" 
            ], 
 
            sorprendido: [ 
                "M72 82 A10 10 0 1 1 92 82 A10 10 0 1 1 72 82Z", 
                "M108 82 A10 10 0 1 1 128 82 A10 10 0 1 1 108 82Z" 
            ], 
 
            cerrado: [ 
                "M72 84 Q82 90 92 84", 
                "M108 84 Q118 90 128 84" 
            ] 
 
        }; 
 
 
        const estado = 
            estados[tipo] || estados.feliz; 
 
        eyeL.setAttribute("d", estado[0]); 
        eyeR.setAttribute("d", estado[1]); 
 
    } 
 
 
    function sorpresa() { 
 
        ojos("sorprendido"); 
 
        hablar("¡Oh! ¿Qué pasó? 😳"); 
 
        robot.classList.add("happy"); 
 
        setTimeout(() => { 
 
            robot.classList.remove("happy"); 
 
            ojos("feliz"); 
 
        }, 700); 
 
    } 
 
 
    function salto() { 
 
        robot.classList.add( 
            "happy", 
            "waving" 
        ); 
 
        ojos("sorprendido"); 
 
        hablar("¡WOOO! 🚀"); 
 
        setTimeout(() => { 
 
            robot.classList.remove( 
                "happy", 
                "waving" 
            ); 
 
            ojos("feliz"); 
 
        }, 900); 
 
    } 
 
 
    function caminar() { 
 
        if (!interactuando) { 
 
            const margenGlobo = 
                Math.max( 
                    15, 
                    (speech.offsetWidth - robot.offsetWidth) / 2 + 10 
                ); 
 
            const limite = 
                Math.max( 
                    margenGlobo, 
                    area.clientWidth - robot.offsetWidth - margenGlobo 
                ); 
 
            x += velocidad * direccion; 
 
            if (x >= limite) { 
 
                x = limite; 
                direccion = -1; 
 
            } 
 
            if (x <= margenGlobo) { 
 
                x = margenGlobo; 
                direccion = 1; 
 
            } 
 
            body.style.transform = 
                `scaleX(${direccion === 1 ? 1 : -1})`; 
 
            robot.style.left = 
                `${x}px`; 
 
            robot.classList.add("walking"); 
 
        } 
 
        requestAnimationFrame(caminar); 
 
    } 
 
 
    robot.addEventListener("mouseenter", () => { 
 
        if (!interactuando) { 
 
            ojos("sorprendido"); 
 
            hablar( 
                "¡Me encontraste! 👀 ¿Listo para crear?" 
            ); 
 
        } 
 
    }); 
 
 
    robot.addEventListener("mouseleave", () => { 
 
        if (!interactuando) { 
 
            ojos("feliz"); 
 
        } 
 
    }); 
 
 
    robot.addEventListener("click", () => { 
 
        if (interactuando) { 
            return; 
        } 
 
        contadorClicks++; 
 
        interactuando = true; 
 
        robot.classList.add( 
            "happy", 
            "waving" 
        ); 
 
        ojos("sorprendido"); 
 
 
        if (contadorClicks % 5 === 0) { 
 
            hablar( 
                "¡Ya somos un equipo! 🤖💚" 
            ); 
 
        } else { 
 
            const mensajesClick = [ 
 
                "¡Hola! ¿Qué vamos a imprimir? 🖨️", 
 
                "¿Tienes una pieza para cotizar?", 
 
                "¡Cuéntame tu idea! 💡", 
 
                "¿Necesitas una pieza personalizada?", 
 
                "¡Vamos a convertir esa idea en realidad! 🚀", 
 
                "¿Quieres ver nuestros trabajos?" 
 
            ]; 
 
            hablar( 
                mensajesClick[ 
                    Math.floor( 
                        Math.random() * 
                        mensajesClick.length 
                    ) 
                ] 
            ); 
 
        } 
 
 
        setTimeout(() => { 
 
            robot.classList.remove( 
                "happy", 
                "waving" 
            ); 
 
            ojos("feliz"); 
 
            direccion *= -1; 
 
            interactuando = false; 
 
        }, 1600); 
 
    }); 
 
 
    robot.addEventListener("dblclick", () => { 
 
        const ahora = Date.now(); 
 
        if (ahora - ultimoDobleClick < 500) { 
 
            salto(); 
 
        } 
 
        ultimoDobleClick = ahora; 
 
    }); 
 
 
    robot.addEventListener("contextmenu", e => { 
 
        e.preventDefault(); 
 
        const nuevaVelocidad = 
            velocidad === 1.15 ? 2.5 : 1.15; 
 
        velocidad = nuevaVelocidad; 
 
        hablar( 
            velocidad > 2 
                ? "¡Modo turbo activado! ⚡" 
                : "Volví a mi velocidad normal 😌" 
        ); 
 
    }); 
 
 
    window.addEventListener("mousemove", e => { 
 
        if (interactuando) { 
            return; 
        } 
 
        const rect = 
            robot.getBoundingClientRect(); 
 
        const centroX = 
            rect.left + rect.width / 2; 
 
        const centroY = 
            rect.top + rect.height / 2; 
 
        const movimientoX = 
            Math.max( 
                -4, 
                Math.min( 
                    4, 
                    (e.clientX - centroX) / 70 
                ) 
            ); 
 
        const movimientoY = 
            Math.max( 
                -3, 
                Math.min( 
                    3, 
                    (e.clientY - centroY) / 70 
                ) 
            ); 
 
        eyeL.style.transform = 
            `translate(${movimientoX}px, ${movimientoY}px)`; 
 
        eyeR.style.transform = 
            `translate(${movimientoX}px, ${movimientoY}px)`; 
 
    }); 
 
 
    robot.addEventListener("touchstart", () => { 
 
        if (!interactuando) { 
 
            sorpresa(); 
 
        } 
 
    }, { 
        passive: true 
    }); 
 
 
    setInterval(() => { 
 
        if (interactuando) { 
            return; 
        } 
 
        ojos("cerrado"); 
 
        setTimeout(() => { 
 
            if (!interactuando) { 
                ojos("feliz"); 
            } 
 
        }, 180); 
 
    }, 4500); 
 
 
    setInterval(() => { 
 
        if ( 
            interactuando || 
            hablando 
        ) { 
            return; 
        } 
 
        if (Math.random() < 0.75) { 
 
            hablar(); 
 
        } 
 
    }, 7000); 
 
 
    setInterval(() => { 
 
        if (!interactuando) { 
 
            const azar = 
                Math.random(); 
 
            if (azar < 0.33) { 
 
                velocidad = 0.8; 
 
            } else if (azar < 0.66) { 
 
                velocidad = 1.15; 
 
            } else { 
 
                velocidad = 1.8; 
 
            } 
 
        } 
 
    }, 10000); 
 
 
    area.addEventListener("click", e => { 
 
        if ( 
            e.target === area && 
            !interactuando 
        ) { 
 
            hablar( 
                "¡Oye! Estoy aquí para ayudarte con tu proyecto 😂" 
            ); 
 
        } 
 
    }); 
 
 
    ojos("feliz"); 
 
    hablar("¡Hola! 👋 ¿Qué vamos a crear?"); 
 
    caminar(); 
 
}); 
 
 
 
 
/* ========================================================= 
   CATÁLOGO — MOVIMIENTO LATERAL POR FILAS 
   Primera fila: izquierda. Segunda: derecha. Y así sucesivamente. 
========================================================= */ 
(function () { 
    const grid = document.getElementById("catalogoGrid"); 
    if (!grid) return; 
 
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)"); 
    let rafId = null; 
    let startTime = performance.now(); 
 
    function animateCatalogRows(now) { 
        if (prefersReduced.matches) { 
            grid.querySelectorAll(".catalogo-product").forEach(product => { 
                product.style.setProperty("--catalogo-shift", "0px"); 
            }); 
            return; 
        } 
 
        const products = Array.from(grid.querySelectorAll(".catalogo-product:not(.is-hidden)")); 
        if (!products.length) return; 
 
        const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length; 
        const amplitude = window.innerWidth <= 100 ? 3 : window.innerWidth <= 800 ? 4 : 120; 
        const speed = 0.00060; 
        const elapsed = now - startTime; 
 
        products.forEach((product, index) => { 
            const row = Math.floor(index / Math.max(columns, 1)); 
            const direction = row % 2 === 0 ? -1 : 1; 
            const phase = (elapsed * speed) + row * 0.55; 
            const shift = Math.sin(phase) * amplitude * direction; 
            product.style.setProperty("--catalogo-shift", `${shift.toFixed(3)}px`); 
        }); 
 
        rafId = requestAnimationFrame(animateCatalogRows); 
    } 
 
    function startAnimation() { 
        if (rafId) cancelAnimationFrame(rafId); 
        startTime = performance.now(); 
        rafId = requestAnimationFrame(animateCatalogRows); 
    } 
 
    window.addEventListener("resize", startAnimation, { passive: true }); 
    startAnimation(); 
})(); 
 
 
/* =========================================================
   CATÁLOGO — FICHA LIQUID GLASS + PEDIDO
========================================================= */
(function () {
    const catalog = document.getElementById("catalogo");
    const grid = document.getElementById("catalogoGrid");
    const modal = document.getElementById("catalogoModal");
    const backdrop = modal?.querySelector(".catalogo-modal-backdrop");
    const card = modal?.querySelector(".catalogo-modal-card");
    const modalImage = document.getElementById("catalogoModalImage");
    const shine = modal?.querySelector(".catalogo-modal-media-shine");
    const closeButtons = modal?.querySelectorAll("[data-catalogo-close]");
    const products = grid
        ? Array.from(grid.querySelectorAll(".catalogo-product"))
        : [];

    if (!catalog || !grid || !modal || !backdrop || !card || !modalImage || !products.length) {
        return;
    }

    const title = document.getElementById("catalogoModalTitle");
    const category = document.getElementById("catalogoModalCategory");
    const description = document.getElementById("catalogoModalDescription");
    const time = document.getElementById("catalogoModalTime");
    const material = document.getElementById("catalogoModalMaterial");
    const cost = document.getElementById("catalogoModalCost");
    const size = document.getElementById("catalogoModalSize");
    const fill = document.getElementById("catalogoModalFill");
    const finish = document.getElementById("catalogoModalFinish");
    const order = document.getElementById("catalogoModalOrder");

    const pedido = document.getElementById("pedido");
    const pedidoPieza = document.getElementById("pedidoPiezaSeleccionada");
    const pedidoPiezaImagen = document.getElementById("pedidoPiezaImagen");
    const pedidoPiezaNombre = document.getElementById("pedidoPiezaNombre");

    let activeProduct = null;
    let lastFocused = null;
    let modalOpen = false;
    let openingFromRect = null;

    const labels = {
        figuras: "Figuras",
        personajes: "Personajes",
        piezas: "Piezas",
        prototipos: "Prototipos",
        accesorios: "Accesorios",
        decoracion: "Decoración",
        especiales: "Especiales"
    };

    function setText(element, value) {
        if (element) element.textContent = value || "—";
    }

    function getProductImage(product) {
        const img = product?.querySelector("img");
        return img?.currentSrc || img?.src || "";
    }

    function fillModal(product) {
        const data = product.dataset;
        const img = product.querySelector("img");

        setText(category, labels[data.category] || data.category || "Producto");
        setText(title, data.title);
        setText(description, data.description);
        setText(time, data.time);
        setText(material, data.material);
        setText(cost, data.cost);
        setText(size, data.size);
        setText(fill, data.fill);
        setText(finish, data.finish);

        modalImage.src = getProductImage(product);
        modalImage.alt = img?.alt || data.title || "Producto";
    }

    function getOrigin(product) {
        const media = product.querySelector(".catalogo-product-image");
        return (media || product).getBoundingClientRect();
    }

    function selectProductForOrder(product) {
        if (!product) return;

        const productName = product.dataset.title || "Pieza seleccionada";
        const productNumber =
            product.querySelector(".catalogo-number")?.textContent.trim() || "";
        const imageUrl = getProductImage(product);

        if (formulario) {
            formulario.dataset.catalogoNumero = productNumber;
        formulario.dataset.catalogoPrecio = product.dataset.cost || "";
        }

        if (pedidoPiezaImagen) {
            pedidoPiezaImagen.src = imageUrl;
            pedidoPiezaImagen.alt = productName;
        }

        if (pedidoPiezaNombre) {
            pedidoPiezaNombre.textContent =
                productNumber
                    ? `N.º ${productNumber} — ${productName}`
                    : productName;
        }

        if (pedidoPieza) {
            pedidoPieza.hidden = false;
            pedidoPieza.classList.add("is-visible");
        }

        const tipo = document.getElementById("tipo");
        const descriptionField = document.getElementById("descripcion");

        if (tipo) {
            tipo.value = "Impresión 3D";
        }

        if (descriptionField) {
            descriptionField.value =
                `Quiero solicitar la pieza "${productName}". Me gustaría recibir una cotización.`;
        }

        return {
            name: productName,
            number: productNumber,
            imageUrl
        };
    }

    function scrollToPedido() {
        if (!pedido) return;

        requestAnimationFrame(() => {
            setTimeout(() => {
                pedido.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                setTimeout(() => {
                    document.getElementById("nombre")?.focus({ preventScroll: true });
                }, 650);
            }, 80);
        });
    }

    function openModal(product) {
        if (modalOpen) return;

        activeProduct = product;
        lastFocused = document.activeElement;
        openingFromRect = getOrigin(product);

        fillModal(product);

        modalOpen = true;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("catalogo-modal-open");
        product.classList.add("is-selected");

        const finalRect = card.getBoundingClientRect();
        const originCenterX = openingFromRect.left + openingFromRect.width / 2;
        const originCenterY = openingFromRect.top + openingFromRect.height / 2;
        const finalCenterX = finalRect.left + finalRect.width / 2;
        const finalCenterY = finalRect.top + finalRect.height / 2;
        const scaleX = Math.max(0.08, openingFromRect.width / finalRect.width);
        const scaleY = Math.max(0.08, openingFromRect.height / finalRect.height);

        if (typeof gsap !== "undefined") {
            gsap.killTweensOf([backdrop, card, modalImage, shine]);

            gsap.set(backdrop, {
                opacity: 0,
                backdropFilter: "blur(0px) saturate(100%)"
            });

            gsap.set(card, {
                opacity: .92,
                x: originCenterX - finalCenterX,
                y: originCenterY - finalCenterY,
                scaleX,
                scaleY,
                transformOrigin: "center center"
            });

            gsap.set(modalImage, { scale: 1.12 });

            gsap.to(backdrop, {
                opacity: 1,
                duration: .38,
                ease: "power2.out"
            });

            gsap.to(backdrop, {
                backdropFilter: "blur(18px) saturate(125%)",
                duration: .55,
                ease: "power2.out"
            });

            gsap.to(card, {
                opacity: 1,
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                duration: .68,
                ease: "expo.out"
            });

            gsap.to(modalImage, {
                scale: 1,
                duration: .9,
                ease: "power3.out"
            });

            gsap.fromTo(
                shine,
                { xPercent: -30, opacity: 0 },
                { xPercent: 30, opacity: 1, duration: .95, ease: "power2.out" }
            );

            gsap.fromTo(
                ".catalogo-modal-content > *",
                { y: 18, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: .45,
                    stagger: .045,
                    delay: .22,
                    ease: "power3.out"
                }
            );
        } else {
            card.style.opacity = "1";
            card.style.transform = "none";
            backdrop.style.opacity = "1";
        }

        setTimeout(() => {
            modal.querySelector(".catalogo-modal-close")?.focus();
        }, 80);
    }

    function closeModal(restoreFocus = true, callback = null) {
        if (!modalOpen) {
            callback?.();
            return;
        }

        modalOpen = false;
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("catalogo-modal-open");

        const finishClose = () => {
            modal.classList.remove("is-open");

            if (activeProduct) {
                activeProduct.classList.remove("is-selected");
            }

            const previousProduct = activeProduct;
            activeProduct = null;
            openingFromRect = null;

            if (
                restoreFocus &&
                lastFocused &&
                typeof lastFocused.focus === "function"
            ) {
                lastFocused.focus({ preventScroll: true });
            }

            lastFocused = null;
            callback?.(previousProduct);
        };

        if (typeof gsap !== "undefined" && openingFromRect) {
            const finalRect = card.getBoundingClientRect();

            const originCenterX =
                openingFromRect.left + openingFromRect.width / 2;
            const originCenterY =
                openingFromRect.top + openingFromRect.height / 2;

            const finalCenterX =
                finalRect.left + finalRect.width / 2;
            const finalCenterY =
                finalRect.top + finalRect.height / 2;

            const scaleX = Math.max(
                0.08,
                openingFromRect.width / finalRect.width
            );

            const scaleY = Math.max(
                0.08,
                openingFromRect.height / finalRect.height
            );

            gsap.killTweensOf([backdrop, card, modalImage, shine]);

            gsap.to(backdrop, {
                opacity: 0,
                backdropFilter: "blur(0px) saturate(100%)",
                duration: .28,
                ease: "power2.in"
            });

            gsap.to(card, {
                opacity: .35,
                x: originCenterX - finalCenterX,
                y: originCenterY - finalCenterY,
                scaleX,
                scaleY,
                duration: .40,
                ease: "power3.in",
                onComplete: finishClose
            });
        } else {
            finishClose();
        }
    }

    products.forEach(product => {
        product.addEventListener("click", () => openModal(product));

        product.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(product);
            }
        });
    });

    closeButtons?.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            closeModal(true);
        });
    });

    order?.addEventListener("click", event => {
        event.preventDefault();

        if (!activeProduct) return;

        const selectedProduct = activeProduct;

        selectProductForOrder(selectedProduct);

        // Cerramos la ficha sin devolver el foco a la tarjeta.
        // Luego hacemos un único scroll suave hacia el formulario.
        closeModal(false, () => {
            scrollToPedido();
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modalOpen) {
            closeModal(true);
        }
    });

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal(true);
        }
    });

    window.addEventListener(
        "resize",
        () => {
            if (modalOpen && activeProduct) {
                openingFromRect = getOrigin(activeProduct);
            }
        },
        { passive: true }
    );
})();

