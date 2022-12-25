import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { motion, AnimatePresence } from 'framer-motion'

export const LogoutMessage = () => {
  const { logoutMessage, setLogoutMessage } = useContext(AuthContext);
  logoutMessage.message && setTimeout(() => setLogoutMessage({ ...logoutMessage, message: "" }), 3500);

  return (
    <AnimatePresence>
      {logoutMessage.message &&
        <motion.div
          className="fixed top-14 right-4 text-white text-sm rounded-sm px-3.5 py-2.5 z-50"
          style={{ backgroundColor: logoutMessage.color }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          {logoutMessage.message}
        </motion.div>
      }
    </AnimatePresence>
  );
}
