import { redirect } from 'next/navigation'
import { isAdminAuthed } from '@/lib/admin-auth'
import AdminEditor from '@/components/admin/AdminEditor'

export default async function AdminPage() {
  if (!(await isAdminAuthed())) redirect('/admin/login')
  return <AdminEditor />
}
