import express from "express";
import {getFavorites, getUserBookings, updateFavorite} from "../controllers/"

const userRouter = express.Router();

userRouter.get('/bookings', getUserBookings)
userRouter.post('/update-favorite', updateFavorites)
userRouter.gett('/favorites', getFavorites)

export default userRouter