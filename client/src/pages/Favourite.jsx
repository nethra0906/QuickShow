import React from 'react'
import { dummyShowsData } from '../assets/assets' 
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'

const Favourite = () => {
  // Slice or ensure exactly 7 movies are targeted for this layout arrangement
  const targetMovies = dummyShowsData.slice(0, 7);

  return targetMovies.length > 0 ? (
    <div className='relative pt-32 pb-24 px-6 md:px-12 lg:px-20 xl:px-32 bg-black min-h-screen text-white overflow-hidden'>
      
      {/* RICH DESIGN ACCENT BLURS */}
      <BlurCircle top="10%" left="-100px" color="bg-[#FF4D67]/10" />
      <BlurCircle bottom="10%" right="-150px" color="bg-[#FF4D67]/5" />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        {/* ENHANCED SECTION HEADER */}
        <div className="mb-12 border-b border-white/5 pb-4">
          <h1 className='text-3xl font-black tracking-tight sm:text-4xl'>
            Your Favourite Movies
          </h1>
          <p className="text-gray-400 text-sm mt-2 hidden sm:block">
            Your personalized watchlist. Quick-access your most anticipated shows and timings.
          </p>
        </div>

        {/* ARRANGED GRID LAYOUT OPTIMIZED FOR 7 CARDS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 justify-center justify-items-center'>
          {targetMovies.map((movie) => (
            <div 
              key={movie.id || movie._id} 
              className="w-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#FF4D67]/5"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white px-6'>
      <div className='text-center space-y-3'>
        <h1 className='text-3xl font-black tracking-tight sm:text-4xl'>No Movies Available</h1>
        <p className='text-gray-400 text-sm max-w-sm mx-auto'>
          Your favorites list is currently empty. Explore trending items on the homepage to start customizing!
        </p>
      </div>
    </div>
  )
}

export default Favourite