class WordsController < ApplicationController
  before_action :logged_in_user, only: [:show, :create, :update, :destroy]
  before_action :correct_user, only: [:update, :destroy]

  def index
    words = Word.all
    if words
      render json: { status: 200,
                     words: words.as_json(:include => [ 
                      :user => { :only => :name },
                      :favorite_users => { :only => :id },
                      :commenters => { :only => :id },
                      :comments => { :include => [
                        :user => { :only => [:id, :name] }
                      ] }
                     ])
                   }
    else
      render json: { status: 401, message: '用語がありません' }
    end
  end

  def show
    words = @current_user.words
    render json: { status: 200,
                   words: words.as_json(:include => [ 
                    :user => { :only => :name },
                    :favorite_users => { :only => :id },
                    :commenters => { :only => :id },
                    :comments => { :include => [
                      :user => { :only => [:id, :name] }
                    ] }
                   ])
                  }
  end

  def show_card_words
    card = Card.find(params[:id])
    words = card.words
    render json: { status: 200, card: card, words: words }
  end

  def create
    word = @current_user.words.build(word_params)
    if word.save!
      render json: { status: 201, message: '用語を追加しました' }
    else
      render json: { status: 500, message: '用語を追加できません' }
    end
  end

  def update
    if @word.update!(word_params)
      render json: { status: 200, message: '用語を修正しました' }
    else
      render json: { status: 500, message: '用語を修正できません' }
    end
  end

  def destroy
    if @word.destroy
      render json: { status: 200, message: '用語を削除しました' }
    else
      render json: { status: 500, message: '用語を削除できません' }
    end
  end

  private

    def word_params
      params.require(:word).permit(:id, :title, :kana, :meaning, :text)
    end

    # 正しいユーザーかどうかを確認
    def correct_user
      @word = current_user.words.find_by(id: params[:id])
      render json: { status: 401, message: '正しいアカウントでログインしてください' } if @word.nil?
    end
end
