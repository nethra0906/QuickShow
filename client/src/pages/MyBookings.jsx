import React, { useState, useEffect } from 'react';
import { dummyBookingData } from '../assets/assets';
import Loading from '../components/Loading';
import BlurCircle from '../components/BlurCircle';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  return !isLoading ? (
    <div className='relative px-6 md:px-12 lg:px-24 pt-32 md:pt-40 min-h-screen text-white bg-black overflow-hidden'>
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="50px" right="-100px" />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        <h1 className='text-3xl font-bold mb-8 tracking-tight'>My Bookings</h1>

        
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 w-full'>
          {bookings.map((item, index) => (
            <div 
              key={index} 
              className='flex flex-col sm:flex-row bg-[#1A1015]/60 border border-[#FF4D67]/10 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-[#FF4D67]/40 hover:shadow-xl hover:shadow-[#FF4D67]/5'
            >
              
              <div className='w-full sm:w-40 md:w-44 shrink-0 aspect-[2/3] sm:aspect-auto'>
                <img 
                  src={item.show.movie.poster_path} 
                  alt={item.show.movie.title} 
                  className='w-full h-full object-cover'
                />
              </div>

             
              <div className='flex flex-col sm:flex-row flex-1 p-5 gap-4 justify-between'>
                
               
                <div className='flex flex-col justify-between gap-4'>
                  <div>
                    <h2 className='text-xl font-bold text-white tracking-tight leading-tight'>{item.show.movie.title}</h2>
                    <p className='text-gray-400 text-xs mt-1.5'>Runtime: {item.show.movie.runtime} mins</p>
                    <p className='text-gray-500 text-[11px] mt-1 italic'>Order ID: #{index + 1024}</p>
                  </div>
                  
                  <div>
                    <p className='text-[#FF4D67] font-semibold text-sm bg-[#FF4D67]/10 px-3 py-1 rounded-md inline-block'>
                      {new Date(item.show.showDateTime).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      }).replace(',', ' |')}
                    </p>
                  </div>
                </div>

                <div className='flex flex-col justify-between items-start sm:items-end text-left sm:text-right gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-4 shrink-0 min-w-[140px]'>
                  <div className='w-full'>
                    <div className='flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 justify-between'>
                      <p className='text-2xl font-black text-white'>{currency}{item.amount}</p>
                      {!item.isPaid && (
                        <button className='bg-[#FF4D67] hover:bg-[#e63e58] text-white px-4 py-1.5 text-xs rounded-full font-bold transition-all duration-200 active:scale-95 shadow-md shadow-[#FF4D67]/20 cursor-pointer'>
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>

                  <div className='text-xs space-y-0.5 text-gray-400 w-full'>
                    <p><span className='text-gray-500'>Tickets:</span> <strong className='text-white font-semibold'>{item.bookedSeats.length}</strong></p>
                    <p className='truncate max-w-[180px] sm:max-w-[140px]'>
                      <span className='text-gray-500'>Seats:</span> <strong className='text-white font-semibold'>{item.bookedSeats.join(', ')}</strong>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : <Loading />;
};

export default MyBookings;