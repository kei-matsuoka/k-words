class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save!
      login(user)
      render json: { logged_in: true, user: user }
    else 
      render json: { logged_in: false }
    end
  end

  def update
    user = User.find(params[:id])
    if user.update!(user_params)
      render json: { status: 200, user: user }
    else 
      render json: { status:401, errors: '認証に失敗しました。'  }
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
