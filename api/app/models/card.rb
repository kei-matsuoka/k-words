class Card < ApplicationRecord
  has_many :words, dependent: :destroy
  validates :title, presence: true, length: {maximum: 20}
  validates :text, length: {maximum: 255}
end
