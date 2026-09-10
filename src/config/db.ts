import mongoose from "mongoose"
 export const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Error connecting to database:", err);
    }
   
}