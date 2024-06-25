// import { create } from 'zustand';

// // Zustand is used to provide a set of multiple useStates
// export const useConversation = create((set) => ({
//     selectedConversation: null,
//     setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
//     messages: [],
//     setMessages: (messages) => set({ messages }),
// }));


import { create } from "zustand";

export const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));
