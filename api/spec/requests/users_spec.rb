require 'rails_helper'

RSpec.describe "Signup", type: :request do
  let(:user_params) { { user: { 
                          name: 'Example User',
                          email: 'user@example.com',
                          password: 'password',
                          password_confirmation: 'password' }}}
  it "新規登録されること" do
    expect { post signup_path , params: user_params }.to change {User.count}.by 1
    expect(response).to have_http_status(200)
  end
end
