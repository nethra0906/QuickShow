import mongoose from 'mongoose';

const ShowSchema = new mongoose.Schema({
    movie: { type: String, required: true , ref: 'Movie'},
    showDateTime: { type: Date, required: true },
    ShowPrice: { type: Number, required: true },
    occupiedSeats: { type: Object, required: true },
}, {minimize:false}
);

const Show = mongoose.model('Show', ShowSchema);

export default Show;