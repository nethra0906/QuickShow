import React, { useState, useEffect } from "react";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { dummyShowsData } from "../../assets/assets";
import { Check, Star, DeleteIcon } from "lucide-react";
import { kConverter } from "../../lib/kConverter";
import { toast } from "react-hot-toast";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [dateTimeSelection, setDateTimeSelection] = useState({});

  const getNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData || []);
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) {
      toast.error("Please select a date and time");
      return;
    }

    const [date, time] = dateTimeInput.split("T");

    setDateTimeSelection((prev) => {
      const existingTimes = prev[date] || [];

      if (existingTimes.includes(time)) {
        toast.error("This timing already exists");
        return prev;
      }

      return {
        ...prev,
        [date]: [...existingTimes, time],
      };
    });

    setDateTimeInput("");
  };

  const removeTiming = (date, time) => {
    setDateTimeSelection((prev) => {
      const updatedTimes = prev[date].filter((t) => t !== time);

      if (updatedTimes.length === 0) {
        const copy = { ...prev };
        delete copy[date];
        return copy;
      }

      return {
        ...prev,
        [date]: updatedTimes,
      };
    });
  };

  const handleAddShowSubmit = (e) => {
    e.preventDefault();

    if (!selectedMovie) {
      toast.error("Please select a movie");
      return;
    }

    if (!showPrice) {
      toast.error("Please enter show price");
      return;
    }

    const timings = Object.entries(dateTimeSelection).flatMap(
      ([date, times]) =>
        times.map((time) => ({
          date,
          time,
          dateTime: `${date}T${time}`,
        }))
    );

    if (timings.length === 0) {
      toast.error("Please add at least one show timing");
      return;
    }

    const payload = {
      movieId: selectedMovie,
      showPrice: Number(showPrice),
      timings,
    };

    console.log(payload);

    toast.success("Show created successfully");
  };

  if (nowPlayingMovies.length === 0) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-full w-full text-white">
      <Title text1="Add" text2="Shows" />

      <form
        onSubmit={handleAddShowSubmit}
        className="mt-10 flex flex-col gap-8"
      >
        {/* Movie Selection */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium tracking-wide">
              Select Featured Movie
            </h3>

            <p className="text-xs text-white/40 mt-0.5">
              Pick a cataloged film from the running theater index
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {nowPlayingMovies.map((movie) => {
              const isSelected = selectedMovie === movie._id;

              return (
                <div
                  key={movie._id}
                  onClick={() => setSelectedMovie(movie._id)}
                  className={`relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 group border-2 ${
                    isSelected
                      ? "border-[#FF4D67] shadow-[0_0_20px_rgba(255,77,103,0.35)] scale-[0.98]"
                      : "border-white/10 hover:border-white/25 hover:-translate-y-1"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D67]/20 via-[#1A1015] to-black flex items-center justify-center p-4">
                    <p className="text-xs font-black tracking-widest uppercase text-white/30 text-center line-clamp-3">
                      {movie.title}
                    </p>
                  </div>

                  {movie.poster_path && (
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

                  {isSelected && (
                    <div className="absolute top-3 right-3 z-30 flex items-center justify-center bg-[#FF4D67] h-7 w-7 rounded-xl shadow-lg border border-white/20">
                      <Check
                        className="w-4 h-4 text-white"
                        strokeWidth={3}
                      />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
                    <h4 className="font-semibold text-white truncate text-sm">
                      {movie.title}
                    </h4>

                    <p className="text-xs text-gray-300 mt-1">
                      {movie.release_date || "Coming Soon"}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <p className="flex items-center gap-1 text-[11px] font-bold font-mono text-white/90">
                        <Star className="w-3.5 h-3.5 text-[#FF4D67] fill-[#FF4D67]" />
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "0.0"}
                      </p>

                      <p className="text-[10px] font-mono text-white/60">
                        {movie.vote_count
                          ? kConverter(movie.vote_count)
                          : "0"}{" "}
                        Votes
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Show Price */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Show Price
          </label>

          <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-lg bg-black/20">
            <span className="text-gray-400">{currency}</span>

            <input
              type="number"
              min={0}
              value={showPrice}
              onChange={(e) => setShowPrice(e.target.value)}
              placeholder="Enter show price"
              className="bg-transparent outline-none w-32"
            />
          </div>
        </div>

        {/* Date Time Selection */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Select Date & Time
          </label>

          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="datetime-local"
              value={dateTimeInput}
              onChange={(e) => setDateTimeInput(e.target.value)}
              className="bg-black/20 border border-gray-600 rounded-lg px-3 py-2 outline-none text-white"
            />

            <button
              type="button"
              onClick={handleDateTimeAdd}
              className="bg-primary px-4 py-2 rounded-lg text-white hover:opacity-90 transition"
            >
              Add Time
            </button>
          </div>
        </div>

        {/* Selected Timings */}
        {Object.keys(dateTimeSelection).length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 text-lg font-medium">
              Selected Date & Time
            </h2>

            <ul className="space-y-4">
              {Object.entries(dateTimeSelection).map(([date, times]) => (
                <li key={date}>
                  <div className="font-medium text-white">
                    {new Date(date).toLocaleDateString()}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {times.map((time) => (
                      <div
                        key={time}
                        className="border border-primary px-3 py-1 rounded-lg flex items-center gap-2"
                      >
                        <span>{time}</span>

                        <DeleteIcon
                          width={15}
                          className="cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => removeTiming(date, time)}
                        />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

  
        <button
          type="submit"
          className="w-fit bg-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Add Show
        </button>
      </form>
    </div>
  );
};

export default AddShows;