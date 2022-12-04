const LOCALHOST = 'https://api.k-words.net'
// const LOCALHOST = 'http://localhost:3000'

export const signupUrl = `${LOCALHOST}/signup`
export const userUrl = (id) => `${LOCALHOST}/users/${id}`
export const passwordUrl = `${LOCALHOST}/password_resets`

export const loginUrl = `${LOCALHOST}/login`
export const logoutUrl = `${LOCALHOST}/logout`

export const wordsUrl = `${LOCALHOST}/words`
export const userWordUrl = (id) => `${LOCALHOST}/words/${id}`

export const cardsUrl = `${LOCALHOST}/cards`
export const cardUrl = (id) => `${LOCALHOST}/cards/${id}`
