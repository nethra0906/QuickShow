import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import MovieCard from './MovieCard'

import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {
  const navigate = useNavigate()

  const { shows } = useAppContext()

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-24 bg-black overflow-hidden text-white">
      
      <BlurCircle top="10%" left="-150px" color="bg-[#FF4D67]/10" />
      <BlurCircle bottom="10%" right="-150px" color="bg-[#FF4D67]/5" />

      <div className="relative z-10 max-w-7xl mx-auto flex items-end justify-between mb-12 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Now Showing
          </h2>
          <p className="text-gray-400 text-sm mt-2 hidden sm:block">
            Discover the hottest blockbusters playing in theatres right now.
          </p>
        </div>

        <button
          onClick={() => navigate('/movies')}
          className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#FF4D67] transition-all duration-300 shrink-0"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8 justify-items-center">
          {shows.slice(0, 4).map(movie => (
            <div key={movie.id} className="w-full transform transition-all duration-300 hover:-translate-y-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-16 relative z-10">
        <button
          onClick={() => {
            navigate('/movies')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="px-12 py-3.5 text-sm bg-[#FF4D67] hover:bg-[#e63e58] text-white font-bold rounded-full transition-all duration-300 active:scale-95 shadow-xl shadow-[#FF4D67]/20"
        >
          Show More Movies
        </button>
      </div>

    </section>
  )
}

export default FeaturedSection

