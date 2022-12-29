class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :word
  validates :user_id, presence: true
  validates :word_id, presence: true
  validates :text, length: {maximum: 255}
end
