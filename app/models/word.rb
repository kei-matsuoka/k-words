class Word < ApplicationRecord
  belongs_to :card
  validates :question, presence: true, length: {maximum: 20}
  validates :answer, presence: true, length: {maximum: 20}
  validates :text, length: {maximum: 255}
end
