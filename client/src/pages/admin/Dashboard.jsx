import React, { useState, useEffect } from 'react'
import Title from '../../components/admin/Title'
import Loading from '../../components/Loading'
import BlurCircle from '../../components/BlurCircle'
import { DollarSign, Ticket, Film, Users } from 'lucide-react'
import * as AssetsModule from '../../assets/assets'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$'

  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeShows: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const localData = AssetsModule.dummyDashboardData || {};
      
      setDashboardData({
        totalRevenue: localData.totalRevenue ?? 0,
        totalBookings: localData.totalBookings ?? 0,
        activeShows: Array.isArray(localData.activeShows) ? localData.activeShows.length : 0,
        totalUsers: localData.totalUser ?? 0,
      });
    } catch (error) {
      console.error("Error setting dashboard metrics:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, [])

  const dashboardCards = [
    { 
      title: 'Total Revenue', 
      value: `${currency}${dashboardData.totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
    },
    { 
      title: 'Total Bookings', 
      value: dashboardData.totalBookings.toLocaleString(), 
      icon: Ticket, 
      color: 'text-[#FF4D67] bg-[#FF4D67]/10 border-[#FF4D67]/20' 
    },
    { 
      title: 'Active Shows', 
      value: dashboardData.activeShows.toLocaleString(), 
      icon: Film, 
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' 
    },
    { 
      title: 'Total Users', 
      value: dashboardData.totalUsers.toLocaleString(), 
      icon: Users, 
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' 
    },
  ];

  if (loading) {
    return <Loading />
  }

  return (
    <div className="relative min-h-full w-full">
      <BlurCircle top="-60px" left="-20px" />
      
      <Title text1="Admin" text2="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full relative z-10">
        {dashboardCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div 
              key={index} 
              className="flex items-center justify-between p-6 bg-[#1A1015]/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold font-mono tracking-tight text-white">
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl border ${card.color} shrink-0 flex items-center justify-center`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Dashboard;