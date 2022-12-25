class SessionsController < ApplicationController
  def show
    if logged_in?
      render json: { status: 200, user: @current_user }
    else
      render json: { status: 401, message: 'ログインしていません' }
    end
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user&.authenticate(params[:session][:password])
      if user.activated?
        login(user)
        params[:session][:remember_me] == true ? remember(user) : forget(user)
        render json: { status:201 , user: user }
      else
        render json: { status: 401, message: 'メールを確認してアカウントを有効にしてください' }
      end
    else
      render json: { status: 400, message: '正しいメールアドレスまたはパスワードを入力し直すか、新規登録してください' }
    end
  end

  def destroy
    logout if logged_in?
    if !logged_in?
      render json: { status: 200, message: 'ログアウトしました' }
    else
      render json: { status: 401, message: 'ログインしてください' }
    end
  end
end
