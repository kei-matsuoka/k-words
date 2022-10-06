class SessionsController < ApplicationController
  def show
    if logged_in?
      render json: { logged_in: true, user: @current_user }
    else
      render json: { status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
    end
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user&.authenticate(params[:session][:password])
      login(user)
      remember(user)
      render json: { logged_in: true, user: user }
    else
      render json: { status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
    end
  end

  def destroy
    logout if logged_in?
    if !logged_in?
      render json: { logged_in: false }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end
end
