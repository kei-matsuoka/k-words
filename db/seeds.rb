# ユーザーを2人作成する
User.create!(name: "Kei",
  email: "a@a.a",
  password:"aaaaaa",
  password_confirmation: "aaaaaa")

User.create!(name: "Test",
  email: "t@t.t",
  password: "tttttt",
  password_confirmation: "tttttt")

# カードを4つ作成する
card = Card.create!(title: "HTML", text: "よく使われるHTMLのタグと属性を覚えよう!")
Card.create!(title: "CSS", text: "よく使われるCSSのプロパティを覚えよう!")
Card.create!(title: "JavaScript", text: "JavaScriotの基本的な文法を覚えよう!")
Card.create!(title: "Ruby", text: "Rubyの基本的な文法を覚えよう!")

# 1つ目のカードに関連するワードを4つ作成する
card.words.create!(question: "コメント", answer: "<!-- コメント -->", text: "")
card.words.create!(question: "見出し", answer: "<h1>見出し</h1>", text: "h1〜h5まである")
card.words.create!(question: "文字", answer: "<p>文字<p>", text: "")
card.words.create!(question: "リンク", answer: "<a href=""URL"">リンク</a>", text: "")
