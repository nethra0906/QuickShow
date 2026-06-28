import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

export const inngest = new Inngest({
  id: "movie-ticket-booking",
});

// ================= CREATE USER =================

const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    trigger: {
      event: "clerk/user.created",
    },
  },
  async ({ event }) => {
    try {
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
      } = event.data;

      await User.create({
        _id: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
        image: image_url,
      });

      console.log("User created:", id);
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  }
);

// ================= DELETE USER =================

const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    trigger: {
      event: "clerk/user.deleted",
    },
  },
  async ({ event }) => {
    try {
      const { id } = event.data;

      await User.findByIdAndDelete(id);

      console.log("User deleted:", id);
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }
);

// ================= UPDATE USER =================

const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    trigger: {
      event: "clerk/user.updated",
    },
  },
  async ({ event }) => {
    try {
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
      } = event.data;

      await User.findByIdAndUpdate(
        id,
        {
          email: email_addresses?.[0]?.email_address,
          name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          image: image_url,
        },
        { new: true }
      );

      console.log("User updated:", id);
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  }
);

// ================= RELEASE SEATS IF PAYMENT FAILS =================

const releaseSeatsAndDeleteBooking = inngest.createFunction(
  {
    id: "release-seats-delete-booking",
    trigger: {
      event: "app/checkpayment",
    },
  },
  async ({ event, step }) => {
    // Wait 10 minutes
    const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);

    await step.sleepUntil(
      "wait-for-10-minutes",
      tenMinutesLater
    );

    await step.run("check-payment-status", async () => {
      const bookingId = event.data.bookingId;

      const booking = await Booking.findById(bookingId);

      if (!booking) {
        console.log("Booking not found.");
        return;
      }

      // Booking already paid
      if (booking.isPaid) {
        console.log("Payment completed.");
        return;
      }

      const show = await Show.findById(booking.show);

      if (!show) {
        console.log("Show not found.");
        return;
      }

      booking.bookedSeats.forEach((seat) => {
        delete show.occupiedSeats[seat];
      });

      show.markModified("occupiedSeats");
      await show.save();

      await Booking.findByIdAndDelete(booking._id);

      console.log("Seats released and booking deleted.");
    });
  }
);

// ================= EXPORT =================

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  releaseSeatsAndDeleteBooking,
];
