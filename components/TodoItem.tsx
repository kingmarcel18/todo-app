'use client'

import { useState } from 'react'
import { toggleTodo, deleteTodo, editTodo } from '@/app/todos/actions'
import type { Todo } from '@/types/todo'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDueDate, setEditDueDate] = useState(todo.due_date ?? '')

  async function handleEdit() {
    if (!editTitle.trim()) return
    await editTodo(todo.id, editTitle, editDueDate || null)
    setIsEditing(false)
  }

  const isOverdue = todo.due_date && !todo.is_completed && new Date(todo.due_date) < new Date()

  return (
    <div className="group flex flex-col gap-2 px-4 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-all">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:outline-none focus:border-sky-500"
            autoFocus
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 text-sm focus:outline-none focus:border-sky-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-all"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setEditTitle(todo.title)
                setEditDueDate(todo.due_date ?? '')
              }}
              className="flex-1 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <button
            onClick={() => toggleTodo(todo.id, todo.is_completed)}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              todo.is_completed
                ? 'bg-sky-500 border-sky-500'
                : 'border-slate-600 hover:border-sky-400'
            }`}
          >
            {todo.is_completed && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </button>

          {/* Title + due date */}
          <div className="flex-1 min-w-0">
            <span className={`text-sm ${todo.is_completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
              {todo.title}
            </span>
            {todo.due_date && (
              <p className={`text-xs mt-0.5 ${isOverdue ? 'text-red-400' : 'text-slate-500'}`}>
                📅 {new Date(todo.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                {isOverdue && ' · Overdue!'}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-sky-400 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}