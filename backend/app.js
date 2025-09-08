import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { Server } from "socket.io"
import {cache} from "./Cache/cache.js"
import {createServer} from "http"

const app=express()

app.use(cors({
    origin:"*",
}))

app.use(cookieParser());

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));



app.use((req, res, next) => {
    console.log(req.method, req.ip);
    next();
})


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:"*",
});

io.on("connection", (socket) => {
    socket.on("busId",(payload)=>{
        console.log(payload);

    cache.set(payload.id, payload);
    console.log(cache);
    console.log(`busLocation-${payload.id}`)
    io.emit(`busLocation-${payload.id}`,payload)})

    socket.on("panicAlarm",(payload)=>{
        socket.broadcast.emit("sendAlarm",payload)
    })

    socket.on("count",(payload)=>{
        io.emit("sendCountPassenger",{countPassenger:payload.countPassenger})
    })

    // New seat booking events
    socket.on("seatBooked", (payload) => {
        console.log("Seat booked:", payload);
        io.emit("seatStatusUpdate", {
            busId: payload.busId,
            seatNumber: payload.seatNumber,
            status: "occupied",
            timestamp: payload.timestamp
        });
    });

    socket.on("seatCancelled", (payload) => {
        console.log("Seat cancelled:", payload);
        io.emit("seatStatusUpdate", {
            busId: payload.busId,
            seatNumber: payload.seatNumber,
            status: "available",
            timestamp: payload.timestamp
        });
    });

    // GPS simulation events
    socket.on("busLocationUpdate", (payload) => {
        console.log("Bus location updated:", payload);
        cache.set(`location-${payload.busId}`, payload);
        io.emit("busLocationUpdate", payload);
    });

});

//setting up routes
import busRouter from "./router/busRoute.js"
app.use("/api/v1",busRouter)


export default httpServer

