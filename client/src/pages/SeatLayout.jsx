import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { dummyShowsData } from '../data/dummyShowsData'
import { dummyDateTimeData } from '../data/dateTimeData2'
import Loading from '../components/Loading'
import { ClockIcon, ChevronRight } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import { assets } from '../assets/assets'
import isoTimeFormat from '../lib/isoTimeFormat'
import { useNavigate } from 'react-router-dom'


const SeatLayout = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const dateParam = searchParams.get('date')
  const timeParam = searchParams.get('time')

  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

  const themeColor = '#FF4D67' 

  const navigate = useNavigate()

  useEffect(() => {
    const movie = dummyShowsData.find((item) => String(item.id) === String(id))
    if (movie) {
      setShow({ movie })
    }
  }, [id])

  const selectedDateData = dummyDateTimeData.find(item => item.date === dateParam)?.shows || []

  useEffect(() => {
    if (timeParam && selectedDateData.length > 0) {
      const matched = selectedDateData.find(item => item.time === timeParam)
      if (matched) {
        setSelectedTime(matched)
      }
    }
  }, [timeParam, selectedDateData])

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    )
  }

  if (!show) return <Loading />

  const renderSeatBlock = (rowLabel, startNum, endNum) => {
    const seats = []
    for (let i = startNum; i <= endNum; i++) {
      const seatId = `${rowLabel}${i}`
      const isSelected = selectedSeats.includes(seatId)
      seats.push(
        <button
          key={seatId}
          onClick={() => toggleSeat(seatId)}
          className={`w-8 h-8 md:w-9 md:h-9 rounded-md border-[1.5px] text-[10px] font-bold transition-all duration-200 flex items-center justify-center
            ${isSelected 
              ? 'bg-[#FF4D67] border-[#FF4D67] text-white shadow-lg shadow-[#FF4D67]/40 scale-105' 
              : 'bg-transparent border-[#FF4D67]/40 text-gray-400 hover:border-[#FF4D67] hover:text-white'}`}
        >
          {seatId}
        </button>
      )
    }
    return <div className='flex gap-1.5 md:gap-2'>{seats}</div>
  }

  return (
    <div className='relative min-h-screen px-6 md:px-16 lg:px-24 pt-32 pb-32 overflow-hidden text-white bg-black'>
      <BlurCircle top='0px' right='-100px' />
      <BlurCircle bottom='0px' left='-100px' />

      <div className='flex flex-col lg:flex-row gap-10'>
        
        
        <div className='lg:w-72 w-full'>
          <div className='bg-[#1A1015] border border-[#FF4D67]/20 rounded-2xl p-6 sticky top-28'>
            <h2 className='text-2xl font-bold mb-6'>Available Timings</h2>
            <div className='space-y-3'>
              {selectedDateData.length > 0 ? (
                selectedDateData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTime(item)}
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 border
                      ${selectedTime?.id === item.id 
                        ? 'bg-[#FF4D67] border-[#FF4D67] text-white shadow-lg shadow-[#FF4D67]/20' 
                        : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                  >
                    <ClockIcon className='w-4 h-4' />
                    <span className='font-semibold'>{isoTimeFormat(item.time)}</span>
                  </button>
                ))
              ) : (
                <p className='text-gray-400 text-sm'>No timings available</p>
              )}
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col items-center'>
          
          <div className='mb-10 w-full'>
            <h1 className='text-4xl font-bold tracking-tight'>{show.movie.title}</h1>
            <p className='text-gray-400 mt-2 text-lg'>Select your preferred seats</p>
          </div>

          <div className='relative flex flex-col items-center mb-16 w-full'>
            <h2 className='text-2xl font-bold mb-8 text-white'>Select your seat</h2>
            <div className='w-full max-w-3xl h-[2px] bg-[#FF4D67]/40 rounded-full blur-[0.5px] mb-2' />
            <p className='text-gray-500 text-[10px] tracking-[0.5em] uppercase font-bold'>SCREEN SIDE</p>
          </div>

          
          <div className='flex flex-col gap-8 select-none'>
           
            <div className='flex flex-col gap-2 items-center'>
              {renderSeatBlock('A', 1, 9)}
              {renderSeatBlock('B', 1, 9)}
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex gap-8 md:gap-12'>
                <div className='flex flex-col gap-2'>
                  {renderSeatBlock('C', 1, 9)}
                  {renderSeatBlock('D', 1, 9)}
                </div>
                <div className='flex flex-col gap-2'>
                  {renderSeatBlock('E', 1, 9)}
                  {renderSeatBlock('F', 1, 9)}
                </div>
              </div>
            </div>


            <div className='flex flex-col gap-2'>
              <div className='flex gap-8 md:gap-12'>
                <div className='flex flex-col gap-2'>
                  {renderSeatBlock('G', 1, 9)}
                  {renderSeatBlock('H', 1, 9)}
                </div>
                <div className='flex flex-col gap-2'>
                  {renderSeatBlock('I', 1, 9)}
                  {renderSeatBlock('J', 1, 9)}
                </div>
              </div>
            </div>

          </div>

          <div className='mt-16 w-full flex justify-center pb-10'>
            <button onClick={()=> navigate('/my-bookings')}className='bg-[#FF4D67] hover:bg-[#e63e58] text-white px-14 py-4 rounded-full flex items-center gap-3 font-bold transition-all active:scale-95 shadow-xl shadow-[#FF4D67]/30'>
              Proceed to checkout
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SeatLayout