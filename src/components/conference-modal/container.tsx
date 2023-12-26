"use client";

import { conferenceModalAtom } from "@/store/atoms";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { useDragControls, useMotionValue, useTransform } from "framer-motion";
import ConferenceModal from "./modal";

const ModalContainer = () => {
  const [modalState, setModalState] = useRecoilState(conferenceModalAtom);
  const modalContainerRef = useRef(null);
  const dragControls = useDragControls()
  const widthMotionValue = useMotionValue(300)
  const heightMotionValue = useMotionValue(300)

  const width = useTransform(widthMotionValue, (latest) => `${latest}px`);
  const height = useTransform(heightMotionValue, (latest) =>  `${latest}px`);

  const initialDims = useRef({width: widthMotionValue.get(), height: heightMotionValue.get(), isResizing: false})

  const onPanStart = (e: any, info: any) => {
    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
      isResizing: true
    };
  }
  const onPan= (e: any, info: any) => {
    widthMotionValue.set(initialDims.current.width + info.offset.x)
    heightMotionValue.set(initialDims.current.height + info.offset.y)
  }

  const onPanEnd = (e: any, info: any) =>  initialDims.current = {
    width: widthMotionValue.get(),
    height: heightMotionValue.get(),
    isResizing: true
  }

  const handleDrag = (e: any, info?: any) => {
    console.log({e, info})
    dragControls.start(e)
  }
  
  const modalProps = {
    width,
    height,
    dragControls,
    onPanStart,
    onPan,
    onPanEnd,
    handleDrag,
    ref: modalContainerRef
  }

  return modalState.open && <ConferenceModal {...modalProps}/> 
};

export default ModalContainer;
