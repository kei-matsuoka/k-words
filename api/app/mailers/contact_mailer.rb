class ContactMailer < ApplicationMailer
  def contact_confirmation(contact)
    @contact = contact
    mail to: Rails.application.credentials.admin[:email],
         subject: "【霞が関用語辞典】お問い合わせ内容の送付"
  end
end
