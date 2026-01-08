import { Inngest } from "inngest"; 
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events 
export const inngest = new Inngest({ id: "quickcart-next" });

//Inngest function to retrive user register data from clerk and making sure the data is saved in our database 
//makes use of inngest's event function system
export const syncUserCreation = inngest.createFunction(
    {
        id : 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async ({event}) => {        //destructure event
        const {id, first_name, last_name, email_addresses, imconstage_url} = event.data;
        const userData = {
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            ImageUrl : image_url

        }
        await connectDB();
        await User.create(userData);

    }
)


//inngest function to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id:"update-user-from-clerk",       
    },
    {
        event: 'clerk/user.updated'
    },
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, imconstage_url} = event.data;
        const userData = {
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            ImageUrl : image_url

        }
        await connectDB();
        await User.findByIdAndUpdate(id, userData)
    }
)

//Inngest function to delete user from the database
export const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},
    async ({event}) => {
        const {id} = event.data;
        connectDB();
        await User.findByIdAndDelete(id);
    }

)