"use client";

import { conferenceModalAtom } from "@/store/atoms";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { motion, useDragControls, useMotionValue, useTransform } from "framer-motion";
import { IoMdResize } from "react-icons/io";
import { RiDragMove2Fill } from "react-icons/ri";

const ModalContainer = () => {
  const [modalState, setModalState] = useRecoilState(conferenceModalAtom);
  const modalContainerRef = useRef(null);
  const dragControls = useDragControls()
  const widthMotionValue = useMotionValue(300)
  const heightMotionValue = useMotionValue(300)

  const width = useTransform(widthMotionValue, (latest) => `${latest}px`);
  const height = useTransform(heightMotionValue, (latest) =>  `${latest}px`);
  

  const initialDims = useRef({width: widthMotionValue.get(), height: heightMotionValue.get(), x: 0, y: 0, isResizing: false})

  const handleHideModal = (e: any) => {
    // setModalState({ ...modalState, open: false })
  };

  const handleResizeStart = (event: any) => {
    console.log("resize start")
    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
      x: event.clientX,
      y: event.clientY,
      isResizing: true
    };
  }

  const handleResize = (event: any) => {
    console.log("resizing about to start")
    if(!initialDims.current.isResizing) return;
    console.log("resizing")
    const { width, height, x, y } = initialDims.current;
    const newWidth = width + (event.clientX - x);
    const newHeight = height + (event.clientY - y);
    widthMotionValue.set(newWidth)
    heightMotionValue.set(newHeight)

    console.log()
  }

  const handleResizeEnd = (event: any) => {
    console.log("resizing end")

    initialDims.current = {
      width: widthMotionValue.get(),
      height: heightMotionValue.get(),
      x: event.clientX,
      y: event.clientY,
      isResizing: false
    };
  }

  const handleDrag = (e: any, info?: any) => {
    console.log({e, info})
    dragControls.start(e)
  }

  return (
    modalState.open && (
      <>
        <div
          onClick={handleHideModal}
          onMouseMove={handleResize}
          className="absolute z-[1000] left-0 top-0 right-0 bottom-0 bg-transparent w-screen h-screen flex justify-center items-center before:content-[''] before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:bg-black before:opacity-50 before:z-[1000]"
          ref={modalContainerRef}>
            <motion.div
              id="conderence-modal"
              drag
              dragListener={false}
              dragControls={dragControls}
              dragMomentum={false}
              dragConstraints={modalContainerRef}
              onMouseMove={handleResize}
              // onPointerDown={handleDrag}
              // onTouchStart={handleDrag}
              dragPropagation={false}
              // onDrag={handleDrag}
              dragElastic={0.7}
              style={{touchAction: 'none', width, height}}
              className="p-10 rounded-xl shadow-lg bg-white z-[1500] opacity-100 pointer-events-auto relative">
              Some content here
              <RiDragMove2Fill className="absolute z-[1600] right-0 top-0 m-2 cursor-pointer h-3 w-3" onMouseDown={handleDrag} onTouchStart={handleDrag}/>
              <IoMdResize className="absolute z[1600] right-0 bottom-0 m-2 cursor-pointer -rotate-90 h-2 w-2" onMouseDown={handleResizeStart} onTouchStart={handleResizeStart} onMouseMove={handleResize} onMouseUp={handleResizeEnd}/>
            </motion.div>
        </div>
      </>
    )
  );
};

export default ModalContainer;
