class UsersController < ApplicationController
  wrap_parameters :user, include: [:name, :email, :password, :password_confirmation]

  def create
    user = User.new(user_params)
    if user.save!
      log_in(user)
      render json: { logged_in: true, user: user }
    else 
      render json: { logged_in: false }
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
