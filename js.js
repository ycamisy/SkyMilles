const InputProcura = document.getElementById("search");
const Paineis = document.querySelectorAll(".card");
const carousel = document.querySelector(".carousel");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const toggleBtn = document.getElementById("toggle-theme");

// Menu dropdown do perfil
const perfilImg = document.getElementById("perfil-img");
const dropdownMenu = document.getElementById("dropdown-menu");

// Toggle do menu dropdown
perfilImg.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target) && e.target !== perfilImg) {
        dropdownMenu.classList.remove("active");
    }
});

// Prevenir que cliques dentro do menu o fechem
dropdownMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});

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

// Auto-play a cada 8 segundos
setInterval(() => {
    index = (index + 1) % total;
    updateCarousel();
}, 800000);

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