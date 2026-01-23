var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');

// Función para abrir/cerrar el menú
menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
var navItems = document.querySelectorAll('.nav-link');
for (var index = 0; index < navItems.length; index++) {
    navItems[index].addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ANIMACIONES AL HACER SCROLL
var animatedElements = document.querySelectorAll('.animate-on-scroll');

function checkScroll() {
    for (var index = 0; index < animatedElements.length; index++) {
        var element = animatedElements[index];
        var elementTop = element.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    }
}

// Verificar al cargar la página
window.addEventListener('load', checkScroll);
// Verificar al hacer scroll
window.addEventListener('scroll', checkScroll);

// CONTADOR ANIMADO
var counters = document.querySelectorAll('.stat-number');
var countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    
    for (var index = 0; index < counters.length; index++) {
        var counter = counters[index];
        var target = parseInt(counter.getAttribute('data-target'));
        var current = 0;
        var increment = target / 50;
        var duration = 2000;
        var stepTime = duration / 50;
        
        // Usar closure para mantener la referencia correcta
        (function(counter, target, increment, stepTime) {
            var current = 0;
            var timer = setInterval(function() {
                current = current + increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, stepTime);
        })(counter, target, increment, stepTime);
    }
    
    countersStarted = true;
}

// Iniciar contadores cuando la sección sea visible
function checkCounterSection() {
    var timeSection = document.getElementById('tiempo');
    if (timeSection) {
        var sectionTop = timeSection.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 200) {
            startCounters();
        }
    }
}

window.addEventListener('scroll', checkCounterSection);
window.addEventListener('load', checkCounterSection);

// NAVEGACIÓN ACTIVA
var sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    var scrollPosition = window.scrollY + 100;
    
    for (var index = 0; index < sections.length; index++) {
        var section = sections[index];
        var sectionTop = section.offsetTop;
        var sectionHeight = section.offsetHeight;
        var sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remover clase activa de todos los enlaces
            for (var j = 0; j < navItems.length; j++) {
                navItems[j].classList.remove('active');
            }
            // Agregar clase activa al enlace correspondiente
            var activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
}

window.addEventListener('scroll', updateActiveNav);

// FORMULARIO DE CONTACTO
var contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        var nombre = contactForm.querySelector('input[type="text"]').value;
        var email = contactForm.querySelector('input[type="email"]').value;
        var mensaje = contactForm.querySelector('textarea').value;
        
        // Mostrar mensaje de éxito (simulado)
        alert('¡Gracias por tu mensaje, ' + nombre + '! Te contactaremos pronto.');
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// EFECTO PARALLAX EN HERO
var hero = document.querySelector('.hero');
var heroBall = document.querySelector('.hero-ball');

window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
    
    if (heroBall && scrolled < window.innerHeight) {
        heroBall.style.transform = 'translateY(' + (scrolled * 0.3) + 'px) rotate(' + (scrolled * 0.5) + 'deg)';
    }
});

// SMOOTH SCROLL PARA ENLACES INTERNOS
var internalLinks = document.querySelectorAll('a[href^="#"]');

for (var index = 0; index < internalLinks.length; index++) {
    internalLinks[index].addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            var offsetTop = targetElement.offsetTop - 80; // Compensar navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}
