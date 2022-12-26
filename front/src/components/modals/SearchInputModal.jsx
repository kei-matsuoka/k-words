import { motion, AnimatePresence } from 'framer-motion'

export const SearchInputModal = ({ children, onClick, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen &&
        <motion.div
          className="fixed top-0 z-30 left-0 w-full h-full"
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "tween", duration: 0.1 }}
        >
          <div
            className="bg-white rounded-sm absolute drop-shadow top-[9px] left-1/3 z-20"
            onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
