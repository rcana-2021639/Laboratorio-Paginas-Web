var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
var navItems = document.querySelectorAll('.nav-link');
for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function() {
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
    for (let i = 0; i < animatedElements.length; i++) {
        var element = animatedElements[i];
        var elementTop = element.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    }
}

window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// NAVEGACIÓN ACTIVA
var sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    var scrollPosition = window.scrollY + 100;
    
    for (let i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionTop = section.offsetTop;
        var sectionHeight = section.offsetHeight;
        var sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            for (let j = 0; j < navItems.length; j++) {
                navItems[j].classList.remove('active');
            }
            var activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
}

window.addEventListener('scroll', updateActiveNav);

// ANIMACIÓN DE BARRAS DE PROGRESO
var timeBars = document.querySelectorAll('.bar-fill');
var skillLevels = document.querySelectorAll('.level-fill');
var barsAnimated = false;

function animateBars() {
    if (barsAnimated) return;
    
    var expectationsSection = document.getElementById('expectativas');
    if (expectationsSection) {
        var sectionTop = expectationsSection.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            // Las barras se animan automáticamente con CSS
            barsAnimated = true;
        }
    }
}

window.addEventListener('scroll', animateBars);
window.addEventListener('load', animateBars);


// EFECTO PARALLAX EN BLOBS
var blobs = document.querySelectorAll('.gradient-blob');

window.addEventListener('mousemove', function(e) {
    var mouseX = e.clientX / window.innerWidth;
    var mouseY = e.clientY / window.innerHeight;
    
    for (let i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        var speed = (i + 1) * 20;
        var x = (mouseX - 0.5) * speed;
        var y = (mouseY - 0.5) * speed;
        
        blob.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }
});

// SMOOTH SCROLL
var internalLinks = document.querySelectorAll('a[href^="#"]');

for (let i = 0; i < internalLinks.length; i++) {
    internalLinks[i].addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            var offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}
