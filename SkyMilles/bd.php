<?php
header('Content-Type: application/json; charset=utf-8');

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'Skymilles';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $database = [];
    
    // Lista de todas as tabelas
    $tables = [
        'Cliente',
        'Usuario',
        'Pacote',
        'Compra',
        'Cidade',
        'Hotel',
        'Quarto',
        'Aeroporto',
        'Voo',
        'Assento',
        'Ponto_turistico',
        'pacoteQuarto',
        'pacoteAssento'
    ];
    
    // Exportar cada tabela
    foreach ($tables as $table) {
        $stmt = $pdo->query("SELECT * FROM $table");
        $database[$table] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    // Exportar view de origem e destino dos voos
    $stmt = $pdo->query("
        SELECT v.cod_voo, ao.nome_aeroporto as nome_origem, ad.nome_aeroporto as nome_destino
        FROM voo v
        INNER JOIN aeroporto ao ON v.cod_local_partida = ao.cod_aeroporto
        INNER JOIN aeroporto ad ON v.cod_destino = ad.cod_aeroporto
    ");
    $database['voos_origem_destino'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Salvar em arquivo JSON
    $json = json_encode($database, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents('skymilles_database.json', $json);
    
    // Retornar JSON
    echo $json;
    
} catch(PDOException $e) {
    echo json_encode([
        'error' => 'Erro ao exportar banco de dados: ' . $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
?>