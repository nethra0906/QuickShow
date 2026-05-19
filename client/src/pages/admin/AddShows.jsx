import React from 'react'
import { useState, useEffect } from 'react'
import Title from '../../components/admin/Title'
import Loading from '../../components/Loading'
import BlurCircle from '../../components/BlurCircle'
import { dummyShowsData } from '../../assets/assets'

const AddShows = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])  
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [dateTimeInput, setDateTimeInput] = useState('')
  const [showPrice, setShowPrice] = useState('')

  const getNowPlayingMovies = async () => {

    setNowPlayingMovies(dummyShowsData)
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return (
    <div>

    </div>
  )


}

export default AddShows