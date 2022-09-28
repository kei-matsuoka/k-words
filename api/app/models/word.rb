class Word < ApplicationRecord
  belongs_to :user
  validates :title, presence: true, length: {maximum: 20}
  validates :kana, presence: true, length: {maximum: 30}
  validates :meaning, presence: true, length: {maximum: 50}
  validates :text, length: {maximum: 255}
end
