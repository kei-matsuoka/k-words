class User < ApplicationRecord
  #emailをチェックするための正規表現
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  #save前にemailを小文字にする
  before_save { email.downcase! }

  #validation
  validates :name, presence: true, length: { maximum: 20 }
  validates :email, presence: true, length: { maximum: 255 },
             format: { with: VALID_EMAIL_REGEX },
             uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6, maximum: 255 }, allow_nil: true

  has_secure_password
end
