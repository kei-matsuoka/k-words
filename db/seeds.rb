# サンプルユーザーを2人作成する
User.create!(name: "Kei",
  email: "a@a.a",
  password:"aaaaaa",
  password_confirmation: "aaaaaa")

User.create!(name: "Test",
  email: "t@t.t",
  password: "tttttt",
  password_confirmation: "tttttt")

# サンプルカードを4つ作成する
Card.create!(title: "HTML", text: "よく使われるHTMLのタグと属性を覚えよう!")
Card.create!(title: "CSS", text: "よく使われるCSSのプロパティを覚えよう!")
Card.create!(title: "JavaScript", text: "JavaScriotの基本的な文法を覚えよう!")
Card.create!(title: "Ruby", text: "Rubyの基本的な文法を覚えよう!")
