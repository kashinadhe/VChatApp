import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversation } from "../zustand/useConversation";
import notification from "../assets/sounds/notification.mp3";

export const useListenMessages = () => {
    const { socket } = useSocketContext();

    const { messages, setMessages } = useConversation();

    useEffect(() => {
        //listening to the "newMessage" event
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
            const sound = new Audio(notification);
            sound.play();
        });

        return () => socket?.off("newMessage");
    }, [socket, messages, setMessages]);
}