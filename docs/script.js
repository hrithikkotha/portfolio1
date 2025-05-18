document.querySelector('a[href="#about"]').addEventListener('click', () => {
    const aboutText = document.querySelector('.about-text');
    aboutText.classList.remove('animated');
    void aboutText.offsetWidth; // force reflow to restart animation
    aboutText.classList.add('animated');
});

function showFlashMessage(message, type = 'success') {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.className = `flash-message ${type}`;
    flashDiv.innerHTML = `
        <span>${message}</span>
        <button class="close-btn" onclick="hideFlashMessage()">&times;</button>
    `;
    flashDiv.style.display = 'flex';
    setTimeout(hideFlashMessage, 4000);
}
function hideFlashMessage() {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.style.display = 'none';
    flashDiv.innerHTML = '';
}

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };
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
        } else {
            showFlashMessage(result.message, 'error');
        }
    } catch (err) {
        showFlashMessage('Something went wrong. Please try again.', 'error');
    }
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
document.querySelectorAll('a.navbar-option, .sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only handle internal links
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
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
    btn.addEventListener('click', function() {
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