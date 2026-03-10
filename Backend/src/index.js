import dotenv from "dotenv";
import connectDB from "./db/index.js"; // Ensure this file exists and is set up to connect to MongoDB
import { app } from "./app.js"; // Ensure this exports an Express app instance

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000; // Use PORT from .env or fallback to 8000
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });




// import express from "express";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";


// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on('error', (error)=>{
//             console.log('ERRROR: ' + error)
//             throw error;
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`listening on port  + ${process.env.PORT}`);
//         });
        
//     } catch (error) {
//         console.error("ERROR: " + error);
//         throw error;    
//     }
// })()