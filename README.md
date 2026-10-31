# To-Do CLI App

A simple command-line to-do list application built with Node.js. Tasks are saved to a `tasks.json` file.

## Features

- **Add tasks**: Create new to-do items
- **List tasks**: View all tasks with status indicators
- **Mark complete**: Toggle tasks as done or undone
- **Persistent storage**: Tasks are saved to `tasks.json`

## Requirements

- Node.js (version 12 or higher recommended)

## How to Run

### 1. Add a task
```bash
node todo-cli.js add "Buy groceries"
node todo-cli.js add "Finish project report"
```

### 2. List all tasks
```bash
node todo-cli.js list
```

Output will show:
```
--- TO-DO LIST (3 tasks) ---
1. [○] Buy groceries
2. [○] Finish project report
3. [✓] Call mom (done)
```

### 3. Mark a task as complete
```bash
node todo-cli.js done 1
```

### 4. Mark a task as incomplete
```bash
node todo-cli.js undone 2
```

## File

- `todo-cli.js` - The main CLI application
- `tasks.json` - Automatically created to store your tasks

## Example Session

```bash
$ node todo-cli.js add "Learn Node.js"
✓ Task added: "Learn Node.js"

$ node todo-cli.js add "Create a to-do app"
✓ Task added: "Create a to-do app"

$ node todo-cli.js list

--- TO-DO LIST (2 tasks) ---

$ node todo-cli.js list

--- TO-DO LIST (2 tasks) ---
1. [○] Learn Node.js
2. [○] Create a to-do app

$ node todo-cli.js done 1
✓ Task marked as done: "Learn Node.js"

$ node todo-cli.js list

--- TO-DO LIST (2 tasks) ---
1. [✓] Learn Node.js (done)
2. [○] Create a to-do app

$ node todo-cli.js add "Deploy to server"
✓ Task added: "Deploy to server"

$ node todo-cli.js list

--- TO-DO LIST (3 tasks) ---
1. [✓] Learn Node.js (done)
2. [○] Create a to-do app
3. [○] Deploy to server
```

## Notes

- Task numbers are used for marking tasks as complete/undone.
- Tasks persist between sessions; your data is saved in `tasks.json`.
- If you delete `tasks.json`, all tasks will be lost.