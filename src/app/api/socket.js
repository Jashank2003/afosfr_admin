// pages/api/socket.js
import useOrderStore from '../../../../contexts/orderStore';
import { Server } from "socket.io";
import fetch from 'node-fetch';

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const { dailyOrderCount} = useOrderStore();

  if (!res.socket.server.io) {

    console.log("Setting up socket.io server..."

    );

    const httpServer = res.socket.server;

    const io = new Server(httpServer, {
  // Example options:
        cors: {
            origin: "*", // Allow connections from any origin (for demonstration purposes)
            methods: "*" // Allow only GET and POST requests
        },
        transports: ["websocket"] // Use only WebSocket transport
        });

    io.on("connection", (socket) => {
      console.log("Client connected");

      // Example: Receiving data from client
      socket.on("flutterData", async (data) => {
        console.log("Received data from flutter:", data);

        const ordernum = dailyOrderCount
        data.ordernum = ordernum
        // Example: Save data to database via API
        await fetch('api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // Emit event to WebSocket clients (including Next.js client)
        io.emit('orderReceived ', data);
      });
    });

    res.socket.server.io = io;
  }
 
  res.end();
}
