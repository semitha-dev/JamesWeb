'use client'

import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";

const Home: React.FC = () => {
  const [name , setName] = useState('');
  const [message , setMessage] = useState('');
  const [broadcast , setBroadcast] = useState<string[]>([]); // Ensure it's an array
  const [socket , setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance);

    // Handle broadcast messages
    socketInstance.on('broadcast', (data) => {
      setBroadcast((prevBroadcast) => [...prevBroadcast, data]); // Append new message
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket){
      socket.emit('message' , {name , message});
    }
  };

  return (
    <div>

      <h1 className=" text-white bg-slate-400 flex justify-center text-3xl p-3">WhatsUp Messanger</h1>
      
      <div className="flex justify-center items-center bg-slate-400 mt-16 w-96 mx-auto h-56 flex-col 
        text-black rounded">
          <label>Name : </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2 p-2 rounded"
          /><br></br>
          <label>Message : </label>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mr-2 p-2 rounded"
          /><br></br>
          
          <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded">Send</button>
        </div>


      <h1 className=" flex justify-center bg-slate-400 mt-6">Broadcast Messages:</h1>
      <ul className="flex justify-center flex-col items-center">
        {broadcast.map((msg, index) => (
          <li className="bg-slate-400 m-2 w-96  h-20 rounded-md p-2" key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
