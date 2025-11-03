const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    const vendas = await prisma.venda.findMany();
    res.json(vendas);
}

const post = async (req, res) => {
    const { cliente, alocacao, data } = req.body;
    const novaVenda = await prisma.venda.create({
        data: {
            data,
            alocacao,
            cliente
        }
    });
    res.status(201).json(novaVenda);
}

module.exports = {
    read,
    post
};