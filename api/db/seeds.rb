# ユーザーを2人作成する
user = User.create!(name: "事務次官",
                    email: "a@a.a",
                    password:"aaaaaa",
                    password_confirmation: "aaaaaa",
                    activated: true,
                    activated_at: Time.zone.now)
User.create!(name: "Test",
             email: "t@t.t",
             password: "tttttt",
             password_confirmation: "tttttt",
             activated: true,
             activated_at: Time.zone.now)

# 1人目のユーザーに関連するカードを3つ作成する
user.cards.create!(title: "基礎編", text: "よく使われる霞が関用語を覚える")
user.cards.create!(title: "国会対応編", text: "国会対応でよく使われる霞が関用語を覚える")
user.cards.create!(title: "農林水産省編", text: "農林水産省でよく使われる霞が関用語を覚える")

# 1人目のユーザーに関連するワードを4つ作成する
user.words.create!(title: "レク", kana: "れく", meaning: "幹部や議員に担当施策を説明すること。", text: "初めてレクをするときは声が震える。")
user.words.create!(title: "呼び込み", kana: "よびこみ", meaning: "幹部や議員からの呼び出しのこと。", text: "下っ端が電話を受けて「〇〇呼び込みです！」と叫ぶと、その場が一瞬ピリッとする。")
user.words.create!(title: "小生", kana: "しょうせい", meaning: "私のへりくだった言い方。", text: "メールでごくたまに見かける。")
user.words.create!(title: "農研機構", kana: "のうけんきこう", meaning: "国立研究開発法人農業・食品産業技術総合研究機構の略。", text: "正式名称長すぎやろ。")

#カードとワードを関連づける
Connection.create!(card_id: 1, word_id: 1)
Connection.create!(card_id: 1, word_id: 2)
Connection.create!(card_id: 1, word_id: 3)
Connection.create!(card_id: 1, word_id: 4)
Connection.create!(card_id: 2, word_id: 4)
Connection.create!(card_id: 2, word_id: 3)
Connection.create!(card_id: 2, word_id: 2)
Connection.create!(card_id: 3, word_id: 2)
Connection.create!(card_id: 3, word_id: 4)
