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

const InputProcura = document.getElementById("search");
const Paineis = document.querySelectorAll(".card");
const carousel = document.querySelector(".carousel");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const toggleBtn = document.getElementById("toggle-theme");

let index = 0;
const total = Paineis.length;

// Sistema de pesquisa
if (InputProcura) {
    InputProcura.addEventListener("input", () => {
        const valor = InputProcura.value.toLowerCase();

        Paineis.forEach(card => {
            const name = card.dataset.name;
            card.style.display = name.includes(valor) ? "block" : "none";
        });
    });
}

// Atualiza posição do carrossel
function updateCarousel() {
    const offset = -index * 200;
    carousel.style.transform = `translateX(${offset}px)`;
}

// Botões de navegação
if (next) {
    next.addEventListener("click", () => {
        index = (index + 1) % total;
        updateCarousel();
    });
}

if (prev) {
    prev.addEventListener("click", () => {
        index = (index - 1 + total) % total;
        updateCarousel();
    });
}

// Alternar tema claro/escuro
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const darkMode = document.body.classList.contains("dark");
        toggleBtn.textContent = darkMode ? "☀️ Tema" : "🌙 Tema";
    });
}

// Funcionalidade das companhias aéreas
const airlineCards = document.querySelectorAll('.airline-card');
const currentAirlineLogo = document.getElementById('current-airline-logo');
const currentAirlineName = document.querySelector('.current-airline-name');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const airlines = [
    { name: 'embraer', logo: 'https://i.postimg.cc/T39wB2pH/embraer-1.jpg', displayName: 'Embraer' },
    { name: 'azul', logo: 'https://i.postimg.cc/hGtjnFdr/azul.png', displayName: 'Azul' },
    { name: 'latam', logo: 'https://i.postimg.cc/TP3wx8D0/latam.png', displayName: 'LATAM' },
    { name: 'qatar', logo: 'https://i.postimg.cc/Bng6RZX7/qatar.jpg', displayName: 'Qatar Airways' },
    { name: 'eurowings', logo: 'https://i.postimg.cc/YC39T2hX/eurowings-1.jpg', displayName: 'Eurowings' },
    { name: 'airfrance', logo: 'https://i.postimg.cc/nLhzx8DK/france-Airlines.jpg', displayName: 'Air France' },
    { name: 'ethiopian', logo: 'https://i.postimg.cc/qvLRWBzL/ethiopian-1.jpg', displayName: 'Ethiopian Airways' },
    { name: 'jal', logo: 'https://i.postimg.cc/2Sw6gjVc/japan-1.jpg', displayName: 'Japan Airlines' },
    { name: 'easyjet', logo: 'https://i.postimg.cc/pdLTvNFJ/ease-Jet.png', displayName: 'EasyJet' }
];

let currentAirlineIndex = 0;

function updateAirlineDisplay(index) {
    // Fade out
    currentAirlineLogo.style.opacity = '0';
    if (currentAirlineName) {
        currentAirlineName.style.opacity = '0';
    }
    
    setTimeout(() => {
        // Atualizar logo
        currentAirlineLogo.src = airlines[index].logo;
        currentAirlineLogo.alt = airlines[index].name;
        
        // Atualizar nome
        if (currentAirlineName) {
            currentAirlineName.textContent = airlines[index].displayName;
        }
        
        // Fade in
        currentAirlineLogo.style.opacity = '1';
        if (currentAirlineName) {
            currentAirlineName.style.opacity = '1';
        }
    }, 300);
    
    // Ocultar o card selecionado e mostrar os outros
    airlineCards.forEach(card => {
        const airlineName = card.dataset.airline;
        if (airlineName === airlines[index].name) {
            card.style.display = 'none';
        } else {
            card.style.display = 'flex';
        }
    });
}

// Inicializar: ocultar a Embraer que está em destaque
updateAirlineDisplay(currentAirlineIndex);

// Navegação com setas
if (leftArrow) {
    leftArrow.addEventListener('click', () => {
        currentAirlineIndex = (currentAirlineIndex - 1 + airlines.length) % airlines.length;
        updateAirlineDisplay(currentAirlineIndex);
    });
}

if (rightArrow) {
    rightArrow.addEventListener('click', () => {
        currentAirlineIndex = (currentAirlineIndex + 1) % airlines.length;
        updateAirlineDisplay(currentAirlineIndex);
    });
}

// Clique nos cards
airlineCards.forEach((card) => {
    card.addEventListener('click', () => {
        const airlineName = card.dataset.airline;
        const airlineIndex = airlines.findIndex(a => a.name === airlineName);
        if (airlineIndex !== -1) {
            currentAirlineIndex = airlineIndex;
            updateAirlineDisplay(currentAirlineIndex);
        }
    });
});

// Funcionalidade dos planos - destaque ao clicar
const planoCards = document.querySelectorAll('.plano-card');
const planoWrappers = document.querySelectorAll('.plano-wrapper');

// Garantir que todos comecem no tamanho normal, exceto o que tem classe 'destaque'
planoCards.forEach((card) => {
    if (!card.classList.contains('destaque')) {
        card.style.transform = 'scale(1)';
    }
});

// Adicionar evento de clique nos cards
planoCards.forEach((card) => {
    card.addEventListener('click', (e) => {
        // Se clicou no botão assinar, não muda o destaque
        if (e.target.classList.contains('btn-assinar')) {
            return;
        }
        
        // Remove o destaque de todos os cards e volta ao tamanho normal
        planoCards.forEach(p => {
            p.classList.remove('destaque');
            p.style.transform = 'scale(1)';
        });
        
        // Adiciona o destaque ao card clicado
        card.classList.add('destaque');
        card.style.transform = 'scale(1.1)';
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

// ===== CÓDIGO NOVO: SUPORTE PARA TOUCH NOS CARDS EM MOBILE =====

// Suporte para touch nos cards em dispositivos móveis
const cardWrappers = document.querySelectorAll('.card-wrapper');
let activeCard = null;

// Função para verificar se é dispositivo móvel
function isMobile() {
    return window.innerWidth <= 767;
}

// Adicionar evento de clique/touch nos cards para mobile
cardWrappers.forEach(wrapper => {
    const card = wrapper.querySelector('.card');
    
    card.addEventListener('click', (e) => {
        if (isMobile()) {
            e.preventDefault();
            
            // Se já existe um card ativo e não é este
            if (activeCard && activeCard !== wrapper) {
                activeCard.classList.remove('active');
            }
            
            // Toggle do card atual
            if (wrapper.classList.contains('active')) {
                wrapper.classList.remove('active');
                activeCard = null;
            } else {
                wrapper.classList.add('active');
                activeCard = wrapper;
            }
        }
    });
});

// Fechar card ativo ao clicar fora em mobile
document.addEventListener('click', (e) => {
    if (isMobile() && activeCard) {
        const isClickInside = activeCard.contains(e.target);
        if (!isClickInside) {
            activeCard.classList.remove('active');
            activeCard = null;
        }
    }
});

// Remover classe active ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (!isMobile() && activeCard) {
        cardWrappers.forEach(wrapper => {
            wrapper.classList.remove('active');
        });
        activeCard = null;
    }
});