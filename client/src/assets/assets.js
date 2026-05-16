import logo from './logo.svg'
import marvelLogo from './marvelLogo.svg'
import googlePlay from './googlePlay.svg'
import appStore from './appStore.svg'
import screenImage from './screenImage.svg'
import profile from './profile.png'

export const assets = {
    logo,
    marvelLogo,
    googlePlay,
    appStore,
    screenImage,
    profile
}

export const dummyTrailers = [
    {
        image: "https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=WpW36ldAqnM'
    },
    {
        image: "https://img.youtube.com/vi/-sAOWhvheK8/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=-sAOWhvheK8'
    },
    {
        image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y'
    },
    {
        image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=umiKiW4En9g'
    },
]

const dummyCastsData = [
    { "name": "Milla Jovovich", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Dave Bautista", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Arly Jover", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Amara Okereke", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", },
    { "name": "Fraser James", "profile_path": "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg", },
    { "name": "Deirdre Mullins", "profile_path": "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg", },
    { "name": "Sebastian Stankiewicz", "profile_path": "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg", },
    { "name": "Tue Lunding", "profile_path": "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg", },
    { "name": "Jacek Dzisiewicz", "profile_path": "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg", },
    { "name": "Ian Hanmore", "profile_path": "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg", },
    { "name": "Eveline Hall", "profile_path": "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg", },
    { "name": "Kamila Klamut", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Caoilinn Springall", "profile_path": "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg", },
    { "name": "Jan Kowalewski", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Pawel Wysocki", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Simon Lööf", "profile_path": "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg", },
    { "name": "Tomasz Cymerman", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", }
]

export const dummyShowsData = [
  {
    "_id": "324544",
    "id": 324544,
    "title": "In the Lost Lands",
    "overview": "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness...",
    "poster_path": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80",
    "genres": [{ "id": 28, "name": "Action" }],
    "vote_average": 6.4,
    "showPrice": 59,
    "showDateTime": "2025-06-30T02:30:00.000Z"
  },
  {
    "_id": "1232546",
    "id": 1232546,
    "title": "Until Dawn",
    "overview": "One year after her sister Melanie mysteriously disappeared...",
    "poster_path": "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&w=500&q=80",
    "genres": [{ "id": 27, "name": "Horror" }],
    "vote_average": 6.4,
    "showPrice": 81,
    "showDateTime": "2025-06-30T15:30:00.000Z"
  },
  {
    "_id": "552524",
    "id": 552524,
    "title": "Lilo & Stitch",
    "overview": "The wildly funny and touching story of a lonely Hawaiian girl...",
    "poster_path": "https://images.unsplash.com/photo-1608889174637-3c44f6326f20?auto=format&fit=crop&w=500&q=80",
    "genres": [{ "id": 10751, "name": "Family" }],
    "vote_average": 7.1,
    "showPrice": 81,
    "showDateTime": "2025-06-30T03:30:00.000Z"
  },
  {
    "_id": "668489",
    "id": 668489,
    "title": "Havoc",
    "overview": "When a drug heist swerves lethally out of control...",
    "poster_path": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80",
    "genres": [{ "id": 28, "name": "Action" }],
    "vote_average": 6.5,
    "showPrice": 81,
    "showDateTime": "2025-07-15T16:30:00.000Z"
  },
  {
    "_id": "950387",
    "id": 950387,
    "title": "A Minecraft Movie",
    "overview": "Four misfits find themselves struggling with ordinary problems...",
    "poster_path": "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=500&q=80",
    "genres": [{ "id": 12, "name": "Adventure" }],
    "vote_average": 6.5,
    "showPrice": 49,
    "showDateTime": "2025-06-05T15:30:00.000Z"
  },
  {
    "_id": "575265",
    "id": 575265,
    "title": "Mission: Impossible",
    "overview": "Ethan Hunt and team continue their search...",
    "poster_path": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=500&q=80",
    "genres": [{ "id": 28, "name": "Action" }],
    "vote_average": 7.0,
    "showPrice": 79,
    "showDateTime": "2025-06-20T16:00:00.000Z"
  }
];

export const dummyDateTimeData = {
    "2025-07-24": [
        { "time": "2025-07-24T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd1" },
        { "time": "2025-07-24T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd2" },
        { "time": "2025-07-24T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd3" }
    ],
    "2025-07-25": [
        { "time": "2025-07-25T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd4" },
        { "time": "2025-07-25T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd5" },
        { "time": "2025-07-25T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd6" }
    ],
    "2025-07-26": [
        { "time": "2025-07-26T01:00:00.000Z", "showId": "68395b407f6329be2bb45bd7" },
        { "time": "2025-07-26T03:00:00.000Z", "showId": "68395b407f6329be2bb45bd8" },
        { "time": "2025-07-26T05:00:00.000Z", "showId": "68395b407f6329be2bb45bd9" }
    ],
    "2025-07-27": [
        { "time": "2025-07-27T01:00:00.000Z", "showId": "68395b407f6329be2bb45bda" },
        { "time": "2025-07-27T03:00:00.000Z", "showId": "68395b407f6329be2bb45bdb" },
        { "time": "2025-07-27T05:00:00.000Z", "showId": "68395b407f6329be2bb45bdc" }
    ]
}

export const dummyDashboardData = {
  totalBookings: 14,
  totalRevenue: 1517,
  totalUser: 5,

  activeShows: [
  {
  _id: "1",
  movie: {
    title: "In the Lost Lands",
    poster_path:
      "https://image.tmdb.org/t/p/w500/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
    vote_average: 8.2,
  },
  showDateTime: "2025-06-30T02:30:00.000Z",
  showPrice: 59,
  occupiedSeats: {},
},

{
  _id: "2",
  movie: {
    title: "Captain America: Brave New World",
    poster_path:
      "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    vote_average: 7.5,
  },
  showDateTime: "2025-06-30T15:30:00.000Z",
  showPrice: 81,
  occupiedSeats: {},
},
    {
      _id: "3",
      movie: {
        title: "Avatar 3",
        poster_path:
          "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        vote_average: 8.5,
      },
      showDateTime: "2025-06-30T03:30:00.000Z",
      showPrice: 81,
      occupiedSeats: {},
    },

    {
      _id: "4",
      movie: {
        title: "Gladiator II",
        poster_path:
          "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
        vote_average: 7.8,
      },
      showDateTime: "2025-07-15T16:30:00.000Z",
      showPrice: 81,
      occupiedSeats: {},
    },

    {
      _id: "5",
      movie: {
        title: "Wicked",
        poster_path:
          "https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg",
        vote_average: 8.0,
      },
      showDateTime: "2025-06-05T15:30:00.000Z",
      showPrice: 49,
      occupiedSeats: {},
    },

    {
      _id: "6",
      movie: {
        title: "Interstellar",
        poster_path:
          "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        vote_average: 8.9,
      },
      showDateTime: "2025-06-20T16:00:00.000Z",
      showPrice: 79,
      occupiedSeats: {},
    },
  ],
}

export const dummyBookingData = [
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 98,
        "bookedSeats": ["D1", "D2"],
        "isPaid": false,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 49,
        "bookedSeats": ["A1"],
        "isPaid": true,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-06-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 147,
        "bookedSeats": ["A1", "A2","A3"],
        "isPaid": true,
    },
]