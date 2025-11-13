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
    
    // Receber dados do formulário (JSON ou POST)
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Se não vier JSON, tenta pegar do POST tradicional
    if (!$data) {
        $data = $_POST;
    }
    
    // Validar se as senhas coincidem
    if ($data['senha'] !== $data['confirmaSenha']) {
        echo json_encode(['success' => false, 'message' => 'As senhas não coincidem!']);
        exit;
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
    
    // Inserir na tabela Usuario (sem foto)
    $sql_usuario = "INSERT INTO Usuario (cod_usuario, login, senha, e_mail, cod_cliente) 
                    VALUES (:cod_usuario, :login, :senha, :email, :cod_cliente)";
    
    $stmt = $pdo->prepare($sql_usuario);
    $stmt->execute([
        ':cod_usuario' => $cod_usuario,
        ':login' => $data['nomeUsuario'],
        ':senha' => $data['senha'], // IMPORTANTE: Em produção, use password_hash()
        ':email' => $data['email'],
        ':cod_cliente' => $cod_cliente
    ]);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Usuário cadastrado com sucesso!',
        'cod_cliente' => $cod_cliente,
        'cod_usuario' => $cod_usuario
    ]);
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false, 
        'message' => 'Erro ao cadastrar: ' . $e->getMessage()
    ]);
}
?>