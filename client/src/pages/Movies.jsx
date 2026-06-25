import React from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'

const Movies = () => {

  const { shows } = useAppContext()


  return shows.length > 0 ? (
    <div className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 xl:px-32 bg-black min-h-screen text-white overflow-hidden">
      

      <BlurCircle top="10%" left="-100px" color="bg-[#FF4D67]/10" />
      <BlurCircle bottom="10%" right="-100px" color="bg-[#FF4D67]/5" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-12 border-b border-white/5 pb-4">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-white">
            Now Showing
          </h1>
          <p className="text-gray-400 text-sm mt-2 hidden sm:block">
            Explore current theater arrivals, pick showtimes, and book your tickets instantly.
          </p>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8 justify-items-center">
          {shows.map(movie => (
            <div key={movie.id} className="w-full transform transition-all duration-300 hover:-translate-y-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          No Movies Available
        </h1>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          We couldn't find any current movie listings. Please check back later or refresh your browser.
        </p>
      </div>
    </div>
  )
}

export default Movies
