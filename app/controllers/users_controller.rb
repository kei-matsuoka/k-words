class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save!
      login(user)
      get_cards
      render json: { logged_in: true, user: user, cards: @cards }
    else 
      render json: { logged_in: false }
    end
  end

  private
    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
end
