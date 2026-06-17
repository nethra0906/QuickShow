
import Show from "../models/Show.js"

const checkSeatsAvailability = async(showId, selectedSeats) =>
{
    try
    {
        const showData = await Show.findById(showId)
        if(!showData) 
        {
            return false;
        }

        const occupiedSeats = showData.occupiedSeats;
        const isAnySeatOccupied = selectedSeats.some(seat => occupiedSeats[seat]);
        
        return !isAnySeatOccupied;
    }

    catch(error)
    {
        console.log(error.message)

        return false;
    }
}

export const createBooking = async (req, res) =>
{
    try 
    {
        const {userId} = req.auth();
        const {showId, selectedSeats} = req.body;
        const {origin} = req.headers;

        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

        if(!isAvailable)
        {
            return res.json({success: false, error: "Selected seats are not available"})
        }

        const showData = await Show.findById(showId).populate("movie");
        const booking = await Booking.create({
            user: userId, 
            show: showId, 
            amount: showData.price * selectedSeats.length, 
            bookedSeats: selectedSeats
        });

        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId;
        });

        showData.markModified("occupiedSeats");
        await showData.save();

        res.json({success: true, message: "Booking created successfully"})
    }

    catch(error)
    {
        console.log(error.message)
        return res.status(500).json({success: false, error: "Internal server error"})
    }
}

export const getOccupiedSeats = async (req, res) =>
{
    try
    {
        const {showId} = req.params;
        const showData = await Show.findById(showId);

        const occupiedSeats = Object.keys(showData.occupiedSeats);

        if(!showData)
        {
            return res.json({success: false, error: "Show not found"})
        }

        res.json({success: true, occupiedSeats: occupiedSeats})
    }

    catch(error)
    {
        console.log(error.message);

        return res.status(500).json({success: false, error: "Internal server error"})
    }
}