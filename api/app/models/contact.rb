class Contact < ApplicationRecord
  #emailをチェックするための正規表現
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  before_save :downcase_email

  validates :email, 
    length: { maximum: 255 },
    format: { with: VALID_EMAIL_REGEX },
    allow_blank: true
  validates :category, presence: true, length: {maximum: 10}
  validates :text, presence: true, length: {maximum: 1000}

  # 問い合わせを内容を運営にメールする
  def send_confirmation_email
    ContactMailer.contact_confirmation(self).deliver_now
  end

  private
    # メールアドレスをすべて小文字にする
    def downcase_email
      self.email = email.downcase
    end
end
