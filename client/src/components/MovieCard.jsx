import React from "react";
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Coming Soon";

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const image =
    movie.poster_path ||
    "https://via.placeholder.com/500x750?text=Movie";

  const handleBuyTickets = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div className="bg-[#1B2433] rounded-3xl overflow-hidden p-5 w-full max-w-[320px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10">
      
      {/* Movie Poster */}
      <img
        src={image}
        alt={movie.title}
        className="w-full h-[380px] object-cover rounded-2xl"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/500x750?text=No+Poster";
        }}
      />

      {/* Movie Info */}
      <div className="mt-5">
        <h2 className="text-white text-2xl font-bold line-clamp-1">
          {movie.title}
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          ₹{movie.showPrice} •{" "}
          {movie.genres?.[0]?.name || "Movie"} •{" "}
          {formatTime(movie.showDateTime)}
        </p>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBuyTickets}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-full text-white font-semibold"
          >
            Buy Tickets
          </button>

          <div className="flex items-center gap-1">
            <StarIcon
              size={18}
              className="text-red-400 fill-red-400"
            />
            <span className="text-white font-medium">
              {movie.vote_average}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
