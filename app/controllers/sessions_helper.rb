module SessionsHelper
  #sessionを作成
  def login(user)
    session[:user_id] = user.id
  end

  # 現在ログイン中のユーザーを返す（いる場合）
  def login_user
    if session[:user_id]
      @login_user ||= User.find_by(id: session[:user_id])
    end
  end
end
