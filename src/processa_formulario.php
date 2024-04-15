<?php
session_start();

// Verifica se os dados do formulário foram recebidos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Processa os dados recebidos do formulário
    $nomeEvento = $_POST['inputNomeEvento'];
    $descricaoEvento = $_POST['inputDescricaoEvento'];
    $cidadeEvento = $_POST['inputCidade'];
    $estadoEvento = $_POST['inputEstado'];

    // Armazena os dados do evento na variável de sessão
    $_SESSION['eventData'] = array(
        'nomeEvento' => $nomeEvento,
        'descricaoEvento' => $descricaoEvento,
        'cidadeEvento' => $cidadeEvento,
        'estadoEvento' => $estadoEvento
    );

    // Retorna uma resposta JSON para o JavaScript
    $response = array(
        'success' => true,
        'message' => 'Informações adicionadas com sucesso! Indo para o seu evento...'
    );
    echo json_encode($response);
} else {
    // Retorna uma resposta JSON em caso de falha
    $response = array(
        'success' => false,
        'message' => 'Ocorreu um erro ao processar o formulário.'
    );
    echo json_encode($response);
}
?>
