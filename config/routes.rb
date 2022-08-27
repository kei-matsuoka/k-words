Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
end
