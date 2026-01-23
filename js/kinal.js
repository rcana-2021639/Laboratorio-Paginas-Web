document.addEventListener("DOMContentLoaded", () => {
  // NAVBAR SCROLL EFFECT
  const navbar = document.getElementById("navbar")

  if (navbar && !navbar.classList.contains("scrolled")) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  }

  // MOBILE MENU TOGGLE
  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  const navbarMenu = document.querySelector(".navbar-menu")

  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener("click", () => {
      navbarMenu.classList.toggle("active")
      mobileToggle.classList.toggle("active")
    })
  }

  // SCROLL REVEAL ANIMATIONS
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        // Opcional: dejar de observar después de animar
        // observer.unobserve(entry.target);
      }
    })
  }, observerOptions)

  // Observar todos los elementos con clases de animación
  const animatedElements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right")
  animatedElements.forEach((el) => observer.observe(el))

  // SMOOTH SCROLL PARA LINKS INTERNOS
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#") {
        e.preventDefault()
        const target = document.querySelector(href)

        if (target) {
          const navbarHeight = navbar ? navbar.offsetHeight : 0
          const targetPosition = target.offsetTop - navbarHeight - 20

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // Cerrar menú móvil si está abierto
          if (navbarMenu && navbarMenu.classList.contains("active")) {
            navbarMenu.classList.remove("active")
            mobileToggle.classList.remove("active")
          }
        }
      }
    })
  })

  // COUNTER ANIMATION
  const counters = document.querySelectorAll("[data-count]")

  const animateCounter = (element) => {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += step
      if (current < target) {
        element.textContent = formatNumber(Math.floor(current))
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = formatNumber(target)
      }
    }

    updateCounter()
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K"
    }
    return num.toString()
  }

  // Observer para counters
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => counterObserver.observe(counter))

  // PARALLAX EFFECT EN HERO
  const heroShapes = document.querySelectorAll(".hero-shape")

  if (heroShapes.length > 0) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY

      heroShapes.forEach((shape, index) => {
        const speed = 0.1 + index * 0.05
        shape.style.transform = `translateY(${scrolled * speed}px)`
      })
    })
  }

  // HOVER EFFECT EN CARDS
  const cards = document.querySelectorAll(".program-card, .testimonial-card, .blog-card, .impact-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease"
    })
  })

  // ACTIVE LINK HIGHLIGHTING
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".navbar-menu a")

  window.addEventListener("scroll", () => {
    let current = ""
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // LAZY LOADING IMAGES
  const lazyImages = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.add("loaded")
          imageObserver.unobserve(img)
        }
      })
    },
    { rootMargin: "100px" },
  )

  lazyImages.forEach((img) => imageObserver.observe(img))

  // BOTÓN SCROLL TO TOP
  const scrollTopBtn = document.createElement("button")
  scrollTopBtn.innerHTML = "↑"
  scrollTopBtn.className = "scroll-to-top"
  scrollTopBtn.setAttribute("aria-label", "Volver arriba")
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ed8936 0%, #f6ad55 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(237, 137, 54, 0.4);
  `

  document.body.appendChild(scrollTopBtn)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.style.opacity = "1"
      scrollTopBtn.style.visibility = "visible"
    } else {
      scrollTopBtn.style.opacity = "0"
      scrollTopBtn.style.visibility = "hidden"
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  scrollTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)"
    this.style.boxShadow = "0 6px 20px rgba(237, 137, 54, 0.5)"
  })

  scrollTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
    this.style.boxShadow = "0 4px 15px rgba(237, 137, 54, 0.4)"
  })

  // PRELOADER (opcional)
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")
  })

  console.log(" Fundación Kinal - Website Initialized")
})
