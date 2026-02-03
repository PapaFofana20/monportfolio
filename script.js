/* ============ GESTION DU MENU MOBILE ============ */

// Récupérer les éléments du menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

// Ouvrir/fermer le menu au clic sur le bouton hamburger
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Animation de l'icône
    menuBtn.style.transform = mobileMenu.classList.contains('hidden') ? 'rotate(0)' : 'rotate(180deg)';
});

// Fermer le menu quand on clique sur un lien
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.style.transform = 'rotate(0)';
    });
});

// Fermer le menu au scroll
window.addEventListener('scroll', () => {
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuBtn.style.transform = 'rotate(0)';
    }
});


/* ============ NAVIGATION STICKY - ACTIVE LINK ============ */

// Mettre à jour le lien actif dans la navigation au scroll
const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    let current = '';
    
    // Trouver la section actuellement visible
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Mettre à jour les classes actives
    navLinks.forEach(link => {
        link.classList.remove('text-blue-400', 'border-b-2', 'border-blue-400');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-blue-400');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);


/* ============ ANIMATIONS AU SCROLL - INTERSECTION OBSERVER ============ */

// Options pour l'Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Créer l'observer pour les sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ajouter la classe d'animation
            entry.target.classList.add('animated-element');
            
            // Animer les barres de compétences si elles sont visibles
            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });

            // Arrêter l'observation après l'animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer toutes les sections
sections.forEach(section => {
    observer.observe(section);
});


/* ============ ANIMATION DES COMPTEURS DE STATISTIQUES ============ */

// Animation des compteurs désactivée - utilise maintenant du texte statique
// Les statistiques s'affichent de façon lisible sans animation NaN


/* ============ GESTION DU FORMULAIRE DE CONTACT ============ */

// Récupérer le formulaire
const contactForm = document.getElementById('contact-form');

// Valider et envoyer le formulaire
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les valeurs
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const subject = document.querySelector('input[name="subject"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    // Validation simple
    if (!name || !email || !subject || !message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    // Simuler l'envoi (en production, utiliser une vraie API)
    showNotification(`Merci ${name} ! Votre message a été envoyé avec succès. Je vous répondrai rapidement à ${email}`, 'success');
    contactForm.reset();
});

// Fonction pour afficher les notifications
function showNotification(message, type = 'success') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg text-white font-semibold z-50 transition-all duration-300 animate-pulse-slow`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500');
        notification.innerHTML = `<i class="fas fa-check mr-2"></i>${message}`;
    } else if (type === 'error') {
        notification.classList.add('bg-red-500');
        notification.innerHTML = `<i class="fas fa-exclamation mr-2"></i>${message}`;
    }

    document.body.appendChild(notification);

    // Retirer la notification après 4 secondes
    setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}


/* ============ INTERACTIONS ET MICROANIMATIONS ============ */

// Ajouter des effets au survol des boutons
document.querySelectorAll('button, [class*="btn"]').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Ajouter des effets ripple au clic des boutons
document.querySelectorAll('button, a[class*="btn"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Créer le ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        
        // Ajouter le style du ripple s'il n'existe pas
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', '');
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: rippleEffect 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes rippleEffect {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
    });
});


/* ============ PARALLAX EFFECT SIMPLE ============ */

// Effet parallax léger sur les éléments
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Appliquer l'effet à certains éléments
    document.querySelectorAll('section').forEach((section, index) => {
        if (index % 2 === 0) {
            section.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });
});


/* ============ SMOOTH SCROLL BEHAVIOR ============ */

// Ajouter une animation fluide au scroll programmé
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


/* ============ ANIMATIONS DE CHARGEMENT ============ */

// Animation au chargement de la page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animer les éléments principaux
    const hero = document.querySelector('section[id="home"]');
    if (hero) {
        hero.style.animation = 'fadeIn 0.8s ease';
    }
});


/* ============ DÉTECTION DU MODE SOMBRE/CLAIR ============ */

// Vérifier la préférence système
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Appliquer les styles en conséquence (déjà en dark mode par défaut)
if (isDarkMode) {
    document.body.style.colorScheme = 'dark';
}


/* ============ THROTTLE ET DEBOUNCE UTILITIES ============ */

// Fonction debounce pour optimiser les événements
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Fonction throttle pour les événements fréquents
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Appliquer debounce au resize
window.addEventListener('resize', debounce(() => {
    updateActiveLink();
}, 250));

// Appliquer throttle au scroll
window.addEventListener('scroll', throttle(() => {
    updateActiveLink();
}, 100));


/* ============ GESTION DU FOCUS KEYBOARD ============ */

// Améliorer la navigation au clavier
document.querySelectorAll('button, a, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #3b82f6';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});


/* ============ SERVICE WORKER ET PWA ============ */

// Enregistrer le service worker pour PWA (optionnel)
if ('serviceWorker' in navigator) {
    // Vous pouvez créer et enregistrer un service worker ici
    console.log('Service Worker supporté - PWA capable');
}


/* ============ CONSOLE MESSAGE ============ */

// Message de bienvenue dans la console
console.log(
    '%cBienvenue sur mon Portfolio ! 👋',
    'font-size: 20px; font-weight: bold; color: #3b82f6;'
);
console.log(
    '%cPortfolio créé avec HTML, Tailwind CSS et JavaScript vanilla 🚀',
    'font-size: 14px; color: #0ea5e9;'
);
