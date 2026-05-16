import React, { useState, useEffect } from 'react'
import Title from '../../components/admin/Title'
import Loading from '../../components/Loading'
import BlurCircle from '../../components/BlurCircle'
import { DollarSign, Ticket, Film, Users, Star } from 'lucide-react'
import * as AssetsModule from '../../assets/assets'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$'
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalUsers: 0,
    activeShows: [], 
  })

  useEffect(() => {
    try {
      const localData = AssetsModule.dummyDashboardData || {}
      setDashboardData({
        totalRevenue: localData.totalRevenue ?? 0,
        totalBookings: localData.totalBookings ?? 0,
        totalUsers: localData.totalUser ?? 0,
        activeShows: Array.isArray(localData.activeShows) ? localData.activeShows : [],
      })
    } catch (error) {
      console.error("Dashboard metrics allocation error:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const dashboardCards = [
    { title: 'Total Revenue', value: `${currency}${dashboardData.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Total Bookings', value: dashboardData.totalBookings.toLocaleString(), icon: Ticket, color: 'text-[#FF4D67] bg-[#FF4D67]/10 border-[#FF4D67]/20' },
    { title: 'Active Shows', value: dashboardData.activeShows.length.toLocaleString(), icon: Film, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { title: 'Total Users', value: dashboardData.totalUsers.toLocaleString(), icon: Users, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  ]

  const displayShowTime = (isoString) => {
    if (!isoString) return 'TBD'
    return new Date(isoString).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  if (loading) return <Loading />

  return (
    <div className="relative min-h-full w-full text-white">
      <BlurCircle top="-60px" left="-20px" />
      <Title text1="Admin" text2="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full relative z-10">
        {dashboardCards.map((card, index) => {
          const IconComponent = card.icon
          return (
            <div key={index} className="flex items-center justify-between p-6 bg-[#1A1015]/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-lg">
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">{card.title}</h3>
                <p className="text-2xl font-bold font-mono tracking-tight text-white">{card.value}</p>
              </div>
              <div className={`p-3 rounded-xl border ${card.color} shrink-0 flex items-center justify-center`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-14 mb-6 flex flex-col">
        <h2 className="text-xl font-bold tracking-wide text-white">Active Screenings</h2>
        <p className="text-xs text-white/40 mt-1">Currently scheduled feature movies in local theaters</p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full z-10">
        <BlurCircle top="100px" right="-10%" />
        {dashboardData.activeShows.map((show) => {
          const movieObj = show.movie || {}
          return (
            <div key={show._id} className="group flex flex-col bg-[#1A1015]/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#FF4D67]/30">
              
              <div className="relative aspect-[2/3] w-full bg-neutral-950 border-b border-white/5 overflow-hidden">
                <img 
                  src={movieObj.poster_path} 
                  alt={movieObj.title || 'Poster'} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#1A1015]/80 backdrop-blur-md border border-white/10 flex items-center gap-1 shadow-md">
                  <Star className="w-3.5 h-3.5 text-[#FF4D67] fill-[#FF4D67]" />
                  <span className="text-xs font-bold font-mono text-white">
                    {typeof movieObj.vote_average === 'number' ? movieObj.vote_average.toFixed(1) : "0.0"}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white tracking-wide truncate group-hover:text-[#FF4D67] transition-colors duration-200">
                    {movieObj.title || 'Unknown film'}
                  </h4>
                  <p className="text-xs font-mono text-white/40 mt-1.5">{displayShowTime(show.showDateTime)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                  <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Ticket Price</span>
                  <p className="text-base font-bold font-mono text-[#FF4D67]">{currency}{show.showPrice}</p>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard