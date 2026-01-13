import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../data/dummyShowsData'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { StarIcon, Heart, PlayCircle } from 'lucide-react'
import DataSelect from '../components/DataSelect'
import { dummyDateTimeData } from '../data/dateTimeData2'
import MovieCard from '../components/MovieCard'


const navigate = useNavigate

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const foundMovie = dummyShowsData.find(
      item =>
        String(item.id) === String(id) ||
        String(item._id) === String(id)
    )

    if (foundMovie) {
      setMovie(foundMovie)
    }
  }, [id])

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
        <p>Movie not found</p>
        <button
          onClick={() => navigate('/movies')}
          className="mt-4 text-primary hover:underline"
        >
          Go back to Movies
        </button>
      </div>
    )
  }

  return (
    <section className="px-6 md:px-16 lg:px-36 pt-24 pb-20">

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row gap-10">

        {/* Poster */}
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="rounded-2xl h-96 w-64 object-cover mx-auto md:mx-0"
        />

        {/* Details */}
        <div className="relative flex flex-col gap-4">
          <BlurCircle top="-120px" right="-120px" />

          <p className="text-primary text-sm tracking-wide">
            {movie.original_language?.toUpperCase()}
          </p>

          <h1 className="text-4xl font-semibold max-w-xl">
            {movie.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            <span>{movie.vote_average.toFixed(1)} User Rating</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
            {movie.overview}
          </p>

          <p className="text-gray-300 text-sm">
            {timeFormat(movie.runtime)} •{' '}
            {movie.genres.map(g => g.name).join(', ')} •{' '}
            {movie.release_date.split('-')[0]}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-6">

            <button className="flex items-center gap-2 px-6 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md">
              <PlayCircle className="w-5 h-5" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="px-8 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium"
            >
              Buy Tickets
            </a>

            <button className="flex items-center gap-2 bg-gray-700 px-4 py-3 rounded-full hover:bg-gray-600 transition">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Add to Favourites</span>
            </button>

          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className="text-lg font-medium mt-20">
        Your Favorite Cast
      </p>

      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {movie.casts?.slice(0, 12).map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="rounded-full h-20 aspect-square object-cover"
              />
              <p className="font-medium text-xs mt-3">
                {cast.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <DataSelect dateTime={dummyDateTimeData} />

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className='flex justify-center mt-20'>
        <button
          onClick={() => {navigate('/movies'); scrollTo(0,0);}}
          className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'
        >
          Show More
        </button>

      </div>

    </section>
  )
}

export default MovieDetails




