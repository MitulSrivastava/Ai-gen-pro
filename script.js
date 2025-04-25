document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations when the page loads
  initAnimations();

  // Initialize the navbar scroll effect
  initNavbarScroll();

  // Add event listeners for interactive elements
  addEventListeners();

  // Add scroll reveal functionality
  addScrollReveal();
});

// Initialize animations with Framer Motion
function initAnimations() {
  // Hero section animations
  animateElement(
    ".hero-badge, .hero-title, .hero-buttons",
    { y: [30, 0], opacity: [0, 1] },
    { duration: 0.7, staggerChildren: 0.15 }
  );

  animateElement(
    ".dashboard-showcase",
    { y: [50, 0], opacity: [0, 1] },
    { duration: 1, delay: 0.3 }
  );

  // Features animations on scroll
  animateOnScroll(
    ".feature-card",
    { y: [50, 0], opacity: [0, 1] },
    { duration: 0.5, staggerChildren: 0.1 }
  );

  // Value cards animations on scroll
  animateOnScroll(
    ".value-card",
    { y: [50, 0], opacity: [0, 1] },
    { duration: 0.5, staggerChildren: 0.1 }
  );

  // Testimonial cards animations on scroll
  animateOnScroll(
    ".testimonial-card",
    { y: [50, 0], opacity: [0, 1] },
    { duration: 0.5, staggerChildren: 0.1 }
  );

  // CTA section animations on scroll
  animateOnScroll(
    ".cta-content",
    { y: [50, 0], opacity: [0, 1] },
    { duration: 0.7 }
  );

  // Logo animations
  animateOnScroll(
    ".logo-item",
    { opacity: [0, 0.6] },
    { duration: 0.3, staggerChildren: 0.1 }
  );
}

// Helper function to animate elements using Framer Motion
function animateElement(selector, animation, options) {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) return;

  elements.forEach((element, index) => {
    const delay = options.staggerChildren ? options.staggerChildren * index : 0;

    window.motion.animate(element, animation, {
      duration: options.duration || 0.5,
      delay: (options.delay || 0) + delay,
      easing: options.easing || "ease-out",
    });
  });
}

// Helper function to animate elements on scroll
function animateOnScroll(selector, animation, options) {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = options.staggerChildren
            ? options.staggerChildren * index
            : 0;

          window.motion.animate(entry.target, animation, {
            duration: options.duration || 0.5,
            delay: (options.delay || 0) + delay,
            easing: options.easing || "ease-out",
          });

          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    // Set initial state
    element.style.opacity = "0";
    observer.observe(element);
  });
}

// Initialize navbar scroll effect
function initNavbarScroll() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(13, 13, 22, 0.95)";
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
    } else {
      header.style.backgroundColor = "rgba(13, 13, 22, 0.8)";
      header.style.boxShadow = "none";
    }
  });
}

// Add event listeners for interactive elements
function addEventListeners() {
  // Play button hover effect
  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.addEventListener("mouseenter", () => {
      window.motion.animate(playButton, { scale: 1.1 }, { duration: 0.3 });
    });

    playButton.addEventListener("mouseleave", () => {
      window.motion.animate(playButton, { scale: 1 }, { duration: 0.3 });
    });

    // Play button click event - example video modal
    playButton.addEventListener("click", () => {
      showVideoModal();
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // Feature card hover animations
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".feature-icon");
      if (icon) {
        window.motion.animate(icon, { scale: 1.1, y: -5 }, { duration: 0.3 });
      }
    });

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".feature-icon");
      if (icon) {
        window.motion.animate(icon, { scale: 1, y: 0 }, { duration: 0.3 });
      }
    });
  });

  // Value card hover animations
  document.querySelectorAll(".value-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".value-icon");
      if (icon) {
        window.motion.animate(
          icon,
          { scale: 1.1, rotate: 5 },
          { duration: 0.3 }
        );
      }
    });

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".value-icon");
      if (icon) {
        window.motion.animate(icon, { scale: 1, rotate: 0 }, { duration: 0.3 });
      }
    });
  });

  // Initialize shape floating animations
  initShapeAnimations();
}

// Initialize floating shape animations
function initShapeAnimations() {
  // Hero shapes
  const heroShapes = document.querySelectorAll(".hero-shapes .shape");
  heroShapes.forEach((shape) => {
    animateShapeFloat(shape);
  });

  // CTA shapes
  const ctaShapes = document.querySelectorAll(".cta-shapes .cta-shape");
  ctaShapes.forEach((shape) => {
    animateShapeFloat(shape);
  });
}

