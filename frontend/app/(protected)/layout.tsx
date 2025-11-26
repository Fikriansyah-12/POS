'use client'

import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedLayout({ children }) {
//   const token = useAuthStore((s) => s.token)
//   const router = useRouter()

//   useEffect(() => {
//     if (!token) router.replace('/login')
//   }, [token])

//   if (!token) return <p>Checking session...</p>

  return <>{children}</>
}
