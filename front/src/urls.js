const HOST = process.env.REACT_APP_URL

export const signupUrl = `${HOST}/signup`
export const userUrl = (id) => `${HOST}/users/${id}`
export const passwordUrl = `${HOST}/password_resets`
export const activationUrl = `${HOST}/account_activations`

export const loginUrl = `${HOST}/login`
export const logoutUrl = `${HOST}/logout`

export const wordsUrl = `${HOST}/words`
export const userWordUrl = (id) => `${HOST}/words/${id}`

export const cardsUrl = `${HOST}/cards`
export const cardUrl = (id) => `${HOST}/cards/${id}`
