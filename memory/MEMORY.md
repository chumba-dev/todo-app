# Project Memory

This is the index of all project-specific memories in this repository. Each memory is a brief fact that will be recalled when relevant during future sessions.

## Memories

- [main-app-overview](main-app-overview.md) — Overview of the todo-app project structure, features, and main files
- [tech-stack](tech-stack.md) — Technologies, frameworks, and development tools used in this project
- [code-patterns](code-patterns.md) — Common patterns and conventions in the todo-app codebase
- [developer-preferences](developer-preferences.md) — User's working style and preferences

## How to Add a Memory

When we discover something new about your project, I'll create a new memory file with:

```markdown
---
name: <short-kebab-case-slug>
description: <one-line summary, used to decide relevance during recall>
metadata:
  type: user | feedback | project | reference
---

<the fact; for feedback/project, follow with **Why:** and **How to apply:** lines. Link related memories with [[their-name]].
```

Add a one-line pointer to each memory here. No frontmatter or Markdown in this file.