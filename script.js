const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

const navbar = document.querySelector('.navbar');
const updateNavbar = () => {
    if (!navbar) {
        return;
    }

    if (window.scrollY > 10) {
        navbar.classList.add('is-scrolled');
    } else {
        navbar.classList.remove('is-scrolled');
    }
};

updateNavbar();
window.addEventListener('scroll', updateNavbar);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) {
            return;
        }

        event.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 10 : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('is-visible'));
}

const challengeGroups = document.querySelectorAll('.challenge-options');
challengeGroups.forEach(group => {
    const answer = group.dataset.answer;
    const feedback = group.closest('.challenge-card')?.querySelector('.challenge-feedback');
    const buttons = group.querySelectorAll('.option');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('is-correct', 'is-wrong'));
            if (feedback) {
                feedback.classList.remove('is-correct', 'is-wrong');
            }

            const isCorrect = button.dataset.option === answer;
            button.classList.add(isCorrect ? 'is-correct' : 'is-wrong');

            if (feedback) {
                feedback.textContent = isCorrect
                    ? 'Correcto. Sumas 10 puntos.'
                    : 'Incorrecto. Intenta de nuevo.';
                feedback.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
            }
        });
    });
});
