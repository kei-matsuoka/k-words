class WordsController < ApplicationController
  def index
    words = Word.all
    if words
      render json: { status: 200, words: words }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end
end
