
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
