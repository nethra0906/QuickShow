import React from "react";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/AppContext";

const Favourite = () => {

  
    const { favoriteMovies } = useAppContext()

  return favoriteMovies.length > 0 ? (
    
    <div className="relative min-h-screen bg-black text-white overflow-hidden pt-32 pb-24 px-6 md:px-12 lg:px-20 xl:px-32">

      {/* Background Blur */}
      <BlurCircle
        top="10%"
        left="-100px"
        color="bg-pink-500/10"
      />

      <BlurCircle
        bottom="10%"
        right="-150px"
        color="bg-pink-500/5"
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-12 border-b border-white/10 pb-5">
          
          <h1 className="text-4xl font-black tracking-tight">
            Your Favourite Movies
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Your personalized movie watchlist.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>

  ) : (

    <div className="flex items-center justify-center min-h-screen bg-black text-white">

      <div className="text-center">

        <h1 className="text-4xl font-bold">
          No Movies Available
        </h1>

        <p className="text-gray-400 mt-3">
          Add movies to your favorites list.
        </p>
      </div>
    </div>
  );
};

export default Favourite;