'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { clearCompleted } from '@/app/todos/actions'
import type { FilterType } from '@/types/todo'

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

export default function FilterBar({
  activeCount,
  completedCount,
}: {
  activeCount: number
  completedCount: number
}) {
  const searchParams = useSearchParams()
  const currentFilter = (searchParams.get('filter') ?? 'all') as FilterType

  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
      <span className="text-xs text-slate-500">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={f.value === 'all' ? '/todos' : `/todos?filter=${f.value}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentFilter === f.value
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={() => clearCompleted()}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
        >
          Clear completed
        </button>
      )}
    </div>
  )
}