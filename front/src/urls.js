const LOCALHOST = 'http://localhost:3000'

export const signupUrl = `${LOCALHOST}/signup`
export const userUrl = (id) => `${LOCALHOST}/users/${id}`
export const passwordUrl = (id) => `${LOCALHOST}/password/${id}`

export const loginUrl = `${LOCALHOST}/login`
export const logoutUrl = `${LOCALHOST}/logout`

export const wordsUrl = (id) => `${LOCALHOST}/cards/${id}`
export const allWordsUrl = `${LOCALHOST}/words`
