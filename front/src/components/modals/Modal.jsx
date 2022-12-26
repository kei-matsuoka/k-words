import { motion, AnimatePresence } from 'framer-motion'

export const Modal = ({children, onClick, isOpen}) => {
  return (
    <AnimatePresence>
      {isOpen &&
        <motion.div 
          className="flex flex-col items-center justify-center fixed top-0 z-40 left-0 w-full h-full bg-black bg-opacity-50"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
          onClick={onClick}
        >
          <div className="w-[480px] sp:w-11/12" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
