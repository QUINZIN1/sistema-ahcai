const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Lista onde guardamos os pedidos temporariamente na memória
let listaPedidos = [];

// 1. Rota que recebe o pedido do cliente
app.post('/api/pedido', (req, res) => {
    const dadosPedido = req.body;
    
    // Atribui um ID único e o status inicial
    dadosPedido.id = Date.now();
    dadosPedido.status = 'Pendente';

    listaPedidos.push(dadosPedido);
    console.log('Novo pedido recebido na cozinha:', dadosPedido);

    res.status(200).json({
        sucesso: true,
        mensagem: 'Pedido recebido com sucesso!'
    });
});

// 2. Rota que entrega a lista para o painel (FALTAVA ESSA!)
app.get('/api/pedidos', (req, res) => {
    res.status(200).json(listaPedidos);
});

// 3. Rota para mudar o status do pedido para "Pronto"
app.put('/api/pedido/:id/status', (req, res) => {
    const id = Number(req.params.id);
    const pedido = listaPedidos.find(p => p.id === id);

    if (pedido) {
        pedido.status = 'Pronto';
        res.status(200).json({ sucesso: true });
    } else {
        res.status(404).json({ sucesso: false, mensagem: 'Pedido não encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});
