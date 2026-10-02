"use client";

import React, { useState } from "react";
import { Task } from "@/types";
import { Edit3, Trash2, Calendar, GripVertical } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Format creation date beautifully
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/75 hover:border-slate-700 hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing select-none"
    >
      {/* Glow highlight on hover */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Title & Grip Section */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-100 leading-snug group-hover:text-violet-300 transition-colors">
          {task.title}
        </h3>
        
        {/* Drag handle or drag indicator */}
        <div className="text-slate-600 group-hover:text-slate-400 p-0.5 rounded cursor-grab transition-colors">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>

      {/* Description Section */}
      {task.description && (
        <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer Details & Quick Action Panel */}
      <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-800/60">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(task.createdAt)}</span>
        </div>

        {/* Action Panel - visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors"
            title="Edit Task"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
