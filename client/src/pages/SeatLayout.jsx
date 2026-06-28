import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import { ClockIcon, ChevronRight } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import { useAppContext } from '../context/AppContext'

const SeatLayout = () => {

  const { id: movieId } = useParams()                      
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date')      
  const showIdFromUrl = searchParams.get('showId')             
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)   
  const [movie, setMovie] = useState(null)
  const [dateTime, setDateTime] = useState({})             
  const [occupiedSeats, setOccupiedSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)

  const navigate = useNavigate()
  const { axios, user, getToken  } = useAppContext()

  const getShow = async () => {
  try {
    setLoading(true)
    const { data } = await axios.get(`/api/show/${movieId}`)
    if (data.success) {
      setMovie(data.movie)
      setDateTime(data.dateTime)

      if (showIdFromUrl && data.dateTime[date]) {
        const preSelected = data.dateTime[date].find(
          item => item.showId === showIdFromUrl
        )
        if (preSelected) {
          setSelectedTime(preSelected)
          getOccupiedSeats(preSelected.showId)
        }
      }
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to load show details')
  } finally {
    setLoading(false)
  }
}

  
  const getOccupiedSeats = async (showId) => {
    try {
      const { data } = await axios.get(`/api/booking/seats/${showId}`)
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleTimeSelect = (item) => {
    setSelectedTime(item)
    setSelectedSeats([])                                  
    getOccupiedSeats(item.showId)
  }

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast('Please select a time first')
    }
    if (occupiedSeats.includes(seatId)) return            

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast('You can only select up to 5 seats')
    }

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    )
  }

  const handleCheckout = async () => {
    if (!user) {
      return toast('Please login to book seats')
    }
    if (!selectedTime) {
      return toast('Please select a time first')
    }
    if (selectedSeats.length === 0) {
      return toast('Please select at least one seat')
    }

    try {
      setBookingLoading(true)
      const { data } = await axios.post('/api/booking/create', 
        {
          showId: selectedTime.showId,
          selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`  
          }
        }
      )

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Booking failed')
      }
    } catch (error) {
      console.error(error)
      toast.error('Booking failed. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const renderSeats = (row, count = 9) => {
    return (
      <div key={row} className="flex gap-2 mt-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: count }, (_, i) => {
            const seatId = `${row}${i + 1}`
            const isOccupied = occupiedSeats.includes(seatId)
            const isSelected = selectedSeats.includes(seatId)

            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                disabled={isOccupied}
                className={`h-8 w-8 rounded border text-[10px] font-semibold transition-all
                  ${isOccupied
                    ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
                    : isSelected
                      ? 'bg-[#FF4D67] border-[#FF4D67] text-white cursor-pointer'
                      : 'border-[#FF4D67]/60 text-gray-300 hover:border-[#FF4D67] cursor-pointer'
                  }`}
              >
                {seatId}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (movieId) getShow()
  }, [movieId])

  const timingsForDate = date && dateTime[date] ? dateTime[date] : []

  if (loading) return <Loading />

  return (
    <div className='relative min-h-screen px-6 md:px-16 lg:px-24 pt-32 pb-32 overflow-hidden text-white bg-black'>
      <BlurCircle top='0px' right='-100px' />
      <BlurCircle bottom='0px' left='-100px' />

      <div className='flex flex-col lg:flex-row gap-10'>

        <div className='lg:w-72 w-full'>
          <div className='bg-[#1A1015] border border-[#FF4D67]/20 rounded-2xl p-6 sticky top-28'>
            <h2 className='text-2xl font-bold mb-6'>Available Timings</h2>
            <div className='space-y-3'>
              {timingsForDate.length > 0 ? (
                timingsForDate.map((item, index) => (
                  <button
                    key={item.showId || index}
                    onClick={() => handleTimeSelect(item)}
                    className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 border
                      ${selectedTime?.showId === item.showId
                        ? 'bg-[#FF4D67] border-[#FF4D67] text-white shadow-lg shadow-[#FF4D67]/20'
                        : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                  >
                    <ClockIcon className='w-4 h-4' />
                    <span className='font-semibold'>{isoTimeFormat(item.time)}</span>
                  </button>
                ))
              ) : (
                <p className='text-gray-400 text-sm'>No timings available for this date</p>
              )}
            </div>

            {selectedTime && (
              <div className='mt-8 space-y-2 border-t border-white/10 pt-6'>
                <p className='text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3'>Legend</p>
                <div className='flex items-center gap-3 text-sm text-gray-300'>
                  <div className='h-5 w-5 rounded border border-[#FF4D67]/60' />
                  <span>Available</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-300'>
                  <div className='h-5 w-5 rounded bg-[#FF4D67] border border-[#FF4D67]' />
                  <span>Selected</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-300'>
                  <div className='h-5 w-5 rounded bg-gray-700 border border-gray-600' />
                  <span>Occupied</span>
                </div>
              </div>
            )}

            {selectedSeats.length > 0 && (
              <div className='mt-6 border-t border-white/10 pt-6'>
                <p className='text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2'>Selected</p>
                <p className='text-white font-semibold text-sm'>{selectedSeats.join(', ')}</p>
                <p className='text-[#FF4D67] font-bold mt-2 text-lg'>{selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex-1 flex flex-col items-center'>

          <div className='mb-10 w-full'>
            <h1 className='text-4xl font-bold tracking-tight'>{movie?.title}</h1>
            <p className='text-gray-400 mt-2 text-lg'>Select your preferred seats</p>
          </div>

          <div className='relative flex flex-col items-center mb-16 w-full'>
            <h2 className='text-2xl font-bold mb-8 text-white'>Select your seat</h2>
            <div className='w-full max-w-3xl h-[2px] bg-[#FF4D67]/40 rounded-full blur-[0.5px] mb-2' />
            <p className='text-gray-500 text-[10px] tracking-[0.5em] uppercase font-bold'>SCREEN SIDE</p>
          </div>

          <div className='flex flex-col gap-8 select-none'>

            <div className='flex flex-col gap-2 items-center'>
              {renderSeats('A')}
              {renderSeats('B')}
            </div>

  
            <div className='flex flex-col gap-2'>
              <div className='flex gap-8 md:gap-12'>
                <div className='flex flex-col gap-2'>
                  {renderSeats('C')}
                  {renderSeats('D')}
                </div>
                <div className='flex flex-col gap-2'>
                  {renderSeats('E')}
                  {renderSeats('F')}
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex gap-8 md:gap-12'>
                <div className='flex flex-col gap-2'>
                  {renderSeats('G')}
                  {renderSeats('H')}
                </div>
                <div className='flex flex-col gap-2'>
                  {renderSeats('I')}
                  {renderSeats('J')}
                </div>
              </div>
            </div>

          </div>

          <div className='mt-16 w-full flex justify-center pb-10'>
            <button
              onClick={handleCheckout}
              disabled={bookingLoading || selectedSeats.length === 0}
              className='bg-[#FF4D67] hover:bg-[#e63e58] disabled:opacity-50 disabled:cursor-not-allowed text-white px-14 py-4 rounded-full flex items-center gap-3 font-bold transition-all active:scale-95 shadow-xl shadow-[#FF4D67]/30'
            >
              {bookingLoading ? 'Booking...' : 'Proceed to checkout'}
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SeatLayout