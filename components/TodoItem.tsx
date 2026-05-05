'use client'

import { toggleTodo, deleteTodo } from '@/app/todos/actions'
import type { Todo } from '@/types/todo'

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="group flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-all">
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

      <span className={`flex-1 text-sm ${
        todo.is_completed ? 'line-through text-slate-500' : 'text-slate-200'
      }`}>
        {todo.title}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  )
}