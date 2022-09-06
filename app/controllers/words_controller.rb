class WordsController < ApplicationController
  def index
    if current_user
      card = Card.find(params[:id])
      words = card.words.all
      render json: { status: 200, words: words }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end
end
