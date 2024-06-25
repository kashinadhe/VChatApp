import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import { useSendMessage } from '../../hooks/useSendMessage';

export default function MessageInput() {

  const { loading, sendMessage } = useSendMessage();

  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage) return;

    await sendMessage(newMessage);

    setNewMessage("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="px-4 my-3">
        <div className="w-full relative">
          <input type="text"
            className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
            placeholder='Send a message'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} />
          <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span> : <BsSend />}
          </button>
        </div>
      </form>
    </div>
  )
}
