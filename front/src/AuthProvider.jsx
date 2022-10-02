import { createContext, useState } from 'react'

// 初期値を持たないコンテクストオブジェクト
export const AuthContext = createContext();

// コンポーネント
export const AuthProvider = (props) => {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [cards, setCards] = useState()
  const [words, setWords] = useState()

  return (
    // コンテクストの値を設定して返す
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
        cards,
        setCards,
        words,
        setWords
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
