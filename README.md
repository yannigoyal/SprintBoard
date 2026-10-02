# SprintBoard

A sprint/kanban board app built with Next.js, React, and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## How to Run

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <repository-url>
   cd SprintBoard
   ```

2. **Go to the frontend directory**:

   ```bash
   cd frontend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open the app** in your browser at [http://localhost:3000](http://localhost:3000).

The dev server uses Turbopack and reloads automatically when you change source files.

## Other Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run dev`  | Start the development server         |
| `npm run build`| Build the app for production         |
| `npm run start`| Run the production build locally     |
| `npm run lint` | Run ESLint                           |

## Project Structure

```
SprintBoard/
└── frontend/          # Next.js app
    └── src/
        ├── app/       # Pages and layout
        ├── components/# Board, Column, TaskCard, etc.
        ├── types/     # TypeScript types
        └── utils/     # Sample data and helpers
```
