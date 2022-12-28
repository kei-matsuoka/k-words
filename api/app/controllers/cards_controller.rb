class CardsController < ApplicationController
  def index
    @cards = Card.all
    if @cards
      render json: { status: 200, cards: @cards }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end
end
