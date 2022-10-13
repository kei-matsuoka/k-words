class WordsController < ApplicationController
  before_action :logged_in_user, only: [:create, :update, :destroy]
  before_action :correct_user, only: [:update, :destroy]

  def index
    @words = Word.all
    if @words
      render :json => @words.to_json(:include => { :user => { :only => :name} })
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end

  def create
    @word = current_user.words.build(word_params)
    if @word.save!
      render json: { status: 200 }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end

  def update
    @word = Word.find(params[:id])
    if @word.update!(word_params)
      render json: { status: 200 }
    else
      render json: { status: 401, errors: '認証に失敗しました。' }
    end
  end

  def destroy
    @word.destroy
    render json: { status: 200 }
  end

  private

    def word_params
      params.require(:word).permit(:id, :title, :kana, :meaning, :text)
    end

    # 正しいユーザーかどうかを確認
    def correct_user
      @word = current_user.words.find_by(id: params[:id])
      render json: { status: 401, errors: '認証に失敗しました。' } if @word.nil?
    end
end
