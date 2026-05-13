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
    <div className='relative px-6 md:px-16 lg:px-40 pt-32 md:pt-40 min-h-[80vh] text-white'>
      <BlurCircle top="100px" left="100px" />
      
      <h1 className='text-2xl font-bold mb-8'>My Bookings</h1>

      <div className='flex flex-col gap-4'>
        {bookings.map((item, index) => (
          <div 
            key={index} 
            className='flex flex-row bg-white/5 border border-white/10 rounded-xl overflow-hidden max-w-2xl transition-hover hover:border-primary/50'
          >
            {/* SMALLER IMAGE CONTAINER */}
            <div className='w-32 h-auto md:w-48 shrink-0'>
              <img 
                src={item.show.movie.poster_path} 
                alt={item.show.movie.title} 
                className='w-full h-full object-cover'
              />
            </div>

            {/* TEXT DETAILS */}
            <div className='flex flex-col p-4 justify-between'>
              <div>
                <p className='text-lg font-bold text-white'>{item.show.movie.title}</p>
                <p className='text-gray-400 text-sm mt-1'>Runtime: {item.show.movie.runtime} mins</p>
                <p className='text-gray-400 text-xs mt-2 italic'>Order ID: #{index + 1024}</p>
              </div>
              
              <div className='mt-4'>
                <p className='text-primary font-medium text-sm'>
                  {new Date(item.show.showDateTime).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : <Loading />;
};

export default MyBookings;