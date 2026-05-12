import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

const DataSelect = ({ dateTime, movieId }) => {
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState(dateTime[0]?.date)

  const [selectedTime, setSelectedTime] = useState(
    dateTime[0]?.shows[0]?.time
  )

  const currentShows =
    dateTime.find(day => day.date === selectedDate)?.shows || []

  const onBookHandler = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time')
      return
    }

    navigate(
      `/movies/${movieId}/date?date=${selectedDate}&time=${selectedTime}`
    )

    window.scrollTo(0, 0)
  }

  return (
    <div id="dateSelect" className="pt-24">
      <div className="relative flex flex-col gap-10 p-8 bg-primary/10 border border-primary/20 rounded-2xl overflow-hidden">

        {/* Blur Effects */}
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="-50px" />

        {/* Date Section */}
        <div>
          <p className="text-lg font-semibold">
            Choose Date
          </p>

          <div className="flex items-center gap-6 text-sm mt-5">

            <ChevronLeft className="cursor-pointer opacity-70 hover:opacity-100" />

            <div className="grid grid-cols-3 md:flex md:flex-wrap gap-4">
              {dateTime.map(day => {
                const dateObj = new Date(day.date)

                return (
                  <button
                    key={day.date}
                    onClick={() => {
                      setSelectedDate(day.date)
                      setSelectedTime(day.shows[0]?.time)
                    }}
                    className={`flex flex-col items-center justify-center h-16 w-16 rounded-lg transition
                      ${
                        selectedDate === day.date
                          ? 'bg-primary text-white'
                          : 'bg-primary/20 hover:bg-primary/30'
                      }`}
                  >
                    <span className="font-semibold text-base">
                      {dateObj.getDate()}
                    </span>

                    <span className="text-xs uppercase">
                      {dateObj.toLocaleDateString('en-US', {
                        month: 'short',
                      })}
                    </span>
                  </button>
                )
              })}
            </div>

            <ChevronRight className="cursor-pointer opacity-70 hover:opacity-100" />
          </div>
        </div>

        {/* Time Section */}
        <div>
          <p className="text-lg font-semibold">
            Choose Time
          </p>

          <div className="flex flex-wrap gap-4 mt-5">
            {currentShows.map(show => (
              <button
                key={show.id}
                onClick={() => setSelectedTime(show.time)}
                className={`px-5 py-2 rounded-lg text-sm transition
                  ${
                    selectedTime === show.time
                      ? 'bg-primary text-white'
                      : 'bg-primary/20 hover:bg-primary/30'
                  }`}
              >
                {show.time}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onBookHandler}
          className="self-start bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>

      </div>
    </div>
  )
}

export default DataSelect