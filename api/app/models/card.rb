class Card < ApplicationRecord
  validates :title, presence: true, length: {maximum: 20}
  validates :text, length: {maximum: 255}
end
