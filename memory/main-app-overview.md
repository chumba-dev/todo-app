---
name: main-app-overview
description: Overview of the todo-app project structure, features, and main files
metadata:
  type: project
---

onmiroute-claude is a simple to-do application built to demonstrate multiple interfaces for task management. The repository contains both CLI and web interfaces that synchronize through a shared data file (**tasks.json**).

## Core Functionality

- **Task persistence** using a JSON file stored at project root
- **Add tasks** with text descriptions
- **List all tasks** with status indicators (done vs. not started)
- **Mark tasks complete/incomplete** with toggle functionality
- **Delete tasks** from the list
- **Automatic timestamping** on task creation

## Two Interfaces

### CLI Interface (todo-cli.js)
- Command-line interface for managing tasks locally
- Syntax: `node todo-cli.js add <task>`, `node todo-cli.js list`, `node todo-cli.js done <number>`
- All operations write directly to tasks.json

### Web Interface (public/index.html)
- Full-featured web UI with gradient styling
- Real-time task updates via API
- Add, toggle, delete tasks
- Shows completion statistics
- Uses Express.js server (server.js) under the hood

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v4.18.2)
- **Client-side**: Plain HTML/CSS/JavaScript
- **Data storage**: JSON file (tasks.json)

**Why:** Simple, three-file implementation demonstrates full-stack patterns (CLI + API + Web UI) without external dependencies.

## Related Files

- `server.js` — Express server, API routes, handles web requests
- `todo-cli.js` — Standalone CLI tool for local task management
- `public/index.html` — Web interface with full-featured UI
- `package.json` — Project metadata and dependencies