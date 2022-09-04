require 'rails_helper'

RSpec.describe Card, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:card) { user.cards.build(title: 'HTML', text: 'よく使うhtmlのタグを覚えよう。') }

  it 'cardが有効であること' do 
    expect(card).to be_valid
  end
  it 'user_idが無い場合はcardが無効であること' do
    card.user_id = nil
    expect(card).to_not be_valid
  end
  
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
  it '作成日時が新しい順に並ぶこと' do
    FactoryBot.send(:user_with_posts)
    expect(FactoryBot.create(:most_recent)).to eq Card.first
  end
end
