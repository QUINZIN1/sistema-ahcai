const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('public'));


let listaPedidos = [];

app.post('/api/pedido', (req, res) => {
    const novoPedido = {
        id: Date.now(),
        ...req.body,
        status: 'Pendente',
        horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    listaPedidos.unshift(novoPedido);
    console.log('Novo pedido recebido:', novoPedido);
    res.json({ sucesso: true, mensagem: 'Pedido recebido com sucesso!' });
});

app.get('/api/pedidos', (req, res) => {
    res.json(listaPedidos);
});

app.put('/api/pedido/:id/status', (req, res) => {
    const { id } = req.params;
    const pedido = listaPedidos.find(p => p.id == id);
    if (pedido) {
        pedido.status = 'Pronto';
        res.json({ sucesso: true });
    } else {
        res.status(404).json({ erro: 'Pedido não encontrado' });
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor da Ahçaí rodando na porta ${PORT}`);
});