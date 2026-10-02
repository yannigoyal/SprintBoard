"use client";

import React, { useState, useEffect } from "react";
import { BoardState, Column as ColumnType, Task } from "@/types";
import { INITIAL_COLUMNS, INITIAL_TASKS } from "@/utils/sampleData";
import Column from "./Column";
import TaskModal from "./TaskModal";
import Header from "./Header";
import { Sparkles, Layers } from "lucide-react";

export default function Board() {
  // Initialize state with default columns and empty tasks to avoid SSR mismatches
  const [boardState, setBoardState] = useState<BoardState>({
    columns: INITIAL_COLUMNS,
    tasks: {},
  });

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [activeColumnId, setActiveColumnId] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Populate tasks on client mount (safe initialization)
  useEffect(() => {
    const tasksByColumn: Record<string, Task[]> = {};
    
    // Group tasks by their column ID
    INITIAL_COLUMNS.forEach(col => {
      tasksByColumn[col.id] = INITIAL_TASKS.filter(task => task.columnId === col.id);
    });

    setBoardState({
      columns: INITIAL_COLUMNS,
      tasks: tasksByColumn,
    });
  }, []);

  // Reset board back to initial state
  const handleResetBoard = () => {
    const tasksByColumn: Record<string, Task[]> = {};
    INITIAL_COLUMNS.forEach(col => {
      tasksByColumn[col.id] = INITIAL_TASKS.filter(task => task.columnId === col.id);
    });

    setBoardState({
      columns: INITIAL_COLUMNS,
      tasks: tasksByColumn,
    });
  };

  // Column renaming
  const handleRenameColumn = (columnId: string, newName: string) => {
    setBoardState((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId ? { ...col, name: newName } : col
      ),
    }));
  };

  // Open modal to add a new task
  const handleAddTaskClick = (columnId: string) => {
    setModalMode("create");
    setActiveColumnId(columnId);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Open modal to edit an existing task
  const handleEditTaskClick = (task: Task) => {
    setModalMode("edit");
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Remove a task
  const handleDeleteTask = (id: string) => {
    setBoardState((prev) => {
      const updatedTasks = { ...prev.tasks };
      
      // Look through all columns to find and delete the task
      Object.keys(updatedTasks).forEach((colId) => {
        updatedTasks[colId] = updatedTasks[colId].filter((t) => t.id !== id);
      });

      return {
        ...prev,
        tasks: updatedTasks,
      };
    });
  };

  // Submit handler (create or edit)
  const handleModalSubmit = (title: string, description: string) => {
    if (modalMode === "create") {
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        description,
        columnId: activeColumnId,
        createdAt: new Date().toISOString(),
      };

      setBoardState((prev) => {
        const colTasks = prev.tasks[activeColumnId] || [];
        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [activeColumnId]: [...colTasks, newTask],
          },
        };
      });
    } else if (modalMode === "edit" && editingTask) {
      setBoardState((prev) => {
        const colId = editingTask.columnId;
        const updatedTasks = (prev.tasks[colId] || []).map((t) =>
          t.id === editingTask.id ? { ...t, title, description } : t
        );

        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [colId]: updatedTasks,
          },
        };
      });
    }
  };

  // Native HTML5 Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Optional cleaning up states
  };

  const handleTaskDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (!taskId) return;

    setBoardState((prev) => {
      const updatedTasks = { ...prev.tasks };
      let foundTask: Task | null = null;
      let sourceColumnId = "";

      // Find the task and its source column
      for (const colId of Object.keys(updatedTasks)) {
        const taskIndex = updatedTasks[colId].findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          foundTask = updatedTasks[colId][taskIndex];
          sourceColumnId = colId;
          break;
        }
      }

      // If task wasn't found or dropped in the same column, do nothing
      if (!foundTask || sourceColumnId === targetColumnId) {
        return prev;
      }

      // Remove from source column
      updatedTasks[sourceColumnId] = updatedTasks[sourceColumnId].filter(
        (t) => t.id !== taskId
      );

      // Add to target column with updated columnId reference
      const updatedTask: Task = { ...foundTask, columnId: targetColumnId };
      const targetTasks = updatedTasks[targetColumnId] || [];
      updatedTasks[targetColumnId] = [...targetTasks, updatedTask];

      return {
        ...prev,
        tasks: updatedTasks,
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col grid-bg text-slate-100 bg-[#090d16]">
      {/* Dynamic Header */}
      <Header tasks={boardState.tasks} onResetBoard={handleResetBoard} />

      {/* Main Board Container */}
      <main className="flex-1 overflow-x-auto flex flex-col px-6 py-8">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          {/* Board Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-violet-500" />
                <span>Sprint Board</span>
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Drag cards to re-prioritize, double-click headers to rename.
              </p>
            </div>
          </div>

          {/* Columns Horizontal Scroll List */}
          <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar items-start select-none">
            {boardState.columns.map((col) => (
              <Column
                key={col.id}
                column={col}
                tasks={boardState.tasks[col.id] || []}
                onRenameColumn={handleRenameColumn}
                onAddTaskClick={handleAddTaskClick}
                onEditTaskClick={handleEditTaskClick}
                onDeleteTaskClick={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTaskDrop={handleTaskDrop}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Shared Task Form Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialTitle={editingTask?.title || ""}
        initialDescription={editingTask?.description || ""}
        mode={modalMode}
      />
    </div>
  );
}
