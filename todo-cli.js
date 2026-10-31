const fs = require('fs');
const path = require('path');

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

// Add a new task
function addTask(text) {
  const tasks = loadTasks();
  tasks.push({
    id: Date.now(),
    text: text.trim(),
    done: false,
    createdAt: new Date().toISOString()
  });
  saveTasks(tasks);
  console.log(`✓ Task added: "${text.trim()}"`);
}

// List all tasks
function listTasks() {
  const tasks = loadTasks();

  if (tasks.length === 0) {
    console.log('No tasks yet. Add one with "node todo-cli.js add <task>"');
    return;
  }

  console.log('\n--- TO-DO LIST (' + tasks.length + ' task' + (tasks.length !== 1 ? 's' : '') + ') ---');
  tasks.forEach((task, index) => {
    const status = task.done ? '✓' : '○';
    const text = task.done ? task.text + ' (done)' : task.text;
    console.log(`${index + 1}. [${status}] ${text}`);
  });
  console.log('');
}

// Mark a task as done or undone
function toggleTask(id) {
  const tasks = loadTasks();
  if (!id) {
    console.log('Usage: node todo-cli.js done <number> or node todo-cli.js undone <number>');
    return;
  }

  const index = parseInt(id) - 1;
  if (index < 0 || index >= tasks.length) {
    console.log('Invalid task number. Use "node todo-cli.js list" to see available tasks.');
    return;
  }

  tasks[index].done = !tasks[index].done;
  saveTasks(tasks);

  if (tasks[index].done) {
    console.log(`✓ Task marked as done: "${tasks[index].text}"`);
  } else {
    console.log(`○ Task marked as undone: "${tasks[index].text}"`);
  }
}

// Main CLI handler
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('To-Do CLI App');
    console.log('-------------');
    console.log('Usage:');
    console.log('  node todo-cli.js add <task description>');
    console.log('  node todo-cli.js list');
    console.log('  node todo-cli.js done <number>');
    console.log('  node todo-cli.js undone <number>');
    return;
  }

  const command = args[0];
  const taskArg = args.slice(1).join(' ');

  switch (command) {
    case 'add':
      if (taskArg) {
        addTask(taskArg);
      } else {
        console.log('Error: Please provide a task description.');
        console.log('Usage: node todo-cli.js add <task description>');
      }
      break;

    case 'list':
      listTasks();
      break;

    case 'done':
      toggleTask(args[1]);
      break;

    case 'undone':
      toggleTask(args[1]);
      break;

    default:
      console.log('Unknown command: ' + command);
      console.log('Use "node todo-cli.js" to see available commands.');
  }
}

main();