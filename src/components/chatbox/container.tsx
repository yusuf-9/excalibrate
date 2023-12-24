'use client'

import React from 'react'

// components
import Chatbox from './chatbox'

// dummy data
import { messages } from "./data";

// store
import { useRecoilState } from 'recoil';
import { chatDrawerAtom } from '@/store/atoms';

const ChatboxContainer = () => {
    const [showChatBox, setShowChatBox] = useRecoilState(chatDrawerAtom)

    const toggleChatBox = () => {
        setShowChatBox(!showChatBox)
    }

    const props = {
        open: showChatBox,
        onClose: toggleChatBox,
        messages: messages,
        title: "Chats"
    }

  return (
    <Chatbox {...props}/>
  )
}

export default ChatboxContainer