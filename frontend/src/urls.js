const LOCALHOST = 'http://localhost:3000'

export const signupUrl = `${LOCALHOST}/signup`
export const loginUrl = `${LOCALHOST}/login`
export const logoutUrl = `${LOCALHOST}/logout`
export const wordsUrl = (id) => `${LOCALHOST}/cards/${id}`
