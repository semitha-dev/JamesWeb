'use client'

import Link from "next/link";
import React, { useEffect, useState } from 'react';
import axios from "axios";

interface Message {
  content: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getPosts");
        setMessages(response.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h3>Home</h3>
      <ul className="flex flex-col items-center"> {/* Center align messages */}
        {messages.map((message, index) => (
          <li key={index} className="text-white flex flex-col justify-between items-start m-3 rounded bg-slate-400 max-w-md w-full p-4"> {/* Changed justify-center to justify-between */}
            <p className="mb-2">{message.content}</p> {/* Added margin bottom for spacing */}
            <small className="self-end">{new Date(message.createdAt).toLocaleString()}</small> {/* Aligned date to the right */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
