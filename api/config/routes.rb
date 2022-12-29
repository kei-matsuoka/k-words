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
  get '/users/:id/words', to: 'words#show'
  get '/cards/:id/words', to: 'words#show_card_words'
  post '/users/:id/words', to: 'words#create'
  patch '/users/:id/words/', to: 'words#update'
  delete '/users/:id/words/', to: 'words#destroy'

  # カード
  get '/cards', to: 'cards#index'

  # お気に入り
  get '/users/:id/favorites', to: 'favorites#show'
  post '/users/:id/favorites', to: 'favorites#favorite'

  # コメント
  get '/users/:id/comments', to: 'comments#show'
  post '/users/:id/comments', to: 'comments#create'
  delete '/users/:id/comments/', to: 'comments#destroy'

  # アカウントの有効化
  resources :account_activations, only: [:edit]
  patch '/account_activations', to: 'account_activations#update'

  # パスワードの再設定
  resources :password_resets, only: [:create, :edit]
  patch '/password_resets', to: 'password_resets#update'

  #awsのヘルスチェック
  get '/health_check', to: 'words#index'
end
