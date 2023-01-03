const HOST = "https://api.k-words.net"

// 新規登録
export const signupUrl = `${HOST}/signup`

// ユーザー
export const userUrl = (id) => `${HOST}/users/${id}`

// ログイン
export const loginUrl = `${HOST}/login`
export const logoutUrl = `${HOST}/logout`

// ワード
export const wordsUrl = `${HOST}/words`
export const userWordUrl = (id) => `${HOST}/users/${id}/words`
export const cardWordUrl = (id) => `${HOST}/cards/${id}/words`

// カード
export const cardsUrl = `${HOST}/cards`

// お気に入り
export const userFavoriteUrl = (id) => `${HOST}/users/${id}/favorites`

// コメント
export const userCommentUrl = (id) => `${HOST}/users/${id}/comments`

// お問い合わせ
export const contactUrl = `${HOST}/contacts`

// アカウントの有効化
export const activationUrl = `${HOST}/account_activations`

// パスワードの再設定
export const passwordUrl = `${HOST}/password_resets`
