Rails.application.routes.draw do
  # 新規登録
  post '/signup', to: 'users#create'
  
  # ユーザー
  get 'users/:id', to: 'users#show'
  patch '/users/:id', to: 'users#update'

  # ログイン
  post '/login', to: 'sessions#create'
  get '/login', to: 'sessions#show'
  delete '/logout', to: 'sessions#destroy'

  # ワード
  get '/words', to: 'words#index'
  post '/words', to: 'words#create'
  patch '/words/:id', to: 'words#update'
  delete '/words/:id', to: 'words#destroy'

  # アカウントの有効化
  resources :account_activations, only: [:edit]

  # パスワードの再設定
  resources :password_resets, only: [:create, :edit]
  patch '/password_resets', to: 'password_resets#update'
end
