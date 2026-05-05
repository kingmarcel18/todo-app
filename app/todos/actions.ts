'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addTodo(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string

  if (!title?.trim()) return

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('todos').insert({
    title: title.trim(),
    user_id: user.id,
    is_completed: false,
  })

  revalidatePath('/todos')
}

export async function toggleTodo(id: string, isCompleted: boolean) {
  const supabase = await createClient()

  await supabase
    .from('todos')
    .update({ is_completed: !isCompleted })
    .eq('id', id)

  revalidatePath('/todos')
}

export async function deleteTodo(id: string) {
  const supabase = await createClient()
  await supabase.from('todos').delete().eq('id', id)
  revalidatePath('/todos')
}

export async function clearCompleted() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('todos')
    .delete()
    .eq('user_id', user.id)
    .eq('is_completed', true)

  revalidatePath('/todos')
}