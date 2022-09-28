require 'rails_helper'

RSpec.describe Card, type: :model do
  let(:card) { FactoryBot.build(:html) }

  it 'cardが有効であること' do 
    expect(card).to be_valid
  end
  # it 'cardが削除されると関連のwordも削除されること' do
  #   card.save
  #   card.words.create!(question: "コメント", answer: "<!-- -->", text: "")
  #   expect{card.destroy}.to change(Word, :count).by -1
  # end
  
  describe 'title' do
    it 'titleが必須であること' do
      card.title = ' '
      expect(card).to_not be_valid
    end
    it 'titleが20文字以内であること' do
      card.title = 'a' * 21
      expect(card).to_not be_valid
    end
  end

  describe 'text' do
    it 'textが255文字以内であること' do
      card.text = 'a' * 256
      expect(card).to_not be_valid
    end
  end
end
