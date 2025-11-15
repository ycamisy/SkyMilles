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