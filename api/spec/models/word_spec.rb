require 'rails_helper'

RSpec.describe Word, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:word) { user.words.build(title: "レク", kana: "れく", meaning: "偉い人に説明すること。", text: "最初は結構怖い。")}

  it 'wordが有効であること' do 
    expect(word).to be_valid
  end
  it 'user_idが無い場合はwordが無効であること' do 
    word.user_id = nil
    expect(word).to_not be_valid
  end
  
  describe 'title' do
    it 'titleが必須であること' do
      word.title = ' '
      expect(word).to_not be_valid
    end
    it 'titleが20文字以内であること' do
      word.title = 'a' * 21
      expect(word).to_not be_valid
    end
  end

  describe 'kana' do
    it 'kanaが必須であること' do
      word.kana = ' '
      expect(word).to_not be_valid
    end
    it 'kanaが30文字以内であること' do
      word.kana = 'a' * 31
      expect(word).to_not be_valid
    end
  end

  describe 'meaning' do
    it 'meaningが必須であること' do
      word.meaning = ' '
      expect(word).to_not be_valid
    end
    it 'meaningが255文字以内であること' do
      word.meaning = 'a' * 256
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
