class AccountActivationsController < ApplicationController
  def update
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
      user.activate
      login(user)
      render json: { status: 200, user: user, message: 'アカウントを認証しました' }
    else
      render json: { status: 500, message: 'アカウントを認証できません'  }
    end
  end
end
