"use client";

import { conferenceModalAtom } from "@/store/atoms";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

const ModalContainer = () => {
  const [modalState, setModalState] = useRecoilState(conferenceModalAtom);
  const modalContainerRef = useRef(null);

  const handleHideModal = (e: any) => {
    // setModalState({ ...modalState, open: false })
  };

  return (
    modalState.open && (
      <>
        <div
          onClick={handleHideModal}
          className="absolute z-[1000] left-0 top-0 right-0 bottom-0 bg-black opacity-20 w-screen h-screen"
          ref={modalContainerRef}></div>
        <motion.div
          id="conderence-modal"
          drag
          dragMomentum={false}
          dragConstraints={modalContainerRef}
          className="absolute p-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg bg-white z-[1500] opacity-100">
          Some content here
        </motion.div>
      </>
    )
  );
};

export default ModalContainer;
