(function() {
  'use strict';

  // Typing animation with improved mobile handling
  const textElement = document.querySelector('.typing-container');
  if (textElement) {
    const phrases = [
      "Professional Roofing Experts",
      "Houston's Trusted Roofing Company",
      "Quality Roof Installation & Repair",
      "Built to Protect Your Home"
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // Sticky navigation with smooth transition
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const dropdownParents = document.querySelectorAll('.has-dropdown');
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav-link');

  const closeMenu = () => {
    navMenu.classList.remove('active');
    mobileToggle.querySelector('i').className = 'fas fa-bars';
    mobileToggle.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  const openMenu = () => {
    navMenu.classList.add('active');
    mobileToggle.querySelector('i').className = 'fas fa-times';
    mobileToggle.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.contains('active');
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
      mobileToggle.focus();
    }
  });

  // Mobile dropdown functionality
  function initMobileDropdowns() {
    const isMobile = window.innerWidth <= 992;
    
    dropdownParents.forEach(item => {
      const link = item.querySelector('.nav-link');
      if (!link) return;
      
      link.removeEventListener('click', mobileDropdownHandler);
      
      if (isMobile) {
        link.addEventListener('click', mobileDropdownHandler);
      }
    });
  }

  function mobileDropdownHandler(e) {
    const parent = this.closest('.has-dropdown');
    if (!parent) return;
    
    // Only prevent default on mobile
    if (window.innerWidth <= 992) {
      e.preventDefault();
      const isActive = parent.classList.toggle('active');
      this.setAttribute('aria-expanded', isActive);
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      dropdownParents.forEach(p => {
        p.classList.remove('active');
        const link = p.querySelector('.nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
      closeMenu();
    } else {
      initMobileDropdowns();
    }
  });

  initMobileDropdowns();

  // Close menu when clicking nav links (except dropdowns on mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const parent = link.closest('.has-dropdown');
      const isMobile = window.innerWidth <= 992;
      
      // Don't close on mobile dropdown toggle
      if (isMobile && parent) {
        return;
      }
      
      closeMenu();
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Form submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Simulate form submission (replace with actual API call)
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      alert('Thank you for your message! We will contact you within 24 hours.');
      form.reset();
      
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  const scrollThreshold = 500;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.classList.contains('scrolled') ? 65 : 125;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add loaded class to body after page load
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Performance: Lazy load images that aren't already lazy
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.src;
    });
  }

  // Prevent zoom on double tap for mobile
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

})();
