import { Inngest } from "inngest";
import User from "../models/User.js";


export const inngest = new Inngest({
  id: "movie-ticket-booking",
});

// 
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;

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


const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      const { id } = event.data;

      console.log("Deleting user:", id);

      await User.findByIdAndDelete(id);

      console.log("User deleted:", id);
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  }
);


const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;

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

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
];