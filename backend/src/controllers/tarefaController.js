const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.listar = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    res.json(tarefas);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error.message || error);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
};

exports.buscar = async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id: Number(id)
      }
    });

    res.json(tarefa);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error.message || error);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
};

exports.criar = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao
      }
    });

    res.json(tarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error.message || error);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    const { titulo, descricao, concluida } = req.body;

    const tarefa = await prisma.tarefa.update({
      where: {
        id: Number(id)
      },
      data: {
        titulo,
        descricao,
        concluida
      }
    });

    res.json(tarefa);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error.message || error);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.tarefa.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({ mensagem: 'Tarefa deletada' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error.message || error);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
};