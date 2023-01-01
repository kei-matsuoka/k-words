class ContactsController < ApplicationController
  def create
    contact = Contact.new(contact_params)
    if contact.save!
      contact.send_confirmation_email
      render json: { status: 201, message: 'お問い合わせ内容を送信しました' }
    else 
      render json: { status: 500, message: 'お問い合わせ内容を送信できません' }
    end
  end

  private
    def contact_params
      params.require(:contact).permit(:email, :category, :text)
    end
end
