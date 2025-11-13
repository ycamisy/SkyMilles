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
        
        // Criar FormData para enviar os dados
        const formData = new FormData();
        formData.append('nomeCompleto', document.getElementById('nomeCompleto').value);
        formData.append('cpfRg', document.getElementById('cpfRg').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('cep', document.getElementById('cep').value);
        formData.append('nomeUsuario', document.getElementById('nomeUsuario').value);
        formData.append('endereco', document.getElementById('endereco').value);
        formData.append('senha', senha);
        formData.append('confirmaSenha', confirmaSenha);
        
        console.log('Enviando dados...');
        
        try {
            // Enviar para o servidor PHP usando FormData
            const response = await fetch('cadastro.php', {
                method: 'POST',
                body: formData
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

function goBack() {
    window.history.back();
}