import { Column, Task } from "@/types";

export const INITIAL_COLUMNS: Column[] = [
  {
    id: "backlog",
    name: "Backlog",
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "todo",
    name: "To Do",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "in_progress",
    name: "In Progress",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "qa",
    name: "Review & QA",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "done",
    name: "Done",
    color: "from-emerald-500 to-teal-500",
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Research OAuth Providers",
    description: "Compare Auth0, Clerk, and custom NextAuth setups for security, pricing, and integration ease.",
    columnId: "backlog",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-2",
    title: "Design Onboarding Flow",
    description: "Create wireframes and interactive mockups for the 3-step user onboarding sequence.",
    columnId: "backlog",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-3",
    title: "Implement API Client Wrapper",
    description: "Write a type-safe Axios wrapper with interceptors for error handling and token refresh logic.",
    columnId: "todo",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-4",
    title: "Write End-to-End Tests",
    description: "Set up Playwright and write initial E2E tests for the authentication and board manipulation flows.",
    columnId: "todo",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-5",
    title: "Build Kanban Drag & Drop UI",
    description: "Create the core Kanban columns and implement smooth HTML5 drag and drop interaction styles.",
    columnId: "in_progress",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-6",
    title: "Style Landing Page Hero Section",
    description: "Add high-contrast typography, interactive gradient meshes, and subtle text float micro-animations.",
    columnId: "in_progress",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-7",
    title: "Database Indexing Optimization",
    description: "Add composite indexes on user workspace queries to reduce API latency to sub-100ms.",
    columnId: "qa",
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "task-8",
    title: "Setup Next.js Project Structure",
    description: "Bootstrap the repository using TypeScript, Tailwind CSS, ESLint, and absolute import aliases.",
    columnId: "done",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
