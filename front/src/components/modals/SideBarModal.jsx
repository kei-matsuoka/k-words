import { motion, AnimatePresence } from 'framer-motion'

export const SideBarModal = ({ children, onClick, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen &&
        <>
          <motion.div
            className="fixed top-0 z-30 left-0 w-full h-full bg-black bg-opacity-50"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
          </motion.div>
          <motion.div
            className="fixed top-0 z-40 left-0 w-full h-full bg-opacity-50"
            onClick={onClick}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </motion.div>
        </>
      }
    </AnimatePresence>
  );
}
