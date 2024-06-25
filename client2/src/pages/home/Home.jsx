import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import MessageContainer from '../../components/messages/MessageContainer'

export default function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-1g bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <SideBar/>
        <MessageContainer/>
    </div>
  )
}
