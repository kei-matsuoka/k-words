# ユーザーを2人作成する
user = User.create!(
  name: "事務次官",
  email: Rails.application.credentials.admin[:email],
  password: Rails.application.credentials.admin[:password],
  password_confirmation: Rails.application.credentials.admin[:password],
  activated: true,
  activated_at: Time.zone.now
)
User.create!(
  name: "テスト",
  email: "t@t.t",
  password: Rails.application.credentials.test[:password],
  password_confirmation: Rails.application.credentials.test[:password],
  activated: true,
  activated_at: Time.zone.now
)

# 1人目のユーザーに関連するカードを3つ作成する
user.cards.create!(title: "基礎編Lv1", text: "よく使われる霞が関用語を覚える")
user.cards.create!(title: "資料作成編", text: "資料作成時によく使われる霞が関用語を覚える")
user.cards.create!(title: "基礎編Lv2", text: "よく使われる霞が関用語を覚える")

words_json = [
  {
   "title": "頭の体操",
   "kana": "あたまのたいそう",
   "meaning": "資料作成等に向けて、あらかじめ構想を練っておくこと。",
   "text": "用例：本件について、頭の体操をしておいてください。"
  },
  {
   "title": "アンテナを高くする",
   "kana": "あんてなをたかくする",
   "meaning": "普段よりもある業務に関する情報収集を積極的に行うこと。",
   "text": "用例：本件について、アンテナを高くしておいてください。"
  },
  {
   "title": "一枚紙",
   "kana": "いちまいがみ",
   "meaning": "説明する内容をA4用紙1枚にまとめたもの。",
   "text": "用例：大臣レク資料の内容は要点を絞って、なるべく一枚紙にしてください。"
  },
  {
   "title": "一丁目一番地",
   "kana": "いっちょうめいちばんち",
   "meaning": "最重要施策。最優先で行うべき案件。",
   "text": "用例：本件は一丁目一番地です。"
  },
  {
   "title": "カウンターパート",
   "kana": "かうんたーぱーと",
   "meaning": "普段の業務でよく接する仕事相手。",
   "text": "補足：例えば、全体を取りまとめる予算担当者と個別の施策の予算担当者。"
  },
  {
   "title": "確メモ",
   "kana": "かくめも",
   "meaning": "「確実なるメモ入れ」の略。国会答弁で万が一メモ入れ（答弁者に後ろからメモを渡す）などの対応が必要になった場合に、速やかに対応できる体制が整っていれば帰宅してもよいという意味。",
   "text": "用例：各課におかれましては、確実なるメモ入れでの対応をお願いします。"
  },
  {
   "title": "かたかっこ",
   "kana": "かたかっこ",
   "meaning": "\"（）\"の片側のみを読み上げる際の読み方。",
   "text": "補足：\"）\"は「かたかっことじ」と読むことがある。"
  },
  {
   "title": "がっちゃんこ",
   "kana": "がっちゃんこ",
   "meaning": "関係部署から提出された資料をまとめ、全体の整合性をとってから一つの資料にすること。",
   "text": "用例：各課から提出された資料をがっちゃんこしてください。"
  },
  {
   "title": "クリア",
   "kana": "くりあ",
   "meaning": "上司や関係者の了解を取ること。",
   "text": "用例：本件は課長クリアです。"
  },
  {
   "title": "原課",
   "kana": "げんか",
   "meaning": "事業を直接担当する課のこと。",
   "text": "補足：総務課等の窓口課ではない課とも言える。"
  },
  {
   "title": "削る",
   "kana": "さくる",
   "meaning": "資料の文字や文章等を削除すること。",
   "text": "用例：二段落目は削ってください。"
  },
  {
   "title": "差し替え",
   "kana": "さしかえ",
   "meaning": "資料やページの一部分を入れ替えること。",
   "text": "用例：3ページ目は今年度版に差し替えてください。"
  },
  {
   "title": "サブ",
   "kana": "さぶ",
   "meaning": "「サブスタンス」の略。政策の中身のこと。",
   "text": "補足：具体的には、法案の条文や会議資料の文案作成、各省との折衝など。"
  },
  {
   "title": "五月雨",
   "kana": "さみだれ",
   "meaning": "一度にまとめるのではなく、何度か立て続けに行うこと。",
   "text": "用例：五月雨でのご連絡となり恐縮です。"
  },
  {
   "title": "ショート",
   "kana": "しょーと",
   "meaning": "「ショートノーティス」の略。締切までの時間が短いこと。",
   "text": "用例：ショートで大変恐縮ですが、本日15時までにご提出ください。"
  },
  {
   "title": "セット版",
   "kana": "せっとばん",
   "meaning": "最終版の資料のこと。",
   "text": "用例：セット版を予算課に提出してください。"
  },
  {
   "title": "溶け込み",
   "kana": "とけこみ",
   "meaning": "修正箇所が反映された資料の状態のこと。",
   "text": "補足：「見え消し」と対照的に使われる。"
  },
  {
   "title": "突合",
   "kana": "とつごう",
   "meaning": "ある資料と別の資料を突き合わせて誤りがないか等を調べること。",
   "text": "用例：物品購入計画と帳簿を突合してください。"
  },
  {
   "title": "投げ込み",
   "kana": "なげこみ",
   "meaning": "幹部や関係部署に資料を配付すること。",
   "text": "補足：直接説明に行かずとも資料配付で事足りるような場合に投げ込みをする。"
  },
  {
   "title": "バッター",
   "kana": "ばったー",
   "meaning": "国会等で質問する人のこと。",
   "text": "補足：質問する人、順番、時間の割振をまとめたものを「バッター表」という。"
  },
  {
   "title": "P",
   "kana": "ぴー",
   "meaning": "「ペンディング」の略。未定のこと。",
   "text": "用例：8月1日（火）プレスリリース（P）"
  },
  {
   "title": "デブリ",
   "kana": "でぶり",
   "meaning": "幹部や関係者に説明等を行った後に、自身の部署内で相手の反応やコメント等を報告すること。",
   "text": "用例：事務次官レクのデブリをします。"
  },
  {
   "title": "ポツ",
   "kana": "ぽつ",
   "meaning": "\".\"（ピリオド）の読み方。",
   "text": "用例：1.（いちぽつ）"
  },
  {
   "title": "ポンチ絵",
   "kana": "ぽんちえ",
   "meaning": "政策や業務の概要を、図や写真などを使って簡単に説明した資料のこと。",
   "text": "用例：参考資料に事業のポンチ絵を添付しましょう。"
  },
  {
   "title": "前広",
   "kana": "まえびろ",
   "meaning": "前もってという意味。",
   "text": "用例：本件に該当する可能性がある場合は前広に情報共有してください。"
  },
  {
   "title": "見え消し",
   "kana": "みえけし",
   "meaning": "修正箇所が分かるような資料の状態のこと。追加箇所は赤字、削除箇所は赤字と取り消し線で表現する。",
   "text": "補足：Wordの「変更履歴の記録」という機能を使うことが多い。"
  },
  {
   "title": "めぐじ",
   "kana": "めぐじ",
   "meaning": "「○○をめぐる事情」の略。各部署が対外向けに作成している資料のこと。",
   "text": "用例：議員説明用にめぐじを印刷してください。"
  },
  {
   "title": "呼び込み",
   "kana": "よびこみ",
   "meaning": "上司（主に幹部以上）のところに行く際に、秘書からかかってくる呼び出しの電話。",
   "text": "補足：上司の時間が空いた際に呼び込んでもらうように秘書にお願いする。"
  },
  {
   "title": "リバイス",
   "kana": "りばいす",
   "meaning": "資料を修正すること。最新の情報に更新するという意味でも使われる。",
   "text": "用例：資料を今年度版にリバイスしてください。"
  },
  {
   "title": "レク",
   "kana": "れく",
   "meaning": "「レクチャー」の略。上司（主に幹部以上）や関係者に説明すること。",
   "text": "用例：国会レク、大臣レク、記者レク"
  },
  {
   "title": "ロジ",
   "kana": "ろじ",
   "meaning": "「ロジスティックス」の略。車両、食事、宿泊場所等の手配や、資料の準備、連絡調整等の様々な事務作業のこと。",
   "text": "補足：「サブ」と対照的に使われる。"
  }
 ]

 connections_json = [
  {card_id: 1, word_id: 9},
  {card_id: 1, word_id: 10},
  {card_id: 1, word_id: 13},
  {card_id: 1, word_id: 14},
  {card_id: 1, word_id: 15},
  {card_id: 1, word_id: 19},
  {card_id: 1, word_id: 24},
  {card_id: 1, word_id: 27},
  {card_id: 1, word_id: 28},
  {card_id: 1, word_id: 29},
  {card_id: 1, word_id: 30},
  {card_id: 1, word_id: 31},
  {card_id: 2, word_id: 3},
  {card_id: 2, word_id: 7},
  {card_id: 2, word_id: 8},
  {card_id: 2, word_id: 11},
  {card_id: 2, word_id: 12},
  {card_id: 2, word_id: 16},
  {card_id: 2, word_id: 17},
  {card_id: 2, word_id: 18},
  {card_id: 2, word_id: 21},
  {card_id: 2, word_id: 23},
  {card_id: 2, word_id: 26},
  {card_id: 3, word_id: 1},
  {card_id: 3, word_id: 2},
  {card_id: 3, word_id: 4},
  {card_id: 3, word_id: 5},
  {card_id: 3, word_id: 6},
  {card_id: 3, word_id: 20},
  {card_id: 3, word_id: 22},
  {card_id: 3, word_id: 25}
 ]
 
# 1人目のユーザーに関連するワードを作成する
user.words.create!(words_json)

#カードとワードを関連づける
Connection.create!(connections_json)
