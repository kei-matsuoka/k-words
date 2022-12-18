class UsersController < ApplicationController
  before_action :logged_in_user, only: [:show, :update, :destroy]

  def show
    @user = User.find(params[:id])
    @words = @user.words
    render json: { status: 200, words: @words }
  end

  def create
    user = User.find_by(email: user_params[:email].downcase)
    if user
      render json: { logged_in: "email" } if user
    else
      user = User.new(user_params)
      if user.save!
        user.send_activation_email
        render json: { logged_in: "wait" }
      else 
        render json: { logged_in: false }
      end
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

  def destroy
    User.find(params[:id]).destroy
    render json: { status: 200 } 
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
