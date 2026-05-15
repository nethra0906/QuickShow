import React from 'react'
import { LayoutDashboardIcon, PlusSquareIcon, ListIcon, ClipboardListIcon } from 'lucide-react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  }

  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ClipboardListIcon }, // Swapped to a cleaner ticket-like list icon
  ]

  return (
    <div className='h-[calc(100vh-64px)] flex flex-col items-center pt-8 max-w-[68px] md:max-w-[240px] w-full border-r border-white/5 bg-[#1A1015]/30 backdrop-blur-xl text-sm transition-all duration-300'>
      
      <div className='flex flex-col items-center w-full px-3 mb-8 border-b border-white/5 pb-6'>
        <div className='relative group'>
          <div className='absolute -inset-0.5 bg-[#FF4D67] rounded-full opacity-30 blur group-hover:opacity-60 transition duration-300'></div>
          <img 
            className='relative h-10 w-10 md:h-14 md:w-14 rounded-full object-cover border-2 border-white/10 mx-auto' 
            src={user.imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"} 
            alt="Admin Profile" 
          />
        </div>
        <p className='mt-3 text-sm font-semibold tracking-wide text-white/90 max-md:hidden'>
          {user.firstName} {user.lastName}
        </p>
        <p className='text-xs text-[#FF4D67] font-medium tracking-wider uppercase mt-0.5 max-md:hidden scale-90 origin-center opacity-80'>
          Cinema Manager
        </p>
      </div>

      <div className='w-full px-2 space-y-1.5 flex-1'>
        {adminNavLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'} 
            className={({ isActive }) => `
              relative flex items-center justify-center md:justify-start gap-3 w-full py-3 px-3 md:pl-6 rounded-xl font-medium transition-all duration-200 group
              ${isActive 
                ? 'bg-[#FF4D67]/10 text-[#FF4D67] shadow-[inset_0_0_12px_rgba(255,77,103,0.05)]' 
                : 'text-white/50 hover:bg-white/[0.03] hover:text-white/80'}
            `}
          >
            {({ isActive }) => (
              <>
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-md transition-all duration-200 ${isActive ? 'bg-[#FF4D67] shadow-[0_0_8px_#FF4D67]' : 'bg-transparent'}`}></span>
                
                <link.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 shrink-0 ${isActive ? 'text-[#FF4D67]' : 'text-white/40 group-hover:text-white/70'}`} />
              
                <p className='max-md:hidden tracking-wide'>{link.name}</p>
                
                {isActive && (
                  <span className="absolute right-4 w-1 h-1 rounded-full bg-[#FF4D67]/70 max-md:hidden animate-pulse"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar