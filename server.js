const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let tasks = []; // Array de tarefas

// Rota para obter todas as tarefas separadas por status
app.get('/api/tasks', (req, res) => {
  const toDoTasks = tasks.filter(task => task.status === 'toDo');
  const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
  const doneTasks = tasks.filter(task => task.status === 'done');
  
  // Retorna as tarefas organizadas por status
  res.json({
    toDo: toDoTasks,
    inProgress: inProgressTasks,
    done: doneTasks,
  });
});

// Rota para obter uma tarefa específica por ID
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params; // Obtém o ID da URL
  const task = tasks.find(task => task.id === parseInt(id)); // Encontra a tarefa pelo ID
  
  if (!task) {
    return res.status(404).json({ message: 'Tarefa não encontrada' }); // Retorna erro 404 se não encontrar a tarefa
  }

  res.json(task); // Retorna a tarefa encontrada
});

// Rota para criar uma nova tarefa
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, dueDate, assignees, status } = req.body;
  const newTask = {
    id: tasks.length + 1, // ID único baseado no número de tarefas (para fins de exemplo)
    title,
    description,
    priority,
    dueDate,
    assignees,
    status: status || 'toDo', // Se não for fornecido, o status padrão será 'toDo'
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Rota para atualizar o status de uma tarefa
app.put('/api/tasks/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Valida se o status é válido
  if (!['toDo', 'inProgress', 'done'].includes(status)) {
    return res.status(400).json({ message: 'Status inválido' });
  }

  // Encontra a tarefa e atualiza
  const task = tasks.find(task => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }

  task.status = status;
  res.json(task);
});

// Rota para editar uma tarefa
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, assignees, status } = req.body;

  const task = tasks.find(task => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.priority = priority || task.priority;
  task.dueDate = dueDate || task.dueDate;
  task.assignees = assignees || task.assignees;
  task.status = status || task.status;

  res.json(task);
});

// Rota para excluir uma tarefa
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.status(204).send();
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
