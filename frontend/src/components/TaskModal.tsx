"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  mode: "create" | "edit";
}

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  mode,
}: TaskModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");

  // Sync state with props when modal opens or initial values change
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setDescription(initialDescription);
      setError("");
    }
  }, [isOpen, initialTitle, initialDescription]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }
    onSubmit(title.trim(), description.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300">
      {/* Modal Card */}
      <div 
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl transition-transform duration-300 scale-100 glow-progress"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Gradient Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h2 className="text-xl font-bold text-slate-100">
              {mode === "create" ? "Create New Task" : "Edit Task Details"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Field */}
          <div className="space-y-2">
            <label htmlFor="task-title" className="block text-sm font-medium text-slate-300">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g., Integrate Stripe webhook handler"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-950/40 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                error
                  ? "border-rose-500/50 focus:ring-rose-500/30"
                  : "border-slate-800 focus:border-violet-500/50 focus:ring-violet-500/20"
              }`}
              autoFocus
            />
            {error && <p className="text-xs font-medium text-rose-400">{error}</p>}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label htmlFor="task-desc" className="block text-sm font-medium text-slate-300">
              Description
            </label>
            <textarea
              id="task-desc"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context, acceptance criteria, or links to related PRs..."
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {mode === "create" ? "Add Task" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
