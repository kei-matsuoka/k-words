Rails.application.routes.draw do
  # 新規登録
  post '/signup', to: 'users#create'
  
  # ユーザー
  patch '/users/:id', to: 'users#update'

  # ログイン
  post '/login', to: 'sessions#create'
  get '/login', to: 'sessions#show'
  delete '/logout', to: 'sessions#destroy'

  # ワード一覧
  get '/words', to: 'words#index'

  # アカウントの有効化
  resources :account_activations, only: [:edit]
end
