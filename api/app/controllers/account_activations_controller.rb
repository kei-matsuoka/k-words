class AccountActivationsController < ApplicationController
  def update
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
      user.activate
      login(user)
      render json: { status: 200, user: user }
    else
      render json: { status: 500, errors: 'アカウントを認証できません'  }
    end
  end
end
