// // // pages/api/socket.js
// // import { Server } from "socket.io";
// // import fetch from 'node-fetch';

// // export default async function handler(req, res) {

// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader("Access-Control-Allow-Methods", "*");
// //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
// //   res.setHeader("Access-Control-Allow-Credentials", "true");



// //   if (!res.socket.server.io) {

// //     console.log("Setting up socket.io server..."

// //     );

// //     const httpServer = res.socket.server;

// //     const io = new Server(httpServer, {
// //   // Example options:
// //         cors: {
// //             origin: "*", // Allow connections from any origin (for demonstration purposes)
// //             methods: "*" // Allow only GET and POST requests
// //         } // Use only WebSocket transport
// //         });

// //     io.on("connection", (socket) => {
// //       console.log("Client connected");

// //       // Example: Receiving data from client
// //       socket.on("flutterData", async (data) => {
// //         console.log("Received data from flutter:", data);

// //         // const ordernum = dailyOrderCount
// //         // data.ordernum = ordernum
// //         // Example: Save data to database via API
// //         await fetch('api/orders', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(data),
// //         });

// //         // Emit event to WebSocket clients (including Next.js client)
// //         io.emit('orderReceived ', data);
// //       });
// //     });

// //     res.socket.server.io = io;
// //   }
 
// //   res.end();
// // }


// import { Server } from 'socket.io'
// console.log("in route of socket")
// const SocketHandler = (req, res) => {
//     console.log("Int socket handler")
//   if (res.socket.server.io) {
//     console.log('Socket is already running')
//   } else {
//     console.log('Socket is initializing')
//     const io = new Server(res.socket.server)
//     res.socket.server.io = io
//   }
//   res.end()
// }

// export default SocketHandlers


// import { Server } from "socket.io";
// import cors from 'cors';

// Create a new instance of the CORS middleware
// const corsMiddleware = cors();

// export default function SocketHandler(req, res) {
//     if (res.socket.server.io) {
//         console.log("Already set up");
//         res.end();
//         return;
//     }

//     const io = new Server(res.socket.server, {
//         path: "/api/socket",
//         addTrailingSlash: false,
//         origin:"*"
//     });

//     // Event handler for client connections
//     io.on('connection', (socket) => {
//         const clientId = socket.id;
//         console.log('A client connected');
//         console.log(`A client connected. ID: ${clientId}`);
//         io.emit('client-new', clientId);

//         // Event handler for receiving messages from the client
//         socket.on('message', (data) => {
//             console.log('Received message:', data);
//         });

//         // Event handler for client disconnections
//         socket.on('disconnect', () => {
//             console.log('A client disconnected.');
//         });
//     });

//     // Apply the CORS middleware to the request and response
//     corsMiddleware(req, res, () => {
//         res.socket.server.io = io;
//         res.end();
//     });
// }

// client side
 /* <button onClick={socketInitializer} className='text-white'>click me</button> */
  // let socket
    // const socketInitializer = async () => {
    //   await fetch('/api/socket')
    //   socket = io()
  
    //   socket.on('connect', () => {
    //     console.log('connected')
    //   })
    // }