const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    const concessionarias = await prisma.concessionaria.findMany();
    res.json(concessionarias);
};

module.exports = {
    read
};