class WordsController < ApplicationController
  def index
    words = Word.all
    if words
      render json: { status: 200, words: words }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end
  
  def show
    if current_user
      card = Card.find(params[:id])
      words = card.words.all
      render json: { status: 200, words: words }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end
end
