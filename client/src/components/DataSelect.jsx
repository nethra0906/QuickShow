import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

const DataSelect = ({ dateTime, movieId }) => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(dateTime[0]?.date)

  const onBookHandler = () => {
    if (!selectedDate) {
      toast.error('Please select a date')
      return
    }

    navigate(`/movies/${movieId}/date`)
    window.scrollTo(0, 0)
  }

  return (
    <div id="dateSelect" className="pt-24">
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 p-8 bg-primary/10 border border-primary/20 rounded-lg overflow-hidden">

        {/* Blur Effects */}
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="-50px" />

        <div className="w-full">
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
                    onClick={() => setSelectedDate(day.date)}
                    className={`flex flex-col items-center justify-center h-14 w-14 rounded-md transition
                      ${
                        selectedDate === day.date
                          ? 'bg-primary text-white'
                          : 'bg-primary/20 hover:bg-primary/30'
                      }`}
                  >
                    <span className="font-medium">
                      {dateObj.getDate()}
                    </span>
                    <span className="text-xs uppercase">
                      {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </button>
                )
              })}
            </div>

            <ChevronRight className="cursor-pointer opacity-70 hover:opacity-100" />
          </div>
        </div>

        <button
          onClick={onBookHandler}
          className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer"
        >
          Book Now
        </button>

      </div>
    </div>
  )
}

export default DataSelect

