import { useUser } from '@/hooks'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import isEmpty from "lodash/isEmpty"

// react player
import ReactPlayer from 'react-player'
import Microphone from '@/lib/microphone'

type streamType = {
  [key: string]: {
    stream: MediaStream | null
    name: string
  }
}


const ConferenceContainer = () => {
  const [participants, setParticipants] = useState([])
  const [streams, setStreams] = useState<streamType>({})
  const microphones = useRef<{[key: string] : Microphone}>({})
  const {user, collaboraters} = useUser()

  const getUserMediaStream = useCallback(async () => {
    try {
      const userStream = await window.navigator?.mediaDevices?.getUserMedia({
        audio: true,
        video: false,
      })
      const streamData = {
        stream: userStream,
        name: user?.name!,
      }
      setStreams(prev => ({ ...prev, [user?.socketId!]: streamData }))
      const userMic = new Microphone(userStream)
      microphones.current[user?.socketId!] = userMic;
    } catch(err) {
      alert(err)
    }
  }, [user?.socketId, user?.name])

  

  return isEmpty(streams) ? (
    <div className="flex items-center justify-center h-full">
      <button
        className="bg-accent-dark rounded-lg px-4 py-2 text-white font-bold active:bg-accent-light"
        onClick={getUserMediaStream}
      >
        Start
      </button>
    </div>
  ) : (
    <div className="grid h-full">
      {Object?.entries(streams)?.map(([socketId, {stream, name}]) => (
        <div key={socketId} className="flex flex-col items-center justify-center bg-green border border-contrast-light h-full w-full">
          <ReactPlayer url={stream as MediaStream} height={'1%'} width={'1%'} playing style={{ position: "absolute", left: 0, top: 0}} />
          <div className='p-6 rounded-full border border-black/20'>
          <span className='flex justify-center items-center bg-teal-500 rounded-full text-white text-center p-10 py-12'>{name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConferenceContainer