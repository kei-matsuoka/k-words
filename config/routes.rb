Rails.application.routes.draw do
  get '/', to: 'users#create'
end
