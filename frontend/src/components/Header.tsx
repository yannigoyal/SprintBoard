"use client";

import React from "react";
import { Task } from "@/types";
import { Kanban, Layers, CheckCircle2, Flame, RefreshCw } from "lucide-react";

interface HeaderProps {
  tasks: Record<string, Task[]>;
  onResetBoard: () => void;
}

export default function Header({ tasks, onResetBoard }: HeaderProps) {
  // Aggregate stats
  const allTasks = Object.values(tasks).flat();
  const totalCount = allTasks.length;
  const backlogCount = tasks["backlog"]?.length || 0;
  const todoCount = tasks["todo"]?.length || 0;
  const inProgressCount = tasks["in_progress"]?.length || 0;
  const qaCount = tasks["qa"]?.length || 0;
  const doneCount = tasks["done"]?.length || 0;

  // Calculate completion percentage
  const completionRate = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Branding Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
              <Kanban className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                SprintBoard
              </h1>
              <p className="text-xs text-slate-500 font-medium">Sprint Workspace MVP</p>
            </div>
          </div>
          
          {/* Quick actions for mobile */}
          <div className="md:hidden">
            <button
              onClick={onResetBoard}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
              title="Reset sample data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Statistics Dash */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Progress bar */}
          <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/80 px-4 py-2 rounded-xl">
            <div>
              <div className="flex justify-between items-center text-xs text-slate-400 font-medium mb-1.5 gap-6">
                <span>Sprint Progress</span>
                <span className="text-violet-400 font-bold">{completionRate}%</span>
              </div>
              <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Active Tasks */}
            <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/80 px-3.5 py-2 rounded-xl">
              <Flame className="w-4 h-4 text-amber-500" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 leading-none font-semibold uppercase tracking-wider">Active</div>
                <div className="text-sm font-bold text-slate-200 leading-tight mt-0.5">{inProgressCount}</div>
              </div>
            </div>

            {/* QA Tasks */}
            <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/80 px-3.5 py-2 rounded-xl">
              <Layers className="w-4 h-4 text-violet-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 leading-none font-semibold uppercase tracking-wider">In Review</div>
                <div className="text-sm font-bold text-slate-200 leading-tight mt-0.5">{qaCount}</div>
              </div>
            </div>

            {/* Completed */}
            <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/80 px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 leading-none font-semibold uppercase tracking-wider">Done</div>
                <div className="text-sm font-bold text-slate-200 leading-tight mt-0.5">{doneCount} / {totalCount}</div>
              </div>
            </div>
          </div>

          {/* Desktop Reset Button */}
          <button
            onClick={onResetBoard}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 bg-slate-900/20 hover:bg-slate-900/60 font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Reload initial mock tasks"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
}
