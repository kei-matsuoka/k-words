import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { motion, AnimatePresence } from 'framer-motion'

export const FlashMessage = () => {
  const { flashMessage, setFlashMessage } = useContext(AuthContext);
  flashMessage.message && setTimeout(() => setFlashMessage({message: ""}), 3500);

  return (
    <AnimatePresence>
      {flashMessage.message &&
        <motion.div 
          className={`fixed top-0 right-4 button-color text-white text-sm px-3.5 py-2.5 z-30`}
          initial={{x:100, opacity: 0}}
          animate={{x:0, opacity: 1}}
          exit={{x: 100, opacity: 0}}
          transition={{type: "tween", duration: 0.3}}
        >
          {flashMessage.message}
        </motion.div>
      }
    </AnimatePresence>
  );
}
