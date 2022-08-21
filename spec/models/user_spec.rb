require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { User.new(name: 'Example User', email: 'user@example.com',
                        password: 'password', password_confirmation: 'password') }

  it 'userが有効であること' do
    expect(user).to be_valid
  end

  describe 'name' do
    it 'nameが必須であること' do
      user.name = ''
      expect(user).to_not be_valid
    end
    it 'nameが20文字以内であること' do
      user.name = 'a' * 51
      expect(user).to_not be_valid
    end
  end

  describe 'email' do
    it 'emailが必須であること' do
      user.email = ''
      expect(user).to_not be_valid
    end
    it 'emailが255文字以内であること' do
      user.email = 'a' * 244 + '@example.com'
      expect(user).to_not be_valid
    end
    it '有効な形式のemailが有効であること' do
      valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                           first.last@foo.jp alice+bob@baz.cn]
      valid_addresses.each do |valid_address|
        user.email = valid_address
        expect(user).to be_valid, "#{ valid_address.inspect } が無効になっているので、有効にしてください"
      end
    end
    it '無効な形式のemailが無効であること' do
      invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                             foo@bar_baz.com foo@bar+baz.com foo@bar..com]
      invalid_addresses.each do |invalid_address|
        user.email = invalid_address
        expect(user).to_not be_valid, "#{ invalid_address.inspect } が有効になっているので、無効にしてください"
      end
    end
    it 'emailに一意性があること' do
      duplicate_user = user.dup
      user.save
      expect(duplicate_user).to_not be_valid
    end
    it 'emailが小文字で保存されること' do
      mixed_case_email = "Foo@ExAMPle.CoM"
      user.email = mixed_case_email
      user.save
      expect(user.email.downcase).to eq user.reload.email 
    end
  end

  describe 'password' do
    it 'passwordが空でないこと' do
      user.password = user.password_confirmation = ''
      expect(user).to_not be_valid
    end
    it 'passwordが6文字以上であること' do
      user.password = user.password_confirmation = 'a' * 5
      expect(user).to_not be_valid
    end
    it 'passwordが255文字以内であること' do
      user.password = user.password_confirmation = 'a' * 256
      expect(user).to_not be_valid
    end
  end
end
