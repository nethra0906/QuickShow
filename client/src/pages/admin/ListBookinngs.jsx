import React, { useState, useEffect } from 'react'
import Title from '../../components/admin/Title'
import Loading from '../../components/Loading'
import { dummyBookingData } from '../../assets/assets'

const ListBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY || '$'

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllBookings = async () => {
    setBookings(dummyBookingData)
    setLoading(false)
  }

  useEffect(() => {
    getAllBookings()
  }, [])

  return !loading ? (
    <>
      <Title text1="List" text2="Bookings" />

      <div className='max-w-5xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>

          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-3 pl-5'>User Name</th>
              <th className='p-3'>Movie Name</th>
              <th className='p-3'>Show Time</th>
              <th className='p-3'>Seats Booked</th>
              <th className='p-3'>Total Price</th>
              <th className='p-3'>Payment</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (

              <tr
                key={index}
                className='border-b border-gray-700 hover:bg-white/10 text-white'
              >

                <td className='p-3 pl-5'>
                  {booking.user?.name}
                </td>

                <td className='p-3'>
                  {booking.show?.movie?.title}
                </td>

                <td className='p-3'>
                  {new Date(booking.show?.showDateTime).toLocaleString()}
                </td>

                <td className='p-3'>
                  {booking.bookedSeats?.join(', ')}
                </td>

                <td className='p-3'>
                  {currency}{booking.amount}
                </td>

                <td className='p-3'>
                  {booking.isPaid ? (
                    <span className='text-green-400'>Paid</span>
                  ) : (
                    <span className='text-red-400'>Pending</span>
                  )}
                </td>

              </tr>

            ))}
          </tbody>

        </table>
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default ListBookings