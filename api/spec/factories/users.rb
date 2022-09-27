FactoryBot.define do
  factory :user do
    name { "Kei" }
    email { "example@test.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end
