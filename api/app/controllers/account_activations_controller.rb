class AccountActivationsController < ApplicationController
  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
      user.activate
      login(user)
      redirect_to "http://localhost:3001/valid"
    else
      redirect_to "http://localhost:3001/"
    end
  end
end
