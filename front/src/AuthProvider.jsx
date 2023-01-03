import { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [logoutMessage, setLogoutMessage] = useState({color: "", message: ""});

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
        logoutMessage,
        setLogoutMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
