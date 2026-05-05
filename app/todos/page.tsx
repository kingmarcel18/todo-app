import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import AddTodoForm from '@/components/AddTodoForm'
import TodoItem from '@/components/TodoItem'
import FilterBar from '@/components/FilterBar'
import LogoutButton from '@/components/LogoutButton'
import ThemeToggle from '@/components/ThemeToggle'
import type { FilterType } from '@/types/todo'

export default async function TodosPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { filter: filterParam } = await searchParams

  const { data: todos = [] } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const filter = (filterParam ?? 'all') as FilterType

  const filteredTodos = (todos ?? []).filter((todo) => {
    if (filter === 'active') return !todo.is_completed
    if (filter === 'completed') return todo.is_completed
    return true
  })

  const activeCount = (todos ?? []).filter((t) => !t.is_completed).length
  const completedCount = (todos ?? []).filter((t) => t.is_completed).length

  return (
    <div className="min-h-screen p-4 transition-colors" style={{ background: 'var(--bg-main)' }}>
      <div className="max-w-lg mx-auto pt-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-none" style={{ color: 'var(--text-main)' }}>TodoApp</h1>
              <p className="text-slate-500 text-xs mt-0.5">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>

        <div className="rounded-2xl p-5 shadow-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <AddTodoForm />

          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-3xl mb-2">
                  {filter === 'completed' ? '🎉' : filter === 'active' ? '✅' : '📝'}
                </div>
                <p className="text-slate-500 text-sm">
                  {filter === 'completed'
                    ? 'No completed tasks yet'
                    : filter === 'active'
                    ? 'No active tasks!'
                    : 'No tasks yet. Add one above!'}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>

          {(todos ?? []).length > 0 && (
            <Suspense fallback={null}>
              <FilterBar activeCount={activeCount} completedCount={completedCount} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}