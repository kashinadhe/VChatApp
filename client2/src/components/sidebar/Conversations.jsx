import React from 'react'
import Conversation from './Conversation'
import { useGetConversations } from '../../hooks/useGetConversations';

export default function Conversations() {

  const { loading, conversations } = useGetConversations();
  return (
    <div className='overflow-y-scroll'>
      {conversations.map((conversation, idx) => (
        <Conversation key={conversation._id}
          conversation={conversation}
          lastIndex={idx === conversations.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner'></span> : null}
    </div>
  )
}
