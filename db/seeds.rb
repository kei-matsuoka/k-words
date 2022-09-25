# ユーザーを2人作成する
User.create!(name: "Kei", email: "a@a.a", password:"aaaaaa", password_confirmation: "aaaaaa")
User.create!(name: "Test", email: "t@t.t", password: "tttttt", password_confirmation: "tttttt")

# カードを3つ作成する
card = Card.create!(title: "基礎", text: "よく使われる霞が関用語を覚えよう！")
Card.create!(title: "誰が使うねん", text: "めったに使われない霞が関用語を覚えよう!")
Card.create!(title: "農林水産省", text: "農林水産省でよく使われる霞が関用語を覚えよう！")

# 1つ目のカードに関連するワードを4つ作成する
card.words.create!(question: "レク", kana: "れく", answer: "幹部や議員に担当施策を説明すること。", text: "初めてレクをするときは声が震える。")
card.words.create!(question: "呼び込み", kana: "よびこみ", answer: "幹部や議員からの呼び出しのこと。", text: "下っ端が電話を受けて「〇〇呼び込みです！」と叫ぶと、その場が一瞬ピリッとする。")
card.words.create!(question: "小生", kana: "しょうせい", answer: "私のへりくだった言い方。", text: "メールでごくたまに見かけた時は、明治時代かよっと突っ込んでしまいがち。")
card.words.create!(question: "農研機構", kana: "のうけんきこう", answer: "国立研究開発法人農業・食品産業技術総合研究機構の略。", text: "正式名称長すぎやろ。")
