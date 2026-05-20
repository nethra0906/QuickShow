import React, { useState, useEffect } from 'react'
import Title from '../../components/admin/Title'
import Loading from '../../components/Loading'
import { dummyShowsData } from '../../assets/assets'
import { Check, Star } from 'lucide-react'
import { kConverter } from '../../lib/kConverter'

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$'

  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [dateTimeInput, setDateTimeInput] = useState('')
  const [showPrice, setShowPrice] = useState('')

  const getNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData || [])
  }

  useEffect(() => {
    getNowPlayingMovies()
  }, [])

  // Action handler mock placeholder for scheduling form processing
  const handleAddShowSubmit = (e) => {
    e.preventDefault()
    if (!selectedMovie || !dateTimeInput || !showPrice) return
    console.log({ selectedMovie, dateTimeInput, showPrice })
  }

  if (nowPlayingMovies.length === 0) {
    return <Loading />
  }

  return (
    <div className="relative min-h-full w-full text-white">
      <Title text1="Add" text2="Shows" />

      {/* Main Grid Section Splitter: Left is Movie Selection, Right is the Form Panel */}
      <div className="mt-10 flex flex-col xl:flex-row gap-8 items-start relative z-10">
        
        {/* Left Section: Movie Selection Matrix */}
        <div className="flex-1 w-full">
          <div className="mb-4">
            <h3 className="text-lg font-medium tracking-wide">Select Featured Movie</h3>
            <p className="text-xs text-white/40 mt-0.5">Pick a cataloged film from the running theater index</p>
          </div>

          {/* Grid Layout Standardization Engine */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {nowPlayingMovies.map((movie) => {
              const isSelected = selectedMovie === movie._id;

              return (
                <div
                  key={movie._id}
                  onClick={() => setSelectedMovie(movie._id)}
                  className={`
                    relative aspect-[2/3] w-full rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 group
                    bg-gradient-to-br from-[#FF4D67]/20 via-[#1A1015] to-black border-2 flex flex-col justify-end
                    ${isSelected 
                      ? 'border-[#FF4D67] shadow-[0_0_15px_rgba(255,77,103,0.3)] scale-[0.98]' 
                      : 'border-white/5 hover:border-white/20 hover:-translate-y-1 shadow-lg'}
                  `}
                >
                  {/* Premium Layer: Offline Text Fallback Graphic */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 text-center opacity-60 z-0">
                    <p className="text-xs font-black tracking-wider uppercase text-white/40 line-clamp-3">
                      {movie.title}
                    </p>
                  </div>

                  {/* Image Render Block with Active Network Guard */}
                  {movie.poster_path && (
                    <img
                      src={movie.poster_path}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  )}

                  {/* Glassmorphic Metric Bottom Bar Overlay */}
                  <div className="relative z-20 flex items-center justify-between p-2.5 bg-black/60 backdrop-blur-md border-t border-white/5 w-full">
                    <p className="flex items-center gap-1 text-[11px] font-bold font-mono text-white/90">
                      <Star className="w-3.5 h-3.5 text-[#FF4D67] fill-[#FF4D67]" />
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
                    </p>
                    <p className="text-[10px] font-mono text-white/40 tracking-tight">
                      {movie.vote_count ? kConverter(movie.vote_count) : "0"} Votes
                    </p>
                  </div>

                  {/* Selection Indicator Check Pin */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex items-center justify-center bg-[#FF4D67] h-7 w-7 rounded-xl shadow-lg border border-white/20 animate-fade-in z-30">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section: Interactive Scheduling Form Container */}
        <div className="w-full xl:w-96 bg-[#1A1015]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl shrink-0">
          <div className="mb-6">
            <h3 className="text-lg font-medium tracking-wide">Schedule Settings</h3>
            <p className="text-xs text-white/40 mt-0.5">Assign showtime and entry matrix values</p>
          </div>

          <form onSubmit={handleAddShowSubmit} className="space-y-5">
            {/* Show Date Time Picker Configuration */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/40">Show Date & Time</label>
              <input 
                type="datetime-local" 
                value={dateTimeInput}
                onChange={(e) => setDateTimeInput(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#FF4D67] focus:ring-1 focus:ring-[#FF4D67]/50 transition-all font-mono"
                required
              />
            </div>

            {/* Ticket Pricing Input Frame Configuration */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/40">Ticket Price ({currency})</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-sm font-mono text-white/30">{currency}</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={showPrice}
                  onChange={(e) => setShowPrice(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[#FF4D67] focus:ring-1 focus:ring-[#FF4D67]/50 transition-all font-mono"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Form submission action trigger button */}
            <button 
              type="submit"
              disabled={!selectedMovie || !dateTimeInput || !showPrice}
              className={`
                w-full mt-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 shadow-md
                ${(!selectedMovie || !dateTimeInput || !showPrice)
                  ? 'bg-white/5 border border-white/5 text-white/20 cursor-not-allowed'
                  : 'bg-[#FF4D67] hover:bg-[#ff3350] text-white shadow-[#FF4D67]/10 hover:shadow-[#FF4D67]/20'}
              `}
            >
              {!selectedMovie ? 'Select a Movie First' : 'Create Live Screening'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AddShows