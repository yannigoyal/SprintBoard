# SprintBoard MVP

This document defines the project guidelines for AI coding agents working on SprintBoard.

---

# Project Overview

SprintBoard is a lightweight Kanban-style project management application designed for individuals and small teams.

The goal is to build a modern, responsive, and visually appealing task management experience while keeping the MVP intentionally simple.

---

# Functional Requirements

The application should include:

- A single Kanban board
- Exactly 5 default columns
- Editable column names
- Task cards with:
  - Title
  - Description
- Drag-and-drop support between columns
- Create new tasks
- Edit existing tasks
- Delete tasks
- Display sample data on first launch
- No authentication or multi-user support

Keep the experience fast, clean, and distraction-free.

---

# Technical Requirements

## Framework

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Project Structure

- Place the frontend inside `/frontend`
- Use component-based architecture
- Organize reusable UI components separately

## MVP Constraints

- Client-side rendering only
- No backend
- No database
- No authentication
- No persistence
- Use reliable open-source libraries where appropriate

---

# UI & Design Guidelines

The interface should resemble a modern SaaS application.

Focus on:

- Clean layouts
- Consistent spacing
- Rounded components
- Smooth transitions
- Responsive design
- Minimal visual clutter

### Color Palette

| Purpose | Color |
|----------|---------|
| Primary | #2563EB |
| Secondary | #7C3AED |
| Accent | #F59E0B |
| Background | #F8FAFC |
| Surface | #FFFFFF |
| Heading | #1F2937 |
| Secondary Text | #6B7280 |

---

# Development Workflow

Follow these steps sequentially.

## Phase 1 — Planning

Before writing code:

- Understand the feature request
- Break the task into smaller steps
- Explain the implementation approach briefly

---

## Phase 2 — Development

While implementing:

- Build one feature at a time
- Avoid editing unrelated files
- Reuse existing components whenever possible
- Keep the architecture consistent

---

## Phase 3 — Validation

After implementation:

- Verify functionality
- Check responsiveness
- Ensure drag-and-drop works correctly
- Remove obvious bugs before moving forward

---

## Phase 4 — Final Review

Before considering the task complete:

- Review code quality
- Check naming consistency
- Remove unused code
- Ensure UI consistency
- Confirm there are no major console errors

---

# Coding Standards

Follow these principles throughout development.

- Write readable and maintainable code
- Prefer reusable components
- Keep functions focused on a single responsibility
- Avoid unnecessary abstractions
- Use descriptive variable and function names
- Follow TypeScript best practices
- Keep comments minimal but meaningful
- Remove dead code immediately

---

# AI Agent Instructions

Before making changes:

- Read the existing codebase
- Understand the project structure
- Preserve the current architecture

During implementation:

- Make incremental changes
- Explain major decisions briefly
- Avoid unnecessary complexity
- Prioritize simplicity over cleverness

After implementation:

- Validate the completed feature
- Summarize what was changed
- Suggest reasonable next steps if applicable

---

# Success Criteria

SprintBoard MVP is considered complete when:

- All required features are functional
- Drag-and-drop works smoothly
- The UI is responsive across screen sizes
- The codebase remains clean and organized
- No major runtime or console errors exist
- The project is ready for future feature expansion