const HOST = process.env.REACT_APP_HOST

// 新規登録
export const signupUrl = `${HOST}/signup`

// ユーザー
export const userUrl = (id) => `${HOST}/users/${id}`

// ログイン
export const loginUrl = `${HOST}/login`
export const logoutUrl = `${HOST}/logout`

// ワード
export const wordsUrl = `${HOST}/words`
export const userWordsUrl = `${HOST}/user_words/`
export const userWordUrl = (id) => `${HOST}/user_words/${id}`
export const cardWordsUrl = (id) => `${HOST}/cards/${id}/words`
export const favoriteWordsUrl = `${HOST}/favorite_words`
export const commentedWordsUrl = `${HOST}/commented_words`

// カード
export const cardsUrl = `${HOST}/cards`

// お気に入り
export const favoriteUrl = `${HOST}/favorites`

// コメント
export const commentsUrl = `${HOST}/comments`
export const commentUrl = (id) => `${HOST}/comments/${id}`

// お問い合わせ
export const contactUrl = `${HOST}/contacts`

// アカウントの有効化
export const activationUrl = `${HOST}/account_activations`

// パスワードの再設定
export const passwordUrl = `${HOST}/password_resets`
