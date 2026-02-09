const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.style.transform = mobileMenu.classList.contains('hidden') ? 'rotate(0)' : 'rotate(180deg)';
});
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.style.transform = 'rotate(0)';
    });
});

window.addEventListener('scroll', () => {
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuBtn.style.transform = 'rotate(0)';
    }
});


const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-400', 'border-b-2', 'border-blue-400');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-blue-400');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated-element');
            
            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});


const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const subject = document.querySelector('input[name="subject"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !subject || !message) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    showNotification(`Merci ${name} ! Votre message a été envoyé avec succès. Je vous répondrai rapidement à ${email}`, 'success');
    contactForm.reset();
});

function showNotification(message, type = 'success') {
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

    setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}


document.querySelectorAll('button, [class*="btn"]').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

document.querySelectorAll('button, a[class*="btn"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        
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


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.getElementById('home');
    
    // Effet parallaxe pour la section home
    if (homeSection) {
        homeSection.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
    
    document.querySelectorAll('section').forEach((section, index) => {
        if (index % 2 === 0 && section.id !== 'home') {
            section.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });
});


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


window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const hero = document.querySelector('section[id="home"]');
    if (hero) {
        hero.style.animation = 'fadeIn 0.8s ease';
    }
});


const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (isDarkMode) {
    document.body.style.colorScheme = 'dark';
}


function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

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

window.addEventListener('resize', debounce(() => {
    updateActiveLink();
}, 250));

window.addEventListener('scroll', throttle(() => {
    updateActiveLink();
}, 100));


document.querySelectorAll('button, a, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #3b82f6';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});


if ('serviceWorker' in navigator) {
    console.log('Service Worker supporté - PWA capable');
}


console.log(
    '%cBienvenue sur mon Portfolio ! 👋',
    'font-size: 20px; font-weight: bold; color: #3b82f6;'
);
console.log(
    '%cPortfolio créé avec HTML, Tailwind CSS et JavaScript vanilla 🚀',
    'font-size: 14px; color: #0ea5e9;'
);
