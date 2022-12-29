class Word < ApplicationRecord
  belongs_to :user
  has_many :connections, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :connected_cards, through: :connections, source: :card
  has_many :favorite_users, through: :favorites, source: :user
  has_many :commenters, through: :comments, source: :user

  default_scope -> { order(:kana) }

  validates :title, presence: true, length: {maximum: 20}
  validates :kana, presence: true, length: {maximum: 30}
  validates :meaning, presence: true, length: {maximum: 50}
  validates :text, length: {maximum: 255}
end
