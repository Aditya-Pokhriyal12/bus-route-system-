import dotenv from "dotenv"
import httpServer from "./app.js"
import connectToDB from "./Database/db.js"
dotenv.config({
    path:"./.env"
})

connectToDB().then(()=>{
    const PORT = process.env.PORT || 3001;
    httpServer.listen(PORT,()=>{
        console.log(`Server running successfully on port ${PORT}`)
    })
}).catch((err)=>{
    console.log("Error in running server", err)
})

