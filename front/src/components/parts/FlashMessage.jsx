import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

export const FlashMessage = forwardRef((props, ref) => {
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    stateChange(color, message) {
      setColor(color);
      setMessage(message);
    }
  }));

  message && setTimeout(() => setMessage(""), 3500);

  return (
    <AnimatePresence>
      {message &&
        <motion.div
          className="fixed top-14 right-4 text-white text-sm rounded-sm px-3.5 py-2.5 z-50"
          style={{ backgroundColor: color }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          {message}
        </motion.div>
      }
    </AnimatePresence>
  );
});
