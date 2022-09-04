FactoryBot.define do
  factory :css, class: Card do
    title { 'CSS' }
    text { 'CSSのプロパティを覚えよう。' }
    created_at { 10.minutes.ago }
  end
 
  factory :most_recent, class: Card do
    title { 'JavaScript' }
    text { 'JavaScriptのメソッドを覚えよう。' }
    created_at { Time.zone.now }
    user { association :user, email: 'recent@example.com' }
  end
end
 
def user_with_posts(posts_count: 5)
  FactoryBot.create(:user) do |user|
    FactoryBot.create_list(:css, posts_count, user: user)
  end
end
