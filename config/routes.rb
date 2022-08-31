Rails.application.routes.draw do
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#show'
  post '/login', to: 'sessions#create'
end
