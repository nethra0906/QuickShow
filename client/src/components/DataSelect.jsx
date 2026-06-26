import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import isoTimeFormat from '../lib/isoTimeFormat'

const DataSelect = ({ dateTime = {}, movieId }) => {
  const navigate = useNavigate();

  // Convert backend object into array
  const dates = useMemo(() => {
    return Object.keys(dateTime).map((date) => ({
      date,
      shows: dateTime[date],
    }));
  }, [dateTime]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    if (dates.length > 0) {
      setSelectedDate(dates[0].date);
      setSelectedShow(dates[0].shows[0] || null);
    }
  }, [dates]);

  const currentShows =
    dates.find((d) => d.date === selectedDate)?.shows || [];

  const onBookHandler = () => {
    if (!selectedShow) {
      toast.error("Please select date and time");
      return;
    }

    navigate(`/movies/${movieId}/date?date=${selectedDate}&showId=${selectedShow.showId}`)

    window.scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-24">
      <div className="relative flex flex-col gap-10 p-8 bg-primary/10 border border-primary/20 rounded-2xl overflow-hidden">

        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="-50px" />

        {/* Date */}

        <div>
          <p className="text-lg font-semibold">Choose Date</p>

          <div className="flex items-center gap-6 text-sm mt-5">

            <ChevronLeft className="cursor-pointer opacity-70 hover:opacity-100" />

            <div className="grid grid-cols-3 md:flex md:flex-wrap gap-4">
              {dates.map((day) => {
                const dateObj = new Date(day.date);

                return (
                  <button
                    key={day.date}
                    onClick={() => {
                      setSelectedDate(day.date);
                      setSelectedShow(day.shows[0] || null);
                    }}
                    className={`flex flex-col items-center justify-center h-16 w-16 rounded-lg transition ${
                      selectedDate === day.date
                        ? "bg-primary text-white"
                        : "bg-primary/20 hover:bg-primary/30"
                    }`}
                  >
                    <span className="font-semibold text-base">
                      {dateObj.getDate()}
                    </span>

                    <span className="text-xs uppercase">
                      {dateObj.toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </button>
                );
              })}
            </div>

            <ChevronRight className="cursor-pointer opacity-70 hover:opacity-100" />
          </div>
        </div>

        {/* Time */}

        <div>
          <p className="text-lg font-semibold">Choose Time</p>

          <div className="flex flex-wrap gap-4 mt-5">
            {currentShows.map((show) => (
              <button
                key={show.showId}
                onClick={() => setSelectedShow(show)}
                className={`px-5 py-2 rounded-lg text-sm transition ${
                  selectedShow?.showId === show.showId
                    ? "bg-primary text-white"
                    : "bg-primary/20 hover:bg-primary/30"
                }`}
              >
                {isoTimeFormat(show.time)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onBookHandler}
          className="self-start bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>

      </div>
    </div>
  );
};

export default DataSelect;