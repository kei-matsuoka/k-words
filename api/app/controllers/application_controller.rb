class ApplicationController < ActionController::API
  include SessionsHelper
  include ActionController::Cookies

  private

    # ユーザーのログインを確認する
    def logged_in_user
      render json: { status: 401, message: 'ログインしてください' } unless logged_in?
    end
end
