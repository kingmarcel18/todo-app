export type Todo = {
  id: string
  user_id: string
  title: string
  is_completed: boolean
  due_date: string | null
  created_at: string
}

export type FilterType = 'all' | 'active' | 'completed'