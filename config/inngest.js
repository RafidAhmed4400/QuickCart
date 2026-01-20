import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

/**
 * Sync user creation from Clerk → MongoDB
 */
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses?.[0]?.email_address ?? "",
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      imageUrl: image_url, // must be provided by Clerk
    };

    await connectDB();
    await User.create(userData);
  }
);

/**
 * Sync user updates from Clerk → MongoDB
 */
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      email: email_addresses?.[0]?.email_address ?? "",
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      imageUrl: image_url, // must be provided by Clerk
    };

    await connectDB();
    await User.findByIdAndUpdate(id, userData, { new: true });
  }
);

/**
 * Delete user from MongoDB when removed from Clerk
 */
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);

//Inngest function to create user order in database
export const createUserOrder = inngest.createFunction(
  {
    id:'create-user-order',
    batchEvents: {
      maxSize: 5,
      timeout: '5s'
    }
  },
  {event: 'order/created'},
  async({events}) => {
    const orders = events.map((event) =>{
      return{
        userId: event.data.userId,
        items: event.data.items,
        address: event.data.address,
        amount: event.data.amount,
        date: event.data.date
      }
    })

    await connectDB()
    await Order.insertMany(orders)

    return {success:true, processed: orders.length}
  }
)
