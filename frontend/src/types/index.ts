export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  createdAt: string;
}

export interface Column {
  id: string;
  name: string;
  color: string; // Tailwind class identifier for headers
}

export interface BoardState {
  columns: Column[];
  tasks: Record<string, Task[]>; // maps columnId -> Task[]
}
