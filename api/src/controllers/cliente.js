const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    const alocacoes = await prisma.alocacao.findMany();
    res.json(alocacoes);
};

module.exports = {
    read
};