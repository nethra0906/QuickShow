# QuickShow - Full Stack Movie Ticket Booking Platform

QuickShow is a production-ready full-stack web application engineered to simulate a real-world movie ticket booking system. The platform seamlessly pairs a highly responsive, cinematic frontend interface with a scalable backend microservice architecture capable of managing movies, granular seat configurations, user profiles, and concurrent showtime reservations.

---

## Features

### User Experience & Frontend
* **Visual Movie Catalog**: Richly styled interface for exploring trending and upcoming movies with visual media grids, genre classification, and showtimes[cite: 1].
* **Detailed Movie Profiles**: Specialized dynamic routes displaying deep insights into individual films, including synopses, running times, and publication states[cite: 1].
* **Interactive Seat Selector**: A fluid matrix interface mapping auditorium layouts to manage actual seat states in real-time (available, selected, reserved)[cite: 1].
* **Favorites Registry**: Persistence layers allowing authenticated users to catalog specific titles to a personal watchlist for expedited tracking[cite: 1].
* **Responsive Layout**: Device-agnostic scaling using mobile-first breakpoints to guarantee desktop-class user patterns on compact screens[cite: 1].

### Authentication & Session Management
* **Clerk Integration**: Secure identity verification utilizing Clerk to support passwordless email links, traditional credentials, and social OAuth flows[cite: 1].
* **Session Persistence**: State providers tracking token validation across programmatic page transitions and page refreshes[cite: 1].
* **Route Protection**: Declarative middleware blocks shielding secure parameters from unauthenticated access attempt vectors[cite: 1].

### Backend Infrastructure
* **RESTful API Service**: Organized routing architectures separating controller execution from data transport schemas across movies, users, and booking domains[cite: 1].
* **Concurrency Control**: Logic layers governing showtime seat grids to block race conditions during double-booking selections[cite: 1].
* **Data Persistence**: Strict database validation constraints mapping object fields reliably across transactional requests[cite: 1].

---

## Tech Stack

### Frontend Architecture
* **React & Vite**: Ultra-fast bundle orchestration and development compilation utilizing Hot Module Replacement (HMR)[cite: 1].
* **React Router DOM**: Declarative client-side routing engines supporting nested structures and secure route boundaries[cite: 1].
* **Tailwind CSS & PostCSS**: Utility-first CSS compiling with dead-code elimination to achieve minimal bundle delivery overhead[cite: 1].
* **Lucide React Icons**: Scalable vector layout icons supporting clean user interface aesthetics[cite: 1].
* **React Hot Toast**: Non-blocking toast alert components delivering immediate background process feedback[cite: 1].

### Backend Architecture
* **Node.js & Express.js**: Asynchronous event-driven architecture orchestrating routing layers, request parsing, and custom middleware flows[cite: 1].
* **MongoDB & Mongoose**: High-performance document modeling schema tools abstracting application properties to backend collections (easily configurable for SQL environments)[cite: 1].
* **JSON Web Tokens (JWT)**: Cryptographic token distribution verifying active identity signatures directly against session validation tiers[cite: 1].

---

## Project Structure

```txt
QuickShow/
├── client/                     # Frontend Context (React + Vite)
│   ├── src/
│   │   ├── assets/             # Application vectors, master branding elements, and static collections
│   │   ├── components/         # Shared global controls (Navbar, Footer) and structural layout wrappers
│   │   ├── pages/              # High-level route targets (Home, Movies, MovieDetails, SeatLayout)
│   │   ├── App.jsx             # Structural client mapping routing boundaries
│   │   ├── main.jsx            # Application bootstrap mounting entry context
│   │   └── index.css           # Global Tailwind utilities and target typography modifications
│   ├── public/                 # Favicons, metadata contexts, and binary background targets
│   ├── .env                    # Inbound client environment key parameters
│   ├── eslint.config.js        # Code quality rule declarations and syntax definitions
│   ├── postcss.config.js       # Production style bundle processing adjustments
│   └── vite.config.js          # Module aliasing, port bindings, and proxy target rules
│
├── server/                     # Backend Application (Node + Express)
│   ├── config/                 # Connection handlers for Mongo clusters and external system contexts
│   ├── controllers/            # Pure business logic modules handling inbound operational streams
│   ├── middleware/             # Request parsers, traffic checks, and auth header validators
│   ├── models/                 # Database mapping blueprints outlining documents constraints
│   ├── routes/                 # Explicit URI path registries assigning operations to controllers
│   └── server.js               # Primary service initializer and listener pipeline
│
└── README.md                   # Project documentation
