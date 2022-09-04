class WordsController < ApplicationController
  def index
    if current_user
      card = Card.find(card_params[:id])
      words = card.words.all
      render json: { status: 200, words: words }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end

  def card_params
    params.require(:card).permit(:id)
  end
end
