import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Word = ({ word }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <div className='flex flex-col items-center w-1/2 p-6 m-2 rounded-md border bg-white' onClick={handleOnClick}>
      <motion.header
        initial={false}
      >{word.title}</motion.header>
      <AnimatePresence initial={false}>
        {isOpen &&
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className='mt-3 text-sm'>{word.meaning}</div>
            <div className='mt-3 text-sm'>{word.text}</div>
          </motion.section>
        }
      </AnimatePresence>
    </div>
  );
}
