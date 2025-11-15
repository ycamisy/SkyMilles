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

// Fechar menu mobile ao redimensionar para desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// ==================== FUNCIONALIDADES DOS PACOTES ====================

// Dados dos pacotes (simulação)
const pacotesData = [
    {
        id: 1,
        nome: "Nova York, EUA",
        continente: "america",
        preco: 2800,
        duracao: 4,
        badge: "promocao",
        imagem: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500"
    },
    {
        id: 2,
        nome: "Sydney, Austrália",
        continente: "oceania",
        preco: 7800,
        duracao: 14,
        badge: "premium",
        imagem: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500"
    },
    {
        id: 3,
        nome: "Bangkok, Tailândia",
        continente: "asia",
        preco: 3500,
        duracao: 8,
        badge: "popular",
        imagem: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500"
    },
    {
        id: 4,
        nome: "Dubai, EAU",
        continente: "asia",
        preco: 5800,
        duracao: 6,
        badge: "premium",
        imagem: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500"
    }
];

// Função para aplicar filtros
function aplicarFiltros() {
    const destino = document.getElementById('filtro-destino').value;
    const duracao = document.getElementById('filtro-duracao').value;
    const precoMax = document.getElementById('filtro-preco').value;
    const ordem = document.getElementById('filtro-ordem').value;

    let pacotesFiltrados = [...pacotesData];

    // Filtrar por continente
    if (destino) {
        pacotesFiltrados = pacotesFiltrados.filter(p => p.continente === destino);
    }

    // Filtrar por duração
    if (duracao) {
        if (duracao === '15+') {
            pacotesFiltrados = pacotesFiltrados.filter(p => p.duracao > 15);
        } else {
            const duracaoNum = parseInt(duracao);
            pacotesFiltrados = pacotesFiltrados.filter(p => {
                if (duracaoNum === 3) return p.duracao >= 3 && p.duracao <= 5;
                if (duracaoNum === 7) return p.duracao >= 6 && p.duracao <= 10;
                if (duracaoNum === 14) return p.duracao >= 11 && p.duracao <= 15;
                return true;
            });
        }
    }

    // Filtrar por preço
    if (precoMax) {
        pacotesFiltrados = pacotesFiltrados.filter(p => p.preco <= parseFloat(precoMax));
    }

    // Ordenar
    switch(ordem) {
        case 'preco-menor':
            pacotesFiltrados.sort((a, b) => a.preco - b.preco);
            break;
        case 'preco-maior':
            pacotesFiltrados.sort((a, b) => b.preco - a.preco);
            break;
        case 'promocao':
            pacotesFiltrados.sort((a, b) => {
                if (a.badge === 'promocao' && b.badge !== 'promocao') return -1;
                if (a.badge !== 'promocao' && b.badge === 'promocao') return 1;
                return 0;
            });
            break;
        default: // popular
            pacotesFiltrados.sort((a, b) => {
                if (a.badge === 'popular' && b.badge !== 'popular') return -1;
                if (a.badge !== 'popular' && b.badge === 'popular') return 1;
                return 0;
            });
    }

    // Exibir/ocultar cards existentes baseado nos filtros
    const todosCards = document.querySelectorAll('.pacote-card');
    todosCards.forEach(card => {
        const cardContinente = card.dataset.continente;
        const cardPreco = parseFloat(card.dataset.preco);
        const cardDuracao = parseInt(card.dataset.duracao);

        let mostrar = true;

        // Verificar continente
        if (destino && cardContinente !== destino) {
            mostrar = false;
        }

        // Verificar preço
        if (precoMax && cardPreco > parseFloat(precoMax)) {
            mostrar = false;
        }

        // Verificar duração
        if (duracao) {
            if (duracao === '15+') {
                if (cardDuracao <= 15) mostrar = false;
            } else {
                const duracaoNum = parseInt(duracao);
                if (duracaoNum === 3 && (cardDuracao < 3 || cardDuracao > 5)) mostrar = false;
                if (duracaoNum === 7 && (cardDuracao < 6 || cardDuracao > 10)) mostrar = false;
                if (duracaoNum === 14 && (cardDuracao < 11 || cardDuracao > 15)) mostrar = false;
            }
        }

        card.style.display = mostrar ? 'flex' : 'none';
    });

    // Scroll suave até os resultados
    document.querySelector('.pacotes-grid').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Função para mudar página
function mudarPagina(direcao) {
    const botoesPagina = document.querySelectorAll('.paginacao button:not([onclick*="mudarPagina"])');
    let paginaAtual = 0;

    botoesPagina.forEach((botao, index) => {
        if (botao.classList.contains('active')) {
            paginaAtual = index;
        }
    });

    let novaPagina = paginaAtual + direcao;
    
    if (novaPagina >= 0 && novaPagina < botoesPagina.length) {
        botoesPagina[paginaAtual].classList.remove('active');
        botoesPagina[novaPagina].classList.add('active');
        
        // Scroll para o topo da seção
        document.querySelector('.pacotes-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event listeners para os botões de página
document.addEventListener('DOMContentLoaded', () => {
    const botoesPagina = document.querySelectorAll('.paginacao button:not([onclick*="mudarPagina"])');
    
    botoesPagina.forEach((botao, index) => {
        botao.addEventListener('click', () => {
            botoesPagina.forEach(b => b.classList.remove('active'));
            botao.classList.add('active');
            
            document.querySelector('.pacotes-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Event listener para os botões "Ver Pacote"
    const botoesVerPacote = document.querySelectorAll('.btn-ver-pacote');
    botoesVerPacote.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = e.target.closest('.pacote-card');
            const destino = card.querySelector('.pacote-destino h3').textContent;
            alert(`Você selecionou o pacote para ${destino}!\n\nEm breve você será redirecionado para a página de reserva.`);
        });
    });

    // Animação nos cards ao passar o mouse
    const pacoteCards = document.querySelectorAll('.pacote-card');
    pacoteCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Limpar filtros - função global
window.limparFiltros = function() {
    document.getElementById('filtro-destino').value = '';
    document.getElementById('filtro-duracao').value = '';
    document.getElementById('filtro-preco').value = '';
    document.getElementById('filtro-ordem').value = 'popular';
    
    // Mostrar todos os cards
    const todosCards = document.querySelectorAll('.pacote-card');
    todosCards.forEach(card => {
        card.style.display = 'flex';
    });
    
    // Feedback visual
    const btnLimpar = document.querySelector('.btn-limpar');
    if (btnLimpar) {
        btnLimpar.textContent = '✓ Filtros Limpos';
        setTimeout(() => {
            btnLimpar.textContent = 'Limpar Filtros';
        }, 1500);
    }
}

function aplicarFiltros() {
            const destino = document.getElementById('filtro-destino').value;
            const duracao = document.getElementById('filtro-duracao').value;
            const preco = document.getElementById('filtro-preco').value;
            const ordem = document.getElementById('filtro-ordem').value;
            
            const pacotes = document.querySelectorAll('.pacote-card');
            let pacotesFiltrados = Array.from(pacotes);
            
            if (destino) {
                pacotesFiltrados = pacotesFiltrados.filter(pacote => {
                    return pacote.dataset.continente === destino;
                });
            }
            
            if (duracao) {
                pacotesFiltrados = pacotesFiltrados.filter(pacote => {
                    const duracaoPacote = parseInt(pacote.dataset.duracao);
                    if (duracao === '3') return duracaoPacote >= 3 && duracaoPacote <= 5;
                    else if (duracao === '7') return duracaoPacote >= 6 && duracaoPacote <= 10;
                    else if (duracao === '14') return duracaoPacote >= 11 && duracaoPacote <= 15;
                    else if (duracao === '15+') return duracaoPacote > 15;
                    return true;
                });
            }
            
            if (preco && preco > 0) {
                pacotesFiltrados = pacotesFiltrados.filter(pacote => {
                    return parseInt(pacote.dataset.preco) <= parseInt(preco);
                });
            }
            
            if (ordem === 'preco-menor') {
                pacotesFiltrados.sort((a, b) => parseInt(a.dataset.preco) - parseInt(b.dataset.preco));
            } else if (ordem === 'preco-maior') {
                pacotesFiltrados.sort((a, b) => parseInt(b.dataset.preco) - parseInt(a.dataset.preco));
            } else if (ordem === 'promocao') {
                pacotesFiltrados.sort((a, b) => {
                    const aPromocao = a.querySelector('.pacote-badge.promocao') ? 1 : 0;
                    const bPromocao = b.querySelector('.pacote-badge.promocao') ? 1 : 0;
                    return bPromocao - aPromocao;
                });
            } else if (ordem === 'popular') {
                pacotesFiltrados.sort((a, b) => {
                    const aPopular = a.querySelector('.pacote-badge.popular') ? 1 : 0;
                    const bPopular = b.querySelector('.pacote-badge.popular') ? 1 : 0;
                    return bPopular - aPopular;
                });
            }
            
            pacotes.forEach(pacote => {
                pacote.style.display = 'none';
                pacote.style.order = '0';
            });
            
            if (pacotesFiltrados.length > 0) {
                pacotesFiltrados.forEach((pacote, index) => {
                    pacote.style.display = 'block';
                    pacote.style.order = index;
                    setTimeout(() => {
                        pacote.style.opacity = '0';
                        pacote.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            pacote.style.transition = 'all 0.3s ease';
                            pacote.style.opacity = '1';
                            pacote.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                });
            } else {
                mostrarMensagem('Nenhum pacote encontrado com os filtros selecionados.');
                setTimeout(() => {
                    pacotes.forEach(pacote => pacote.style.display = 'block');
                }, 2000);
            }
        }

        function mostrarMensagem(texto) {
            const mensagem = document.createElement('div');
            mensagem.style.cssText = `
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9); color: white; padding: 20px 40px;
                border-radius: 10px; font-size: 16px; z-index: 10000;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            `;
            mensagem.textContent = texto;
            document.body.appendChild(mensagem);
            setTimeout(() => {
                mensagem.style.opacity = '0';
                mensagem.style.transition = 'opacity 0.3s';
                setTimeout(() => document.body.removeChild(mensagem), 300);
            }, 2000);
        }

        let paginaAtual = 1;

        function mudarPagina(direcao) {
            const botoes = document.querySelectorAll('.paginacao button:not(:first-child):not(:last-child)');
            const totalPaginas = botoes.length;
            
            botoes.forEach((botao, index) => {
                if (botao.classList.contains('active')) paginaAtual = index + 1;
            });
            
            const novaPagina = paginaAtual + direcao;
            
            if (novaPagina >= 1 && novaPagina <= totalPaginas) {
                botoes[paginaAtual - 1].classList.remove('active');
                botoes[novaPagina - 1].classList.add('active');
                paginaAtual = novaPagina;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                const grid = document.getElementById('pacotes-grid');
                grid.style.opacity = '0.5';
                setTimeout(() => grid.style.opacity = '1', 300);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const botoesNumericos = document.querySelectorAll('.paginacao button:not(:first-child):not(:last-child)');
            
            botoesNumericos.forEach((btn, index) => {
                btn.addEventListener('click', function() {
                    botoesNumericos.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    paginaAtual = index + 1;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    const grid = document.getElementById('pacotes-grid');
                    grid.style.opacity = '0.5';
                    setTimeout(() => grid.style.opacity = '1', 300);
                });
            });
            
            const botoesVerPacote = document.querySelectorAll('.btn-ver-pacote');
            botoesVerPacote.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const pacote = this.closest('.pacote-card');
                    const destino = pacote.querySelector('.pacote-destino h3').textContent;
                    const preco = pacote.querySelector('.preco-valor').textContent;
                    alert(`Você selecionou o pacote:\n\n${destino}\nPreço: ${preco}\n\nVocê será redirecionado para os detalhes...`);
                });
            });
            
            const pacoteCards = document.querySelectorAll('.pacote-card');
            pacoteCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    if (!e.target.classList.contains('btn-ver-pacote')) {
                        const destino = this.querySelector('.pacote-destino h3').textContent;
                        console.log(`Card clicado: ${destino}`);
                        this.style.transform = 'scale(0.98)';
                        setTimeout(() => this.style.transform = '', 200);
                    }
                });
            });
            
            const inputs = document.querySelectorAll('.filtro-group input, .filtro-group select');
            inputs.forEach(input => {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') aplicarFiltros();
                });
            });
        });

        window.addEventListener('load', () => {
            const cards = document.querySelectorAll('.pacote-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });

        // Toggle da barra de pesquisa ao clicar na lupa
searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    searchActive = !searchActive;
    
    if (searchActive) {
        searchInputContainer.classList.add("active");
        searchIcon.classList.add("active");
        // Focar no input após a animação
        setTimeout(() => {
            searchInput.focus();
        }, 400);
    } else {
        searchInputContainer.classList.remove("active");
        searchIcon.classList.remove("active");
        searchInput.value = "";
        // Limpar pesquisa ao fechar
        filterDestinations("");
    }
});

// Função para filtrar destinos
function filterDestinations(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    let visibleCount = 0;
    
    cardWrappers.forEach(wrapper => {
        const destination = wrapper.getAttribute("data-destination").toLowerCase();
        
        if (term === "" || destination.includes(term)) {
            wrapper.classList.remove("hidden");
            visibleCount++;
        } else {
            wrapper.classList.add("hidden");
        }
    });
    
    // Mostrar/ocultar mensagem de sem resultados
    if (visibleCount === 0 && term !== "") {
        noResults.classList.add("active");
        carouselContainer.classList.add("searching");
    } else {
        noResults.classList.remove("active");
        carouselContainer.classList.remove("searching");
    }
}

// Pesquisar enquanto digita
searchInput.addEventListener("input", (e) => {
    filterDestinations(e.target.value);
});

// Fechar pesquisa ao pressionar ESC
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        searchActive = false;
        searchInputContainer.classList.remove("active");
        searchIcon.classList.remove("active");
        searchInput.value = "";
        filterDestinations("");
        searchInput.blur();
    }
});

// Fechar pesquisa ao clicar fora
document.addEventListener("click", (e) => {
    if (searchActive && 
        !searchInputContainer.contains(e.target) && 
        e.target !== searchIcon) {
        // Não fechar se ainda houver texto
        if (searchInput.value.trim() === "") {
            searchActive = false;
            searchInputContainer.classList.remove("active");
            searchIcon.classList.remove("active");
        }
    }
});

// Prevenir que cliques no input fechem a pesquisa
searchInput.addEventListener("click", (e) => {
    e.stopPropagation();
});