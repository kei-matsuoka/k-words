class UsersController < ApplicationController
  before_action :logged_in_user, only: [:update, :destroy]

  def create
    user = User.find_by(email: user_params[:email].downcase)
    if user
      render json: { status: 400, message: 'このメールアドレスは既に使われています' }
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
    if @current_user.update!(user_params)
      render json: { status: 200, user: @current_user, message:'プロフィールを修正しました' }
    else 
      render json: { status: 500, message: 'プロフィールを修正できません'  }
    end
  end

  def destroy
    if @current_user.destroy
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
