import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchIcon, MenuIcon, XIcon, User, TicketPlus } from 'lucide-react'
import { assets } from '../assets/assets'
import { UserButton, useUser, useClerk } from '@clerk/clerk-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const {user} = useUser()
  const {openSignIn} = useClerk()

  const navigate = useNavigate();

  return (
  <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-6 bg-transparent">


  <Link to="/" className="flex items-center">
    <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
  </Link>


  <div
    className={`
      fixed md:absolute md:left-1/2 md:-translate-x-1/2
      top-0 md:top-6 z-50

      flex flex-col md:flex-row
      items-center justify-center
      gap-6

      px-6 md:px-8 py-2.5
      h-screen md:h-auto
      w-full md:w-auto

      text-sm font-medium

      backdrop-blur-xl
      bg-black/70 md:bg-white/10

      border border-white/10
      rounded-none md:rounded-full

      shadow-[0_8px_30px_rgba(0,0,0,0.45)]

      transition-transform duration-300
      ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-[-50%]'}
    `}
  >
    <XIcon
      onClick={() => setOpen(false)}
      className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
    />

    {[
      ['/', 'Home'],
      ['/movies', 'Movies'],
      ['/', 'Theaters'],
      ['/', 'Releases'],
      ['/favourite', 'Favorites'],
    ].map(([to, label]) => (
      <Link
        key={label}
        to={to}
        onClick={() => setOpen(false)}
        className="px-4 py-1.5 rounded-full text-white/90 hover:bg-white/15 hover:text-white transition"
      >
        {label}
      </Link>
    ))}
  </div>

  <div className="flex items-center gap-6">
    <SearchIcon className="max-md:hidden w-5 h-5 cursor-pointer" />

    {!user ? (
      <button
        onClick={openSignIn}
        className="px-5 py-2 bg-primary hover:bg-primary-dull transition rounded-full text-sm font-medium"
      >
        Login
      </button>
    ) : (
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="My Bookings"
            labelIcon={<TicketPlus width={15} />}
            onClick={() => navigate('/my-bookings')}
          />
        </UserButton.MenuItems>
      </UserButton>
    )}
  </div>

  <MenuIcon
    onClick={() => setOpen(true)}
    className="md:hidden ml-4 w-8 h-8 cursor-pointer"
  />
</div>

  )
}

export default Navbar
