'use client'

import React from 'react'

// components
import Chatbox from './chatbox'

// dummy data
import { messages } from "./data";

// store
import { useRecoilState } from 'recoil';
import { chatDrawerAtom, conferenceModalAtom } from '@/store/atoms';

const ChatboxContainer = () => {
    const [showChatBox, setShowChatBox] = useRecoilState(chatDrawerAtom)
    const [modalState, setModalState] = useRecoilState(conferenceModalAtom)

    const dockSidebar = () => {
        setShowChatBox(true)
    }

    const props = {
        open: showChatBox,
        onDock: dockSidebar,
        messages: messages,
        title: "Chats",
        openConferenceModal: () => setModalState(prev => ({...prev, open: true}))
    }

  return (
    <Chatbox {...props}/>
  )
}

export default ChatboxContainer