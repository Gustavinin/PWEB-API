// routes/tasks.js
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Criar uma nova tarefa
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obter todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter uma tarefa específica
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma tarefa
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
