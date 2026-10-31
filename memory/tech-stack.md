---
name: tech-stack
description: Technologies, frameworks, and development tools used in this project
metadata:
  type: reference
---

## Runtime & Frameworks

- **Node.js** — Runtime environment for both CLI and server
- **Express.js (v4.18.2)** — Web server framework handling API routes and serving static files

## Data Storage

- **JSON file storage** — `tasks.json` at project root
- **File system operations** via `require('fs')` module
- **Path resolution** using `require('path')`

## Data Format

Tasks are stored in tasks.json as an array of objects:
```json
[
  {
    "id": 1698765432100,
    "text": "Example task",
    "done": false,
    "createdAt": "2024-10-31T10:30:00.000Z"
  }
]
```

**Fields:**
- `id` — Timestamp-based unique identifier (Date.now())
- `text` — Task description string
- `done` — Boolean status flag
- `createdAt` — ISO timestamp string

## Client-Side Technologies

- **HTML5** — Semantic markup for structure
- **CSS3** — Gradient backgrounds, responsive design, flexbox layout
- **Vanilla JavaScript** — No frameworks for client-side logic
- **Fetch API** — AJAX calls to backend endpoints

## Package Structure

- **Two entry points:**
  - Web server: `node server.js` (port 3000)
  - CLI tool: `node todo-cli.js`

**Scripts in package.json:**
- `npm start` — Runs `node server.js`
- `npm run dev` — Same as start

## Third-Party Dependencies

`express` (v4.18.2) — Web framework handling:
- JSON middleware for request body parsing
- Static file serving (`express.static`)
- RESTful API routes
- HTTP methods: GET, POST, PUT, DELETE