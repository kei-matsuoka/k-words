module SessionsHelper
  #sessionを作成
  def login(user)
    session[:user_id] = user.id
  end

  # 現在ログイン中のユーザーを返す（いる場合）
  def current_user
    if session[:user_id]
      @current_user ||= User.find_by(id: session[:user_id])
    end
  end

  # 全てのカードを取得
  def get_cards
    @cards = Card.all
  end
end
