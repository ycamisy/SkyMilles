// Aguardar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const successMessage = document.getElementById('successMessage');

    // Event listener do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Pegar os valores dos campos
        const senha = document.getElementById('senha').value;
        const confirmaSenha = document.getElementById('confirmaSenha').value;
        
        // Verificar se as senhas coincidem
        if (senha !== confirmaSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        
        // Criar objeto com os dados do usuário
        const usuario = {
            nomeCompleto: document.getElementById('nomeCompleto').value,
            cpfRg: document.getElementById('cpfRg').value,
            email: document.getElementById('email').value,
            cep: document.getElementById('cep').value,
            nomeUsuario: document.getElementById('nomeUsuario').value,
            endereco: document.getElementById('endereco').value,
            senha: senha,
            confirmaSenha: confirmaSenha
        };
        
        console.log('Enviando dados:', usuario);
        
        try {
            // Enviar para o servidor PHP
            const response = await fetch('cadastro.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });
            
            const result = await response.json();
            console.log('Resposta do servidor:', result);
            
            if (result.success) {
                // Mostrar mensagem de sucesso
                successMessage.textContent = '✓ ' + result.message;
                successMessage.classList.add('show');
                
                // Limpar o formulário
                form.reset();
                
                // Esconder mensagem após 3 segundos
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 3000);
                
                console.log('Usuário cadastrado com sucesso!', result);
            } else {
                alert('Erro: ' + result.message);
            }
            
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao conectar com o servidor. Verifique:\n1. Se o XAMPP/WAMP está rodando\n2. Se o arquivo cadastro.php existe\n3. Se o MySQL está ativo');
        }
    });
});