/**
 * ==========================================================================
 * VERITAS & CROWN — CORPORATE GOVERNANCE & COMPLIANCE ADVISORY FIRM
 * Main Client Application Script (assets/js/main.js)
 * Fully guarded for multi-page execution with zero null-reference errors
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRtl();
  initHeaderScroll();
  initMobileDrawer();
  initTypewriter();
  initAccordions();
  initTabs();
  initDiagnosticEngine();
  initFormValidation();
  initCountdownTimer();
});

/* --------------------------------------------------------------------------
   1. THEME MANAGEMENT (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem('vc_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('vc_theme', newTheme);
    });
  });
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle-btn i');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'ph ph-sun';
    } else {
      icon.className = 'ph ph-moon';
    }
  });
}

/* --------------------------------------------------------------------------
   2. BI-DIRECTIONAL RTL SUPPORT
   -------------------------------------------------------------------------- */
function initRtl() {
  const savedRtl = localStorage.getItem('vc_rtl');
  if (savedRtl === 'true') {
    setRtl(true);
  }

  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      const newRtl = !isRtl;
      setRtl(newRtl);
      localStorage.setItem('vc_rtl', newRtl.toString());
    });
  });
}

function setRtl(isRtl) {
  if (isRtl) {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl');
  }
}

/* --------------------------------------------------------------------------
   3. STICKY HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. MOBILE DRAWER CONTROLLER (<= 1024px)
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  if (hamburgerBtn && mobileDrawer && drawerBackdrop) {
    const openDrawer = () => {
      mobileDrawer.classList.add('active');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('active');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', openDrawer);

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    drawerBackdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    const drawerLinks = mobileDrawer.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }
}

/* --------------------------------------------------------------------------
   5. TYPEWRITER HERO ANIMATION
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriterText');
  if (!typewriterEl) return;

  const phrases = [
    'Fortune 500 Boards',
    'Audit Committees',
    'Global Institutions',
    'Fiduciary Directors',
    'Enterprise Leaders'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeStep() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(typeStep, typingSpeed);
  }

  typeStep();
}

/* --------------------------------------------------------------------------
   6. FAQ ACCORDION HANDLER
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items in the same accordion group
      const parent = item.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('active');
            const siblingContent = sibling.querySelector('.accordion-content');
            if (siblingContent) siblingContent.style.maxHeight = null;
          }
        });
      }

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE TABS SYSTEM
   -------------------------------------------------------------------------- */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');
  if (!tabContainers.length) return;

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = container.querySelector(`#${targetId}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. DIAGNOSTIC MATRIX / ASSESSMENT ENGINE (HOME 2)
   -------------------------------------------------------------------------- */
function initDiagnosticEngine() {
  const independenceInput = document.getElementById('diagIndependence');
  const auditFreqInput = document.getElementById('diagAuditFreq');
  const esgInput = document.getElementById('diagEsg');
  const cyberInput = document.getElementById('diagCyber');

  if (!independenceInput || !auditFreqInput || !esgInput || !cyberInput) return;

  const scoreEl = document.getElementById('diagScore');
  const statusBadge = document.getElementById('diagStatusBadge');
  const summaryEl = document.getElementById('diagSummaryText');

  const independenceVal = document.getElementById('valIndependence');
  const auditFreqVal = document.getElementById('valAuditFreq');
  const esgVal = document.getElementById('valEsg');
  const cyberVal = document.getElementById('valCyber');

  function calculateScore() {
    const ind = parseInt(independenceInput.value, 10) || 50;
    const freq = parseInt(auditFreqInput.value, 10) || 2;
    const esg = parseInt(esgInput.value, 10) || 50;
    const cyber = parseInt(cyberInput.value, 10) || 50;

    if (independenceVal) independenceVal.textContent = `${ind}%`;
    if (auditFreqVal) auditFreqVal.textContent = `${freq}x / year`;
    if (esgVal) esgVal.textContent = `${esg}%`;
    if (cyberVal) cyberVal.textContent = `${cyber}%`;

    // Weighted Governance Score Algorithm (0 - 100)
    // Board Independence: 35%, Audit Frequency: 20%, ESG: 20%, Cyber/AI: 25%
    const score = Math.round(
      (ind * 0.35) + 
      ((freq / 4) * 100 * 0.20) + 
      (esg * 0.20) + 
      (cyber * 0.25)
    );

    if (scoreEl) scoreEl.textContent = score;

    if (statusBadge && summaryEl) {
      if (score >= 85) {
        statusBadge.textContent = 'Tier-1 Fiduciary Assurance';
        statusBadge.className = 'score-status-badge badge-low';
        summaryEl.textContent = 'Your enterprise demonstrates exemplary board independence, robust internal controls, and proactive cyber-AI oversight. Recommended for formal SEC defense validation and sovereign ESG benchmarking.';
      } else if (score >= 68) {
        statusBadge.textContent = 'Substantially Compliant';
        statusBadge.className = 'score-status-badge badge-medium';
        summaryEl.textContent = 'Solid baseline framework with minor compliance vulnerabilities in cross-border disclosure timing or audit committee rotation. Recommended for targeted Boardroom Effectiveness Audit.';
      } else if (score >= 50) {
        statusBadge.textContent = 'Elevated Governance Exposure';
        statusBadge.className = 'score-status-badge badge-high';
        summaryEl.textContent = 'Substantial regulatory risk detected under SEC 2026 Disclosure Rules and Delaware Court of Chancery fiduciary duty precedents. Immediate Board Committee Charter restructuring advised.';
      } else {
        statusBadge.textContent = 'Critical Regulatory Deficit';
        statusBadge.className = 'score-status-badge badge-critical';
        summaryEl.textContent = 'Urgent institutional intervention required. Severe liability exposure regarding independent director ratios and internal risk controls. Immediate emergency consultation recommended.';
      }
    }
  }

  [independenceInput, auditFreqInput, esgInput, cyberInput].forEach(slider => {
    slider.addEventListener('input', calculateScore);
  });

  calculateScore();
}

/* --------------------------------------------------------------------------
   9. CLIENT-SIDE FORM VALIDATION
   -------------------------------------------------------------------------- */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  if (!forms.length) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Inputs & Textareas with required
      const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      requiredInputs.forEach(input => {
        const errorEl = form.querySelector(`#${input.id}Error`) || input.nextElementSibling;
        
        if (input.type === 'checkbox') {
          if (!input.checked) {
            isValid = false;
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            if (errorEl && errorEl.classList.contains('field-error')) {
              errorEl.classList.add('active');
            }
          } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (errorEl && errorEl.classList.contains('field-error')) {
              errorEl.classList.remove('active');
            }
          }
          return;
        }

        const val = input.value.trim();

        if (!val) {
          isValid = false;
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          if (errorEl && errorEl.classList.contains('field-error')) {
            errorEl.classList.add('active');
          }
        } else if (input.type === 'email' && !emailRegex.test(val)) {
          isValid = false;
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          if (errorEl && errorEl.classList.contains('field-error')) {
            errorEl.textContent = 'Please enter a valid corporate email address.';
            errorEl.classList.add('active');
          }
        } else if (input.type === 'password' && val.length < 8) {
          isValid = false;
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          if (errorEl && errorEl.classList.contains('field-error')) {
            errorEl.textContent = 'Passphrase must be at least 8 characters.';
            errorEl.classList.add('active');
          }
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          if (errorEl && errorEl.classList.contains('field-error')) {
            errorEl.classList.remove('active');
          }
        }
      });

      // Confirm Password Match Check
      const passwordInput = form.querySelector('input[name="password"], #password');
      const confirmInput = form.querySelector('input[name="confirmPassword"], #confirmPassword');
      if (passwordInput && confirmInput) {
        const confirmError = form.querySelector('#confirmPasswordError');
        if (passwordInput.value !== confirmInput.value) {
          isValid = false;
          confirmInput.classList.add('is-invalid');
          confirmInput.classList.remove('is-valid');
          if (confirmError) {
            confirmError.textContent = 'Security passphrases do not match.';
            confirmError.classList.add('active');
          }
        }
      }

      const alertEl = form.querySelector('.form-alert');
      if (isValid) {
        if (alertEl) {
          alertEl.className = 'form-alert success';
          alertEl.innerHTML = '<i class="ph ph-check-circle" style="font-size: 1.4rem;"></i> Request successfully submitted. A Veritas & Crown Senior Partner will contact you within 2 business hours.';
          alertEl.style.display = 'flex';
        }
        form.reset();
        form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
      } else {
        if (alertEl) {
          alertEl.className = 'form-alert error';
          alertEl.innerHTML = '<i class="ph ph-warning-circle" style="font-size: 1.4rem;"></i> Please correct the highlighted fields above before submitting.';
          alertEl.style.display = 'flex';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. COUNTDOWN TIMER (COMING SOON PAGE)
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const daysEl = document.getElementById('cdDays');
  if (!daysEl) return;

  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');

  // Target date 45 days in future
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? `0${days}` : days;
    if (hoursEl) hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
    if (minutesEl) minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsEl) secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
