class PasswordResetsController < ApplicationController
  before_action :get_user,   only: [:edit, :update]
  before_action :valid_user, only: [:edit, :update]
  before_action :check_expiration, only: [:edit, :update]

  def create
    @user = User.find_by(email: params[:password_reset][:email].downcase)
    if @user
      @user.create_reset_digest
      @user.send_password_reset_email
      render json: { status: 201, message: 'パスワード再設定用のメールを送信しました' }
    else
      render json: { status:401, message: 'アカウントがありません'  }
    end
  end

  def edit
    redirect_to "#{Rails.application.credentials[:url]}/password/#{params[:id]}/#{@user.email}"
  end

  def update
    if params[:password].empty?
      render json: { status: 400, message: 'パスワードが空です'  }
    elsif @user.update!(user_params)
      login(@user)
      render json: { status: 200, user: @user, message: 'パスワードを更新しました' }
    else
      render json: { status: 500, message: 'パスワードを更新できません'  }
    end
  end

  private

    def user_params
      params.require(:password_reset).permit(:password, :password_confirmation)
    end

    def get_user
      @user = User.find_by(email: params[:email])
    end

    # 正しいユーザーかどうか確認する
    def valid_user
      unless (@user && @user.activated? &&
              @user.authenticated?(:reset, params[:id]))
        render json: { status: 401, message: '正しいアカウントでログインしてください' }
      end
    end

    # トークンが期限切れかどうか確認する
    def check_expiration
      if @user.password_reset_expired?
        render json: { status: 400, message: '更新期限が切れています'  }
      end
    end
end
