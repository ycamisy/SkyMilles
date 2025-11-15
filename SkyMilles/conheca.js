// Elementos do menu hambúrguer
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const backArrow = document.getElementById("back-arrow");
const perfilImg = document.getElementById("perfil-img");
const dropdownMenu = document.getElementById("dropdown-menu");
const mobilePerfilImg = document.getElementById("mobile-perfil-img");
const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");

// Toggle do menu mobile
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    
    // Fechar dropdown se estiver aberto
    if (dropdownMenu) dropdownMenu.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    
    // Prevenir scroll quando o menu estiver aberto
    if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
});

// Fechar menu ao clicar no overlay
overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    if (dropdownMenu) dropdownMenu.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    document.body.style.overflow = "auto";
});

// Fechar menu ao clicar na seta de voltar
backArrow.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    document.body.style.overflow = "auto";
});

// Fechar menu ao clicar em um item do menu mobile
const mobileMenuItems = document.querySelectorAll(".mobile-menu-item");
mobileMenuItems.forEach(item => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    });
});

// Toggle do dropdown do perfil (desktop)
if (perfilImg) {
    perfilImg.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("active");
    });
}

// Toggle do dropdown do perfil mobile
if (mobilePerfilImg) {
    mobilePerfilImg.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileDropdownMenu.classList.toggle("active");
    });
}

// Fechar dropdown ao clicar fora
document.addEventListener("click", (e) => {
    if (dropdownMenu && !dropdownMenu.contains(e.target) && e.target !== perfilImg) {
        dropdownMenu.classList.remove("active");
    }
    if (mobileDropdownMenu && !mobileDropdownMenu.contains(e.target) && e.target !== mobilePerfilImg) {
        mobileDropdownMenu.classList.remove("active");
    }
});

// Prevenir que cliques dentro dos dropdowns os fechem
if (dropdownMenu) {
    dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

if (mobileDropdownMenu) {
    mobileDropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

// Animação de scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de fade-in ao scroll (apenas para estatísticas e depoimentos)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação APENAS aos depoimentos e estatísticas
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.depoimento-card, .stat-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Fechar menu mobile ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num + (num === 98 ? '%' : '+');
}

// Iniciar contadores quando a seção de estatísticas ficar visível
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                const targets = [50000, 120, 15, 98];
                
                statNumbers.forEach((stat, index) => {
                    animateCounter(stat, targets[index]);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}