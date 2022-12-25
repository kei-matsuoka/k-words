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
      render json: { status: 400, message: 'このメールアドレスは既に使われています' } if user
    else
      user = User.new(user_params)
      if user.save!
        user.send_activation_email
        render json: { status: 201, message: 'アカウント認証用のメールを送信しました' }
      else 
        render json: { status: 500, message: 'アカウントを作成できません' }
      end
    end
  end

  def update
    user = User.find(params[:id])
    if user.update!(user_params)
      render json: { status: 200, user: user, message:'プロフィールを修正しました' }
    else 
      render json: { status: 500, message: 'プロフィールを修正できません'  }
    end
  end

  def destroy
    user = User.find(params[:id])
    if user.destroy
      render json: { status: 200, message: 'アカウントを削除しました' } 
    else 
      render json: { status: 500, message: 'アカウントを削除できません'  }
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
