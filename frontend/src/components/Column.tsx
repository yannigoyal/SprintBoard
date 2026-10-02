"use client";

import React, { useState, useRef, useEffect } from "react";
import { Column as ColumnType, Task } from "@/types";
import TaskCard from "./TaskCard";
import { Plus, Edit2, Check } from "lucide-react";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onRenameColumn: (columnId: string, newName: string) => void;
  onAddTaskClick: (columnId: string) => void;
  onEditTaskClick: (task: Task) => void;
  onDeleteTaskClick: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onTaskDrop: (e: React.DragEvent, targetColumnId: string) => void;
}

export default function Column({
  column,
  tasks = [],
  onRenameColumn,
  onAddTaskClick,
  onEditTaskClick,
  onDeleteTaskClick,
  onDragStart,
  onDragEnd,
  onTaskDrop,
}: ColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(column.name);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleRenameSubmit = () => {
    if (newName.trim() && newName.trim() !== column.name) {
      onRenameColumn(column.id, newName.trim());
    } else {
      setNewName(column.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRenameSubmit();
    } else if (e.key === "Escape") {
      setNewName(column.name);
      setIsEditing(false);
    }
  };

  // Drag over handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    onTaskDrop(e, column.id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col w-[320px] shrink-0 rounded-2xl border p-4 transition-all duration-200 ${
        isDragOver
          ? "bg-slate-900/60 border-violet-500/50 scale-[1.01]"
          : "bg-slate-900/20 border-slate-800/80"
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/40">
        <div className="flex items-center gap-2 max-w-[80%]">
          {/* Accent indicator dot */}
          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${column.color}`} />
          
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={handleKeyDown}
              className="bg-slate-950/60 text-slate-100 border border-slate-700 rounded px-2 py-0.5 text-sm font-semibold focus:outline-none focus:border-violet-500 max-w-[150px]"
            />
          ) : (
            <h2
              onDoubleClick={() => setIsEditing(true)}
              className="text-sm font-bold text-slate-200 cursor-pointer hover:text-slate-100 transition-colors truncate"
              title="Double click to rename"
            >
              {column.name}
            </h2>
          )}

          {/* Quick rename edit button */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 opacity-0 group-hover:opacity-100 md:opacity-100 transition-all"
              aria-label="Rename column"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Count bubble */}
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60`}>
          {tasks.length}
        </span>
      </div>

      {/* Task Cards container */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-270px)] custom-scrollbar pr-1 py-1">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTaskClick}
            onDelete={onDeleteTaskClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}

        {/* Empty State placeholder inside column (only when empty) */}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/10 text-center">
            <span className="text-xs text-slate-600 font-medium">Empty column</span>
          </div>
        )}

        {/* Add Task dashed card button */}
        <button
          onClick={() => onAddTaskClick(column.id)}
          className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-dashed border-slate-800/80 hover:border-slate-700 bg-slate-900/10 hover:bg-slate-900/30 text-slate-500 hover:text-slate-300 transition-all duration-200 text-sm font-medium mt-1 hover:shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}
