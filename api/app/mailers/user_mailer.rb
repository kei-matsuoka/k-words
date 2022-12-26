class UserMailer < ApplicationMailer
  def account_activation(user)
    @user = user
    mail to: user.email, subject: "【霞が関用語辞典】アカウント認証用のリンク送付"
  end

  def password_reset(user)
    @user = user
    mail to: user.email, subject: "【霞が関用語辞典】パスワード再設定用のリンク送付"
  end
end
