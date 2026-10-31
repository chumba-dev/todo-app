const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Load tasks from file
function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
  } catch (err) {
    console.error('Error reading tasks file:', err.message);
    return [];
  }
}

// Save tasks to file
function saveTasks(tasks) {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving tasks file:', err.message);
    return false;
  }
}

// API Routes
app.get('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text.trim(),
    done: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.json(newTask);
});

app.put('/api/tasks/:id/done', (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    task.done = !task.done;
    saveTasks(tasks);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// CLI endpoint
// CLI Web Interface Endpoints
app.get('/cli/list', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

app.post('/cli/add', (req, res) => {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text.trim(),
    done: false,
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.json(`✓ Task added: "${newTask.text}"`);
});

app.post('/cli/toggle', (req, res) => {
  const tasks = loadTasks();
  const id = parseInt(req.query.id);
  const shouldDo = req.body.done !== false;
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = shouldDo;
    saveTasks(tasks);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.post('/cli/delete', (req, res) => {
  const tasks = loadTasks();
  const id = parseInt(req.body.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    const text = tasks[index].text;
    tasks.splice(index, 1);
    saveTasks(tasks);
    res.json({ text, success: true });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`To-Do App server running at http://localhost:${PORT}`);
  console.log(`Web interface: http://localhost:${PORT}`);
  console.log(`CLI: http://localhost:${PORT}/cli`);
});