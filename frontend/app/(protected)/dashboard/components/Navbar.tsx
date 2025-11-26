'use client'

import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.replace('/login')
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <span>Hi, {user?.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}
