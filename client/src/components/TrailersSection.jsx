import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'
import { dummyTrailers } from '../data/dummyTrailers'

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">

      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      <div className="relative mt-6 max-w-[960px] mx-auto">

        <BlurCircle
          top="50%"
          right="-220px"
        />

        <div className="relative z-10 aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${currentTrailer.id}?rel=0&modestbranding=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
          {dummyTrailers.map(trailer => (
            <div
              key={trailer.id}
              onClick={() => setCurrentTrailer(trailer)}
              className="relative cursor-pointer hover:-translate-y-1 transition duration-300"
            >
              <img
                src={trailer.image}
                alt="Trailer thumbnail"
                className="rounded-lg w-full h-32 md:h-36 object-cover brightness-75 hover:brightness-100 transition"
              />
              <PlayCircleIcon
                strokeWidth={1.6}
                className="
                  absolute top-1/2 left-1/2
                  w-10 h-10
                  -translate-x-1/2 -translate-y-1/2
                  text-white
                  opacity-0 hover:opacity-100
                  transition
                "
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TrailersSection


