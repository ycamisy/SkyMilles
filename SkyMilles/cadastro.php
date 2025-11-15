<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'Skymilles';
$username = 'root';
$password = '';

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Receber dados do formulário
    $data = $_POST;
    
    // Validar se as senhas coincidem
    if ($data['senha'] !== $data['confirmaSenha']) {
        echo json_encode(['success' => false, 'message' => 'As senhas não coincidem!']);
        exit;
    }
    
    // Processar upload da foto
    $foto_nome = null;
    if (isset($_FILES['foto_perfil']) && $_FILES['foto_perfil']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = 'uploads/perfis/';
        
        // Criar diretório se não existir
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        
        // Validar tipo de arquivo
        $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $file_type = $_FILES['foto_perfil']['type'];
        
        if (!in_array($file_type, $allowed_types)) {
            echo json_encode(['success' => false, 'message' => 'Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WEBP.']);
            exit;
        }
        
        // Validar tamanho (máx 5MB)
        if ($_FILES['foto_perfil']['size'] > 5 * 1024 * 1024) {
            echo json_encode(['success' => false, 'message' => 'A imagem deve ter no máximo 5MB.']);
            exit;
        }
        
        // Gerar nome único para o arquivo
        $extensao = pathinfo($_FILES['foto_perfil']['name'], PATHINFO_EXTENSION);
        $foto_nome = uniqid('perfil_', true) . '.' . $extensao;
        $foto_path = $upload_dir . $foto_nome;
        
        // Mover arquivo para pasta de uploads
        if (!move_uploaded_file($_FILES['foto_perfil']['tmp_name'], $foto_path)) {
            echo json_encode(['success' => false, 'message' => 'Erro ao fazer upload da foto.']);
            exit;
        }
    }
    
    // Buscar o próximo cod_cliente
    $stmt = $pdo->query("SELECT IFNULL(MAX(cod_cliente), 0) + 1 as proximo_cod FROM Cliente");
    $cod_cliente = $stmt->fetch(PDO::FETCH_ASSOC)['proximo_cod'];
    
    // Buscar o próximo cod_usuario
    $stmt = $pdo->query("SELECT IFNULL(MAX(cod_usuario), 0) + 1 as proximo_cod FROM Usuario");
    $cod_usuario = $stmt->fetch(PDO::FETCH_ASSOC)['proximo_cod'];
    
    // Inserir na tabela Cliente
    $sql_cliente = "INSERT INTO Cliente (cod_cliente, endereco, sexo, nome_cliente, CPF, data_nasc) 
                    VALUES (:cod_cliente, :endereco, :sexo, :nome_cliente, :cpf, :data_nasc)";
    
    $stmt = $pdo->prepare($sql_cliente);
    $stmt->execute([
        ':cod_cliente' => $cod_cliente,
        ':endereco' => $data['endereco'],
        ':sexo' => 'N',
        ':nome_cliente' => $data['nomeCompleto'],
        ':cpf' => $data['cpfRg'],
        ':data_nasc' => null
    ]);
    
    // Inserir na tabela Usuario (com foto)
    $sql_usuario = "INSERT INTO Usuario (cod_usuario, login, senha, e_mail, cod_cliente, foto_perfil) 
                    VALUES (:cod_usuario, :login, :senha, :email, :cod_cliente, :foto_perfil)";
    
    $stmt = $pdo->prepare($sql_usuario);
    $stmt->execute([
        ':cod_usuario' => $cod_usuario,
        ':login' => $data['nomeUsuario'],
        ':senha' => $data['senha'], // IMPORTANTE: Em produção, use password_hash()
        ':email' => $data['email'],
        ':cod_cliente' => $cod_cliente,
        ':foto_perfil' => $foto_nome
    ]);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Usuário cadastrado com sucesso!',
        'cod_cliente' => $cod_cliente,
        'cod_usuario' => $cod_usuario,
        'foto_perfil' => $foto_nome
    ]);
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false, 
        'message' => 'Erro ao cadastrar: ' . $e->getMessage()
    ]);
}
?>