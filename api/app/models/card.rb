class Card < ApplicationRecord
  belongs_to :user
  has_many :connections, dependent: :destroy
  has_many :words, through: :connections
  validates :title, presence: true, length: {maximum: 20}
  validates :text, length: {maximum: 255}
end
