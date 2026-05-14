import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../data/dummyShowsData'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { StarIcon, Heart, PlayCircle, Calendar } from 'lucide-react'
import DataSelect from '../components/DataSelect'
import { dummyDateTimeData } from '../data/dateTimeData2'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    const foundMovie = dummyShowsData.find(
      item =>
        String(item.id) === String(id) ||
        String(item._id) === String(id)
    )

    if (foundMovie) {
      setMovie(foundMovie)
      // Smooth scroll to top when a new movie details page loads
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [id])

  if (!movie) {
    return <Loading />
  }

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 pt-32 pb-24 bg-black text-white overflow-hidden min-h-screen">
      
      {/* BRAND GLOW ACCENTS */}
      <BlurCircle top="5%" left="-100px" color="bg-[#FF4D67]/10" />
      <BlurCircle top="40%" right="-150px" color="bg-[#FF4D67]/5" />

      {/* MAIN HERO CARD SECTION */}
      <div className="relative max-w-7xl mx-auto bg-[#1A1015]/40 border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-10 items-center md:items-stretch z-10">
        
        {/* POSTER WITH PREMIUM HOVER EFFECTS */}
        <div className="w-64 md:w-72 shrink-0 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 group relative">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayCircle className="w-12 h-12 text-[#FF4D67] drop-shadow-lg" />
          </div>
        </div>

        {/* METADATA DETAILS */}
        <div className="flex flex-col justify-between flex-1 py-2">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest bg-[#FF4D67]/20 text-[#FF4D67] px-2.5 py-1 rounded">
                {movie.original_language?.toUpperCase() || 'EN'}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {movie.release_date.split('-')[0]}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl">
              {movie.title}
            </h1>

            {/* STAR USER RATING BAR */}
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg w-fit border border-white/5">
              <StarIcon className="w-4 h-4 text-[#FF4D67] fill-[#FF4D67]" />
              <span className="text-sm font-bold text-white">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-xs text-gray-400 font-medium">User Rating</span>
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl font-medium pt-2">
              {movie.overview}
            </p>

            <p className="text-gray-400 text-xs md:text-sm font-semibold pt-2">
              {timeFormat(movie.runtime)} &nbsp;•&nbsp;{' '}
              <span className="text-gray-300">{movie.genres.map(g => g.name).join(', ')}</span>
            </p>
          </div>

          {/* ACTION TOOLBAR BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/5">
            <button className="flex items-center gap-2 px-6 py-3 text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold transition-all duration-300 rounded-full active:scale-95">
              <PlayCircle className="w-4 h-4 text-[#FF4D67]" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="flex items-center gap-2 px-8 py-3 text-sm bg-[#FF4D67] hover:bg-[#e63e58] text-white font-black transition-all duration-300 rounded-full active:scale-95 shadow-lg shadow-[#FF4D67]/30"
            >
              <Calendar className="w-4 h-4" />
              Buy Tickets
            </a>

            <button 
              onClick={() => setIsFavourite(!isFavourite)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-full hover:bg-white/10 hover:border-[#FF4D67]/30 transition-all duration-300 active:scale-95 group"
            >
              <Heart className={`w-4 h-4 transition-colors ${isFavourite ? 'text-[#FF4D67] fill-[#FF4D67]' : 'text-gray-400 group-hover:text-[#FF4D67]'}`} />
              <span className="text-xs font-bold">
                {isFavourite ? 'Added to Favourites' : 'Add to Favourites'}
              </span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* CAST SCROLL SECTION */}
        <div className="mt-20">
          <h2 className="text-xl font-black uppercase tracking-wider text-gray-400 border-b border-white/5 pb-3">
            Your Favorite Cast
          </h2>
          
          <div className="overflow-x-auto no-scrollbar mt-6 pb-2">
            <div className="flex items-center gap-6 w-max px-2">
              {movie.casts?.slice(0, 12).map((cast, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group w-24 shrink-0"
                >
                  <div className="rounded-full h-20 w-20 overflow-hidden border-2 border-white/5 group-hover:border-[#FF4D67] shadow-lg transition-all duration-300">
                    <img
                      src={cast.profile_path}
                      alt={cast.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-bold text-[11px] text-gray-300 mt-3 truncate w-full group-hover:text-white transition-colors">
                    {cast.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DATE SELECTION WIDGET CONTAINER */}
        <div id="dateSelect" className="mt-16 scroll-mt-28">
          <DataSelect
            dateTime={dummyDateTimeData}
            movieId={movie.id}
          />
        </div>

        {/* RESTRUCTURED ALIGNED RECOMMENDATIONS GRID */}
        <div className="mt-24">
          <div className="mb-10 border-b border-white/5 pb-3">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              You May Also Like
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8 justify-items-center">
            {dummyShowsData.slice(0, 4).map((recMovie, index) => (
              <div key={index} className="w-full transform transition-all duration-300 hover:-translate-y-2">
                <MovieCard movie={recMovie} />
              </div>
            ))}
          </div>
        </div>

        {/* EXPLORE MORE BUTTON */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => {
              navigate('/movies')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="px-14 py-4 text-sm bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-white/10 rounded-full font-bold transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Show More Movies
          </button>
        </div>

      </div>
    </section>
  )
}

export default MovieDetails




