'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
// import StatsCard from './components/StatsCard'

export default function DashboardPage() {
//   const { user } = useAuthStore()
//   const router = useRouter()

//   useEffect(() => {
//     if (user?.role !== 'admin') router.replace('/unauthorized')
//   }, [user])

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* <StatsCard title="Total Sales" value="120" />
        <StatsCard title="Products" value="42" />
        <StatsCard title="Customers" value="200" /> */}
      </div>
    </div>
  )
}
