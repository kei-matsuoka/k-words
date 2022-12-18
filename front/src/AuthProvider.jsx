import { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [flashMessage, setFlashMessage] = useState({color: "rgb(48, 200, 214)", message: ""});

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
        flashMessage,
        setFlashMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
