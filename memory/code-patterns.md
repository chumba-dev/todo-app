---
name: code-patterns
description: Common patterns and conventions in the todo-app codebase
metadata:
  type: reference
---

## File Organization Pattern

Each file handles a single responsibility:
- `server.js` — Server, API, and web serving
- `todo-cli.js` — CLI-only logic
- `public/index.html` — Frontend user interface
- `tasks.json` — Shared data store

**Why:** Keeps concerns separate, easier to test and maintain.

## Data Access Pattern

Both CLI and web share the same data layer functions:
```javascript
const TASKS_FILE = path.join(__dirname, 'tasks.json');

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) return [];
  return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
}

function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}
```

**Why:** Single source of truth avoids data inconsistency.

## Task Object Schema

All tasks follow this structure:
```javascript
{
  id: Date.now(),                    // Uniqueness via timestamp
  text: taskDescription,             // Required field
  done: false,                       // Boolean status
  createdAt: new Date().toISOString() // ISO timestamp
}
```

## API Endpoint Conventions

- **GET `/api/tasks`** — Retrieve all tasks
- **POST `/api/tasks`** — Create a new task (body: `{text}`)
- **PUT `/api/tasks/:id/done`** — Toggle done status
- **DELETE `/api/tasks/:id`** — Remove a task

**Why:** RESTful design, parallel with common frameworks.

## Error Handling Pattern

- **File not found** → Return empty array `[]`
- **JSON parse error** → Log error, return empty array
- **Task not found** → Return 404 status with error message

```javascript
try {
  return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
} catch (err) {
  console.error('Error reading tasks file:', err.message);
  return [];
}
```

## CLI Argument Pattern

CLI uses simple command structure:
```bash
node todo-cli.js add <task>
node todo-cli.js list
node todo-cli.js done <number>
```

Arguments parsed via `process.argv.slice(2)`.

## Date Use Pattern

- **IDs:** Unix timestamp (`Date.now()`) for unique identifiers
- **Creation timestamps:** ISO string for sorting (future: can parse)

```javascript
id: Date.now()
createdAt: new Date().toISOString()
```

## CSS Styling Pattern

- Uses CSS variables for theme colors
- Linear gradients for visual appeal
- Flexbox for responsive layouts
- Mobile-first media queries

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Security Considerations

- **Input stripping:** `req.body.text.trim()` removes whitespace
- **HTML escaping:** Client-side uses `escapeHtml()` to prevent XSS
- **Id parsing:** `parseInt()` for task IDs, checked for validity

**Why:** Shows awareness of basic security without adding validation libraries.