class CommentsController < ApplicationController
  before_action :logged_in_user, only: [:show, :create, :destroy]
  before_action :correct_user, only: [:destroy]

  def show
    commented_words = current_user.commented_words
    render json: { status: 200,
                   words: commented_words.as_json(:include => [
                    :user => { :only => :name },
                    :favorite_users => { :only => :id },
                    :commenters => { :only => :id },
                    :comments => { :include => [
                      :user => { :only => [:id, :name] }
                    ] }
                   ])
                  }
  end

  def create
    comment = current_user.comments.build(comment_params)
    if comment.save!
      render json: { status: 201, message: 'コメントしました' }
    else
      render json: { status: 500, message: 'コメントできません' }
    end
  end

  def destroy
    if @comment.destroy
      render json: { status: 200, message: 'コメントを削除しました' }
    else
      render json: { status: 500, message: 'コメントを削除できません' }
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:user_id, :word_id, :text)
    end

    # 正しいユーザーかどうかを確認
    def correct_user
      @comment = current_user.comments.find_by(id: params[:id])
      render json: { status: 401, message: '正しいアカウントでログインしてください' } if @comment.nil?
    end
end