require 'rails_helper'

RSpec.describe Word, type: :model do
  let(:card) { FactoryBot.create(:html) }
  let(:word) { card.words.build(question: "コメント", answer: "<!-- コメント -->", text: "")}

  it 'wordが有効であること' do 
    expect(word).to be_valid
  end
  it 'card_idが無い場合はwordが無効であること' do 
    word.card_id = nil
    expect(word).to_not be_valid
  end
  
  describe 'question' do
    it 'questionが必須であること' do
      word.question = ' '
      expect(word).to_not be_valid
    end
    it 'questionが20文字以内であること' do
      word.question = 'a' * 21
      expect(word).to_not be_valid
    end
  end

  describe 'answer' do
    it 'answerが必須であること' do
      word.answer = ' '
      expect(word).to_not be_valid
    end
    it 'answerが20文字以内であること' do
      word.answer = 'a' * 21
      expect(word).to_not be_valid
    end
  end

  describe 'text' do
    it 'textが255文字以内であること' do
      word.text = 'a' * 256
      expect(word).to_not be_valid
    end
  end
end
