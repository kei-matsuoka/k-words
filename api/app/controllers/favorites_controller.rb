class FavoritesController < ApplicationController
  before_action :logged_in_user, only: [:favorite]

  def favorite
    @favorite = Favorite.find_by(favorite_params)
    if @favorite
      correct_user
      destroy()
    else
      create()
    end
  end

  def create
    favorite = current_user.favorites.build(favorite_params)
    if favorite.save!
      render json: { status: 201, message: 'お気に入りに追加しました' }
    else
      render json: { status: 500, message: 'お気に入りに追加できません' }
    end
  end

  def destroy
    if @favorite.destroy
      render json: { status: 200, message: 'お気に入りを解除しました' }
    else
      render json: { status: 500, message: 'お気に入りを解除できません' }
    end
  end

  private

    def favorite_params
      params.require(:favorite).permit(:user_id, :word_id)
    end

    # 正しいユーザーかどうかを確認
    def correct_user
      favorite = current_user.favorites.find_by(id: @favorite.id)
      render json: { status: 401, message: '正しいアカウントでログインしてください' } if favorite.nil?
    end
end
