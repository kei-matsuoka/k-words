Rails.application.routes.draw do
  # 新規登録
  post '/signup', to: 'users#create'
  
  # ユーザー
  get '/users/:id', to: 'users#show'
  patch '/users/:id', to: 'users#update'
  delete '/users/:id', to: 'users#destroy'

  # ログイン
  get '/login', to: 'sessions#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # ワード
  get '/words', to: 'words#index'
  get '/user_words', to: 'words#show'
  post '/user_words', to: 'words#create'
  patch '/user_words/:id', to: 'words#update'
  delete '/user_words/:id', to: 'words#destroy'
  get '/cards/:id/words', to: 'words#card_words'
  get '/favorite_words', to: 'words#favorite_words'
  get '/commented_words', to: 'words#commented_words'
  
  # カード
  get '/cards', to: 'cards#index'

  # お気に入り
  post '/favorites', to: 'favorites#favorite'

  # コメント
  post '/comments', to: 'comments#create'
  delete '/comments/:id', to: 'comments#destroy'

  # お問い合わせ
  post '/contacts', to: 'contacts#create'

  # アカウントの有効化
  resources :account_activations, only: [:edit]
  patch '/account_activations', to: 'account_activations#update'

  # パスワードの再設定
  resources :password_resets, only: [:create, :edit]
  patch '/password_resets', to: 'password_resets#update'

  #awsのヘルスチェック
  get '/health_check', to: 'words#index'
end
