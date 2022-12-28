class Word < ApplicationRecord
  belongs_to :user
  has_many :connections, dependent: :destroy
  has_many :cards, through: :connections
  has_many :favorites, dependent: :destroy
  has_many :users, through: :favorites
  default_scope -> { order(:kana) }
  validates :title, presence: true, length: {maximum: 20}
  validates :kana, presence: true, length: {maximum: 30}
  validates :meaning, presence: true, length: {maximum: 50}
  validates :text, length: {maximum: 255}
end
