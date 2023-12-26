import React, { forwardRef } from "react";
import { DragControls, MotionValue, motion } from "framer-motion";
import { IoMdResize } from "react-icons/io";
import { RiDragMove2Fill } from "react-icons/ri";

type modalPropType = {
  width: MotionValue<string>;
  height: MotionValue<string>;
  dragControls: DragControls;
  onPanStart: (e: any, info: any) => void;
  onPan: (e: any, info: any) => void;
  onPanEnd: (e: any, info: any) => void;
  handleDrag: (e: any, info?: any) => void;
};

const ConferenceModal = forwardRef((props: modalPropType, ref: any) => {
  const { width, height, dragControls, onPanStart, onPan, onPanEnd, handleDrag } = props;
  return (
    <div
      className="absolute z-[1000] left-0 top-0 right-0 bottom-0 bg-transparent w-screen h-screen flex justify-center items-center before:content-[''] before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:bg-black before:opacity-50 before:z-[1000]"
      ref={ref}>
      <motion.div
        id="conderence-modal"
        drag
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        dragConstraints={ref}
        dragElastic={0.7}
        style={{ touchAction: "none", width, height }}
        className="p-10 rounded-xl shadow-lg bg-white z-[1500] opacity-100 pointer-events-auto relative">
        Some content here
        <RiDragMove2Fill className="absolute z-[1600] right-0 top-0 m-2 cursor-pointer h-3 w-3" onMouseDown={handleDrag} onTouchStart={handleDrag} />
        <motion.div onPanStart={onPanStart} onPan={onPan} onPanEnd={onPanEnd} className="absolute z[1600] right-0 bottom-0 m-2 cursor-pointer">
          <IoMdResize className="-rotate-90 h-2 w-2" />
        </motion.div>
      </motion.div>
    </div>
  );
});

ConferenceModal.displayName = "ConferenceModal"; // Add display name

export default ConferenceModal;
