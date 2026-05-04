


function showAboutModal() {
    document.getElementById('about-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}
function hideAboutModal() {
    document.getElementById('about-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Optional: Close modal on outside click
document.addEventListener('click', function (e) {
    const modal = document.getElementById('about-modal');
    if (modal.classList.contains('active') && !modal.querySelector('.about-modal-content').contains(e.target) && !e.target.classList.contains('read-more-btn')) {
        hideAboutModal();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    if (track) {
        // Duplicate the cards for seamless looping
        track.innerHTML += track.innerHTML;
    }
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                smoothScrollTo(target, 1200); // 1200ms = 1.2s, adjust as desired
            }
        }
    });
});

function showFlashMessage(message, type = 'success') {
    const flashDiv = document.getElementById('flash-message');
    const icon = type === 'success' ? '✅' : '❌';
    flashDiv.className = `flash-message ${type}`;
    flashDiv.innerHTML = `
        <span class="flash-icon">${icon}</span>
        <span class="flash-text">${message}</span>
        <button class="close-btn" onclick="hideFlashMessage()">&times;</button>
    `;
    flashDiv.style.display = 'flex';
    // Errors stay longer (6s), success auto-hides in 4s
    const duration = type === 'error' ? 6000 : 4000;
    clearTimeout(window._flashTimeout);
    window._flashTimeout = setTimeout(hideFlashMessage, duration);
}
function hideFlashMessage() {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.style.display = 'none';
    flashDiv.innerHTML = '';
}

function setFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    field.classList.add('input-error');
    let errEl = field.parentElement.querySelector(`.field-error[data-field="${fieldName}"]`);
    if (!errEl) {
        errEl = document.createElement('span');
        errEl.className = 'field-error';
        errEl.setAttribute('data-field', fieldName);
        field.after(errEl);
    }
    errEl.textContent = message;
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    field.classList.remove('input-error');
    const errEl = field.parentElement.querySelector(`.field-error[data-field="${fieldName}"]`);
    if (errEl) errEl.remove();
}

function clearAllFieldErrors() {
    ['name', 'email', 'message'].forEach(clearFieldError);
}

function validateForm(data) {
    const errors = {};
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
        errors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }
    if (!data.message || data.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long.';
    }
    return errors;
}

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    // Prevent multiple submissions
    if (submitBtn.disabled) return;

    clearAllFieldErrors();

    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    // Client-side validation first (no server round-trip needed)
    const clientErrors = validateForm(data);
    if (Object.keys(clientErrors).length > 0) {
        Object.entries(clientErrors).forEach(([field, msg]) => setFieldError(field, msg));
        // Focus first invalid field
        const firstField = form.querySelector('.input-error');
        if (firstField) firstField.focus();
        return;
    }

    // Set loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
    submitBtn.style.opacity = '0.6';
    submitBtn.style.cursor = 'not-allowed';

    try {
        const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            showFlashMessage(result.message, 'success');
            form.reset();
            clearAllFieldErrors();
        } else {
            // Show server-side field errors inline if provided
            if (result.errors) {
                Object.entries(result.errors).forEach(([field, msg]) => setFieldError(field, msg));
            }
            showFlashMessage(result.message || 'Please check the form and try again.', 'error');
        }
    } catch (err) {
        showFlashMessage('Unable to send message. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
});

// Clear inline errors as user types/edits a field
['name', 'email', 'message'].forEach(fieldName => {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) field.addEventListener('input', () => clearFieldError(fieldName));
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.querySelector(".menu-toggle");
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnMenuToggle = menuToggle.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
    }
});

// Only apply smooth scroll to navbar/sidebar links, not all anchors
function smoothScrollTo(target, duration = 1200) {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const change = end - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease in-out cubic
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, start + change * ease);
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    requestAnimationFrame(animateScroll);
}

document.querySelectorAll('a.navbar-option, .sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                smoothScrollTo(target, 1200); // 1200ms = 1.2s, adjust as desired
            }
        }
    });
});

// Add a scroll event to change navbar style on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // const carousel = document.getElementById('cardsCarousel');
    // const leftBtn = document.getElementById('carouselLeft');
    // const rightBtn = document.getElementById('carouselRight');
    // const scrollAmount = 350; // px

    // leftBtn.addEventListener('click', () => {
    //     carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    // });

    // rightBtn.addEventListener('click', () => {
    //     carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    // });
});

// Technology filter logic
document.querySelectorAll('.tech-filter').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.tech-filter').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        document.querySelectorAll('.tech-hex').forEach(hex => {
            if (filter === 'all' || hex.classList.contains(filter)) {
                hex.style.display = 'flex';
            } else {
                hex.style.display = 'none';
            }
        });
    });
});

document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('open');
    });
});

// Add this to your script.js (at the end or after DOMContentLoaded)
document.addEventListener("DOMContentLoaded", function () {
    const greetings = ["HELLO!", "నమస్తే!"];
    let idx = 0;
    const greetingEl = document.getElementById("greeting-text");

    function typeGreeting(text, cb) {
        greetingEl.textContent = "";
        let i = 0;
        function type() {
            if (i <= text.length) {
                greetingEl.textContent = text.slice(0, i);
                i++;
                setTimeout(type, 350); // Adjust speed here (ms per letter)
            } else if (cb) {
                setTimeout(cb, 900); // Pause before next greeting
            }
        }
        type();
    }

    function loopGreetings() {
        typeGreeting(greetings[idx], () => {
            idx = (idx + 1) % greetings.length;
            loopGreetings();
        });
    }

    loopGreetings();
});