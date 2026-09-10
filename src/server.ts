import app from "./app";
import { connectDb } from "./config/db";


const PORT = process.env.PORT || 5000;
const server = ()=>{
    connectDb();
    app.listen(PORT,()=>{
        console.log("Server is running at port 3000")
    })
}

server();