import { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [words, setWords] = useState();
  const [cards, setCards] = useState();

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
        words,
        setWords,
        cards,
        setCards
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
