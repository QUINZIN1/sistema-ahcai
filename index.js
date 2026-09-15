const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

// Permite que o servidor entenda dados enviados em formato JSON
app.use(express.json());

// Página do cardápio (Monte seu Açaí)
app.use(express.static(path.join(__dirname, 'public')));

// Rota que vai receber o pedido do cliente e simular o envio para a cozinha
app.post('/api/pedido', (req, res) => {
    const dadosPedido = req.body;

    console.log('Novo pedido recebido na cozinha:', dadosPedido);

    // Aqui no futuro vamos colocar o código para mandar para a impressora térmica!

    res.status(200).json({
        sucesso: true,
        mensagem: 'Pedido recebido e enviado para a impressora com sucesso!'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});