// Animate shapes with a floating effect
function animateShapeFloat(element) {
  const randomDuration = 15 + Math.random() * 10;
  const randomDelay = Math.random() * 5;
  const randomAmount = 10 + Math.random() * 20;

  const animations = [
    { y: [-randomAmount / 2, randomAmount / 2, -randomAmount / 2] },
    { x: [-randomAmount / 2, randomAmount / 2, -randomAmount / 2] },
  ];

  const selectedAnimation =
    animations[Math.floor(Math.random() * animations.length)];

  window.motion.animate(element, selectedAnimation, {
    duration: randomDuration,
    delay: randomDelay,
    repeat: Infinity,
    easing: "ease-in-out",
  });
}

// Function to show video modal (example implementation)
function showVideoModal() {
  // Create modal elements
  const modal = document.createElement("div");
  modal.classList.add("video-modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";

  const videoFrame = document.createElement("div");
  videoFrame.classList.add("video-frame");

  // Example video embed (YouTube placeholder)
  videoFrame.innerHTML = `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
        title="AI Gen Pro Demo" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
    `;

  // Append elements
  modalContent.appendChild(closeButton);
  modalContent.appendChild(videoFrame);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Modal styles
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "9999";
  modal.style.opacity = "0";

  modalContent.style.position = "relative";
  modalContent.style.width = "80%";
  modalContent.style.maxWidth = "900px";
  modalContent.style.aspectRatio = "16/9";
  modalContent.style.backgroundColor = "#000";
  modalContent.style.borderRadius = "12px";
  modalContent.style.overflow = "hidden";
  modalContent.style.boxShadow = "0 5px 25px rgba(0, 0, 0, 0.5)";
  modalContent.style.transform = "scale(0.9)";

  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "15px";
  closeButton.style.background = "transparent";
  closeButton.style.border = "none";
  closeButton.style.color = "white";
  closeButton.style.fontSize = "28px";
  closeButton.style.cursor = "pointer";
  closeButton.style.zIndex = "1";

  videoFrame.style.width = "100%";
  videoFrame.style.height = "100%";

  // Animate modal opening
  window.motion.animate(modal, { opacity: [0, 1] }, { duration: 0.3 });
  window.motion.animate(modalContent, { scale: [0.9, 1] }, { duration: 0.5 });

  // Close button event
  closeButton.addEventListener("click", () => {
    window.motion.animate(
      modal,
      { opacity: [1, 0] },
      {
        duration: 0.3,
        onComplete: () => {
          document.body.removeChild(modal);
        },
      }
    );
  });

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      window.motion.animate(
        modal,
        { opacity: [1, 0] },
        {
          duration: 0.3,
          onComplete: () => {
            document.body.removeChild(modal);
          },
        }
      );
    }
  });
}

// Ensure Framer Motion is available
if (!window.motion) {
  window.motion = {
    animate: (element, keyframes, options) => {
      // Fallback animation for browsers without Framer Motion
      const duration = (options.duration || 0.5) + "s";
      const delay = (options.delay || 0) + "s";
      const easing = options.easing || "ease-out";

      element.style.transition = `all ${duration} ${easing} ${delay}`;

      // Apply final state of keyframes
      Object.entries(keyframes).forEach(([property, values]) => {
        if (Array.isArray(values)) {
          const finalValue = values[values.length - 1];

          switch (property) {
            case "opacity":
              element.style.opacity = finalValue;
              break;
            case "y":
              element.style.transform = `translateY(${finalValue}px)`;
              break;
            case "x":
              element.style.transform = `translateX(${finalValue}px)`;
              break;
            case "scale":
              element.style.transform = `scale(${finalValue})`;
              break;
            case "rotate":
              element.style.transform = `rotate(${finalValue}deg)`;
              break;
          }
        }
      });
    },
  };
}

// Add scroll reveal functionality
function addScrollReveal() {
  // Add the 'reveal' class to elements we want to animate on scroll
  const sectionsToReveal = [
    ".features .section-title",
    ".feature-card",
    ".value-section .section-title",
    ".value-card",
    ".testimonials .section-title",
    ".testimonial-card",
    ".advanced-features .section-title",
    ".advanced-feature-card",
    ".cta-title",
  ];

  sectionsToReveal.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.add("reveal");
    });
  });

  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll animation
  function checkScroll() {
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("active");
      }
    });
  }

  // Initial check and add scroll event listener
  checkScroll();
  window.addEventListener("scroll", checkScroll);

  // Add subtle parallax effect to shapes
  const shapes = document.querySelectorAll(
    ".hero-shapes .shape, .cta-shapes .cta-shape"
  );
  window.addEventListener("mousemove", function (e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    shapes.forEach((shape) => {
      shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // Add typing animation to hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.style.opacity = "1";
  }
}

// Add hover effect for feature cards
const featureCards = document.querySelectorAll(".feature-card, .value-card");
featureCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
    this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.3)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.2)";
  });
});
