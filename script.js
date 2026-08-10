/* =====================================================
   GRIDO - JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       VARIABLES
    ================================================= */

    const body = document.body;

    const themeToggle =
        document.getElementById("theme-toggle");

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const languageSelector =
        document.getElementById("language-selector");

    const topButton =
        document.getElementById("top-button");

    const yearElement =
        document.getElementById("year");

    const reviewForm =
        document.getElementById("review-form");

    const reviewsContainer =
        document.getElementById("reviews-container");


    /* =================================================
       AÑO AUTOMÁTICO
    ================================================= */

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =================================================
       MODO OSCURO
    ================================================= */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            body.classList.toggle("dark-mode");

            const darkMode =
                body.classList.contains("dark-mode");

            if (darkMode) {

                themeToggle.textContent = "☀️";

                themeToggle.setAttribute(
                    "aria-label",
                    "Activar modo claro"
                );

                localStorage.setItem(
                    "grido-theme",
                    "dark"
                );

            } else {

                themeToggle.textContent = "🌙";

                themeToggle.setAttribute(
                    "aria-label",
                    "Activar modo oscuro"
                );

                localStorage.setItem(
                    "grido-theme",
                    "light"
                );
            }

        });


        /* Recuperar tema guardado */

        const savedTheme =
            localStorage.getItem("grido-theme");

        if (savedTheme === "dark") {

            body.classList.add("dark-mode");

            themeToggle.textContent = "☀️";

            themeToggle.setAttribute(
                "aria-label",
                "Activar modo claro"
            );
        }
    }


    /* =================================================
       MENÚ HAMBURGUESA
    ================================================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            function () {

                navMenu.classList.toggle("active");

                const menuAbierto =
                    navMenu.classList.contains("active");

                if (menuAbierto) {

                    menuToggle.textContent = "✕";

                    menuToggle.setAttribute(
                        "aria-label",
                        "Cerrar menú"
                    );

                } else {

                    menuToggle.textContent = "☰";

                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menú"
                    );
                }
            }
        );


        /* Cerrar menú al tocar un enlace */

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove(
                        "active"
                    );

                    menuToggle.textContent = "☰";

                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menú"
                    );
                }
            );

        });
    }


    /* =================================================
       BOTÓN VOLVER ARRIBA
    ================================================= */

    if (topButton) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 500) {

                    topButton.classList.add("show");

                } else {

                    topButton.classList.remove("show");
                }
            }
        );


        topButton.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =================================================
       FAVORITOS
    ================================================= */

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite-button"
        );

    favoriteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    button.classList.toggle(
                        "active"
                    );

                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        button.textContent = "♥";

                    } else {

                        button.textContent = "♡";
                    }
                }
            );

        }
    );


    /* =================================================
       SISTEMA DE ESTRELLAS
    ================================================= */

    const stars =
        document.querySelectorAll(
            "#rating .star"
        );

    let selectedStars = 5;


    function updateStars(value) {

        selectedStars = value;

        stars.forEach(
            function (star) {

                const starValue =
                    Number(
                        star.getAttribute(
                            "data-value"
                        )
                    );

                if (starValue <= value) {

                    star.classList.add(
                        "selected"
                    );

                } else {

                    star.classList.remove(
                        "selected"
                    );
                }

            }
        );
    }


    stars.forEach(
        function (star) {

            star.addEventListener(
                "click",
                function () {

                    const value =
                        Number(
                            star.getAttribute(
                                "data-value"
                            )
                        );

                    updateStars(value);

                }
            );


            star.addEventListener(
                "mouseenter",
                function () {

                    const value =
                        Number(
                            star.getAttribute(
                                "data-value"
                            )
                        );

                    stars.forEach(
                        function (item) {

                            const itemValue =
                                Number(
                                    item.getAttribute(
                                        "data-value"
                                    )
                                );

                            if (
                                itemValue <= value
                            ) {

                                item.classList.add(
                                    "selected"
                                );

                            } else {

                                item.classList.remove(
                                    "selected"
                                );
                            }
                        }
                    );
                }
            );

        }
    );


    const ratingContainer =
        document.getElementById("rating");

    if (ratingContainer) {

        ratingContainer.addEventListener(
            "mouseleave",
            function () {

                updateStars(selectedStars);

            }
        );
    }


    /* =================================================
       AGREGAR OPINIONES
    ================================================= */

    if (reviewForm && reviewsContainer) {

        reviewForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "review-name"
                    );

                const textInput =
                    document.getElementById(
                        "review-text"
                    );


                const name =
                    nameInput.value.trim();

                const text =
                    textInput.value.trim();


                /* Validación */

                if (!name || !text) {

                    alert(
                        "Por favor completá tu nombre y tu opinión."
                    );

                    return;
                }


                /* Crear tarjeta */

                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "review-card animate show";


                /* Crear estrellas */

                let starsHTML = "";

                for (
                    let i = 1;
                    i <= 5;
                    i++
                ) {

                    if (i <= selectedStars) {

                        starsHTML += "★";

                    } else {

                        starsHTML += "☆";
                    }
                }


                /* Primera letra */

                const firstLetter =
                    name
                        .charAt(0)
                        .toUpperCase();


                /* Contenido */

                card.innerHTML = `

                    <div class="review-stars">
                        ${starsHTML}
                    </div>

                    <p>
                        "${escapeHTML(text)}"
                    </p>

                    <div class="review-author">

                        <div class="review-avatar">
                            ${escapeHTML(firstLetter)}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(name)}
                            </strong>

                            <span>
                                Cliente
                            </span>

                        </div>

                    </div>

                `;


                /* Agregar al principio */

                reviewsContainer.prepend(card);


                /* Limpiar formulario */

                reviewForm.reset();


                /* Volver a 5 estrellas */

                updateStars(5);


                /* Mensaje */

                alert(
                    "¡Gracias por dejar tu opinión! ⭐"
                );


                /* Scroll hacia la nueva opinión */

                setTimeout(
                    function () {

                        card.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    },
                    100
                );

            }
        );
    }


    /* =================================================
       SEGURIDAD PARA TEXTO DE OPINIONES
    ================================================= */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    /* =================================================
       ANIMACIONES AL HACER SCROLL
    ================================================= */

    const animatedElements =
        document.querySelectorAll(
            ".animate"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );

    } else {

        animatedElements.forEach(
            function (element) {

                element.classList.add(
                    "show"
                );

            }
        );
    }


    /* =================================================
       TRADUCTOR
    ================================================= */

    const translations = {

        es: {

            navInicio: "Inicio",
            navSabores: "Sabores",
            navPromociones: "Promociones",
            navExperiencia: "Experiencia",
            navOpiniones: "Opiniones",
            navContacto: "Contacto",

            heroBadge: "🍦 BIENVENIDO A GRIDO",
            heroTitle: "El sabor que alegra tu día",
            heroText:
                "Descubrí nuestros deliciosos helados, sabores, promociones y momentos para compartir.",

            saboresTitle: "Elegí tu favorito",

            promocionesTitle:
                "Ofertas especiales",

            opinionesTitle:
                "Lo que dicen nuestros clientes"

        },


        en: {

            navInicio: "Home",
            navSabores: "Flavors",
            navPromociones: "Promotions",
            navExperiencia: "Experience",
            navOpiniones: "Reviews",
            navContacto: "Contact",

            heroBadge: "🍦 WELCOME TO GRIDO",
            heroTitle: "The flavor that brightens your day",
            heroText:
                "Discover our delicious ice creams, flavors, promotions and moments to share.",

            saboresTitle:
                "Choose your favorite",

            promocionesTitle:
                "Special offers",

            opinionesTitle:
                "What our customers say"

        },


        fr: {

            navInicio: "Accueil",
            navSabores: "Parfums",
            navPromociones: "Promotions",
            navExperiencia: "Expérience",
            navOpiniones: "Avis",
            navContacto: "Contact",

            heroBadge: "🍦 BIENVENUE CHEZ GRIDO",
            heroTitle:
                "La saveur qui égaye votre journée",

            heroText:
                "Découvrez nos délicieuses glaces, saveurs, promotions et moments à partager.",

            saboresTitle:
                "Choisissez votre préféré",

            promocionesTitle:
                "Offres spéciales",

            opinionesTitle:
                "Ce que disent nos clients"

        },


        de: {

            navInicio: "Startseite",
            navSabores: "Sorten",
            navPromociones: "Angebote",
            navExperiencia: "Erlebnis",
            navOpiniones: "Bewertungen",
            navContacto: "Kontakt",

            heroBadge: "🍦 WILLKOMMEN BEI GRIDO",
            heroTitle:
                "Der Geschmack, der deinen Tag schöner macht",

            heroText:
                "Entdecke unsere leckeren Eissorten, Angebote und Momente zum Teilen.",

            saboresTitle:
                "Wähle deinen Favoriten",

            promocionesTitle:
                "Sonderangebote",

            opinionesTitle:
                "Was unsere Kunden sagen"

        },


        it: {

            navInicio: "Home",
            navSabores: "Gusti",
            navPromociones: "Promozioni",
            navExperiencia: "Esperienza",
            navOpiniones: "Recensioni",
            navContacto: "Contatti",

            heroBadge: "🍦 BENVENUTO DA GRIDO",
            heroTitle:
                "Il gusto che rende speciale la tua giornata",

            heroText:
                "Scopri i nostri deliziosi gelati, gusti, promozioni e momenti da condividere.",

            saboresTitle:
                "Scegli il tuo preferito",

            promocionesTitle:
                "Offerte speciali",

            opinionesTitle:
                "Cosa dicono i nostri clienti"

        },


        pt: {

            navInicio: "Início",
            navSabores: "Sabores",
            navPromociones: "Promoções",
            navExperiencia: "Experiência",
            navOpiniones: "Avaliações",
            navContacto: "Contato",

            heroBadge: "🍦 BEM-VINDO À GRIDO",
            heroTitle:
                "O sabor que alegra o seu dia",

            heroText:
                "Descubra nossos deliciosos sorvetes, sabores, promoções e momentos para compartilhar.",

            saboresTitle:
                "Escolha o seu favorito",

            promocionesTitle:
                "Ofertas especiais",

            opinionesTitle:
                "O que nossos clientes dizem"

        },


        ja: {

            navInicio: "ホーム",
            navSabores: "フレーバー",
            navPromociones: "キャンペーン",
            navExperiencia: "体験",
            navOpiniones: "口コミ",
            navContacto: "お問い合わせ",

            heroBadge:
                "🍦 グリドへようこそ",

            heroTitle:
                "一日を楽しくするおいしさ",

            heroText:
                "おいしいアイスクリーム、フレーバー、キャンペーンをお楽しみください。",

            saboresTitle:
                "お気に入りを選ぼう",

            promocionesTitle:
                "スペシャルオファー",

            opinionesTitle:
                "お客様の声"

        }

    };


    /* =================================================
       FUNCIÓN TRADUCCIÓN
    ================================================= */

    function translatePage(language) {

        const translation =
            translations[language];

        if (!translation) {
            return;
        }


        const navLinks =
            document.querySelectorAll(
                "#nav-menu a"
            );


        if (navLinks.length >= 6) {

            navLinks[0].textContent =
                translation.navInicio;

            navLinks[1].textContent =
                translation.navSabores;

            navLinks[2].textContent =
                translation.navPromociones;

            navLinks[3].textContent =
                translation.navExperiencia;

            navLinks[4].textContent =
                translation.navOpiniones;

            navLinks[5].textContent =
                translation.navContacto;
        }


        const heroBadge =
            document.querySelector(
                ".hero-badge"
            );

        if (heroBadge) {
            heroBadge.textContent =
                translation.heroBadge;
        }


        const heroTitle =
            document.querySelector(
                ".hero h1"
            );

        if (heroTitle) {
            heroTitle.textContent =
                translation.heroTitle;
        }


        const heroText =
            document.querySelector(
                ".hero p"
            );

        if (heroText) {
            heroText.textContent =
                translation.heroText;
        }


        const sectionHeadings =
            document.querySelectorAll(
                ".section-heading h2"
            );


        if (sectionHeadings.length >= 3) {

            sectionHeadings[0].textContent =
                translation.saboresTitle;

            sectionHeadings[1].textContent =
                translation.promocionesTitle;

            sectionHeadings[2].textContent =
                translation.opinionesTitle;
        }


        document.documentElement.lang =
            language;


        localStorage.setItem(
            "grido-language",
            language
        );
    }


    /* =================================================
       SELECTOR DE IDIOMA
    ================================================= */

    if (languageSelector) {

        languageSelector.addEventListener(
            "change",
            function () {

                translatePage(
                    languageSelector.value
                );

            }
        );


        const savedLanguage =
            localStorage.getItem(
                "grido-language"
            );


        if (
            savedLanguage &&
            translations[savedLanguage]
        ) {

            languageSelector.value =
                savedLanguage;

            translatePage(
                savedLanguage
            );
        }
    }


    /* =================================================
       CERRAR MENÚ AL CAMBIAR TAMAÑO
    ================================================= */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 800 &&
                navMenu
            ) {

                navMenu.classList.remove(
                    "active"
                );

                if (menuToggle) {

                    menuToggle.textContent =
                        "☰";
                }
            }

        }
    );


    /* =================================================
       EFECTO DE APARICIÓN DE TARJETAS
    ================================================= */

    const cards =
        document.querySelectorAll(
            ".flavor-card, .promotion-card, .experience-card, .review-card"
        );


    cards.forEach(
        function (card, index) {

            card.style.transitionDelay =
                `${index * 0.05}s`;

        }
    );


    /* =================================================
       FINAL
    ================================================= */

    console.log(
        "🍦 Grido - página cargada correctamente."
    );

});