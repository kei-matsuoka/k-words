Rails.application.routes.draw do
  get '/login', to: 'sessions#show'
  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
end
