/* LogiFlow · main.js */
(function () {
    'use strict';

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    // Hero reveal on load
    window.addEventListener('load', () => {
        document.querySelector('.hero-body')?.classList.add('show');
    });

    // Scroll reveal for cards
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                e.target.style.transitionDelay = `${[...e.target.parentElement.children].indexOf(e.target) * 0.1}s`;
                e.target.classList.add('show');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.about-card').forEach(c => obs.observe(c));

    // Contact form
    const form = document.getElementById('contact-form');
    const ok = document.getElementById('form-ok');
    const btn = document.getElementById('form-btn');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        ['fn', 'fe', 'fm'].forEach(id => {
            const el = document.getElementById(id);
            if (!el.value.trim()) {
                el.classList.add('err');
                valid = false;
                el.addEventListener('input', () => el.classList.remove('err'), { once: true });
            }
        });
        if (!valid) return;

        btn.textContent = 'Wird gesendet…';
        btn.disabled = true;
        setTimeout(() => {
            form.style.opacity = '0.35';
            form.style.pointerEvents = 'none';
            ok.classList.add('show');
        }, 1000);
    });

    // Cursor glow
    const glow = Object.assign(document.createElement('div'), {
        style: `position:fixed;width:280px;height:280px;background:radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:left .1s,top .1s;`
    });
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }, { passive: true });

})();
