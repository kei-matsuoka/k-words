Rails.application.routes.draw do
  # 新規登録
  post '/signup', to: 'users#create'

  # ログイン
  post '/login', to: 'sessions#create'
  get '/login', to: 'sessions#show'

  # ワード一覧
  get 'cards/:id/words', to: 'words#index'
end
