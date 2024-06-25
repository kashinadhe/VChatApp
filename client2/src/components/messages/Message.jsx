import React from 'react'
import { useConversation } from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

export default function Message({ message }) {

  const { authUser } = useAuthContext();

  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const chatClassname = fromMe ? "chat-end" : "chat-start";
  const bubbleColor = fromMe ? "bg-blue-500" : "";

  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;

  const newMessageShake = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassname}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Chat bubble component" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleColor} ${newMessageShake}`}>{message.message}</div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>{message.createdAt}</div>
    </div>
  )
}
