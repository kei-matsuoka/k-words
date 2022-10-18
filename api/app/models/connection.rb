class Connection < ApplicationRecord
  belongs_to :card
  belongs_to :word
  validates :card_id, presence: true
  validates :word_id, presence: true
end
