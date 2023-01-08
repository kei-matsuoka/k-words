# 霞が関用語辞典
霞が関用語（官僚が使用する業界用語）の検索・投稿サービスです。  
URL：[https://k-words.net/](https://k-words.net/)
|テスト用メールアドレス|テスト用パスワード|
|----------------|-------------|
|     t@t.t      |    tttttt   |
## 主な使用技術
- フロントエンド
  - HTML / CSS（Tailwind CSS）
  - JavaScript
  - React.js 18.2.0
- バックエンド
  - Ruby 3.1.2
  - Rails 7.0.3.1（APIモード）
- インフラ
  - Puma
  - Nginx
  - Docker / Docker Compose
  - AWS（ECS Fargate / ECR / Cloudfront / S3 / RDS(Postgresql) / Elasticache(Redis) / Cloudwatch等）
  - Terraform（インフラのコード化）
  - Github Actions（CI/CD）
- テスト / 静的解析ツール
  - ESLint
  - RSpec
## インフラ構成図
![AWS構成図](https://user-images.githubusercontent.com/46675472/211208244-5ae04ed1-297e-4468-b910-a0f5c62fadc0.png)
## ER図
![ER図](https://user-images.githubusercontent.com/46675472/211209453-1e1b7431-6ebd-4488-9a2a-3e0e7b235887.png)
## 機能一覧
- アカウント登録 / 認証
- 用語検索（部分一致 / 五十音絞り込み）
- 用語投稿
- お気に入り登録
- コメント投稿
- 単語カード学習
