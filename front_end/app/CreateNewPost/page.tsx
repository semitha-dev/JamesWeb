'use client'

import { useState } from 'react';
import axios from 'axios';

const SendMessage = () => {
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/addPost', { content: message });
      setStatus('Message sent successfully');
      setMessage(''); // Clear the input
    } catch (error) {
      setStatus('Failed to send message {error}'); 
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl mb-20'>Create a Post </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className='border border-gray-300 p-2 w-96 h-32 text-black'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        ></textarea><br></br>
        <button type="submit" className='bg-green-600 p-2 pr-4 rounded-md'>Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SendMessage;
