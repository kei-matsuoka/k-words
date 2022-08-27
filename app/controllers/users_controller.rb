class UsersController < ApplicationController
  wrap_parameters :user, include: [:name, :email, :password, :password_confirmation]

  def create
    user = User.new(user_params)
    if user.save!
      login(user)
      render json: { status: :created, user: user }
    else 
      render json: { status: 500 }
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
