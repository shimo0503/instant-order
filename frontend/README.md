# instant-order
## 概要
試しに自分で飲食店を出してみたい人向けに、簡単に注文・会計・売上参照ができる注文アプリを作成しました。https://instant-order.duckdns.org/ にデプロイしております。現在はこのドメインで共通のメニュー・共通の注文ですが、今後はユーザ登録機能を実装して、ユーザごとにメニューや注文を分けたいという構想を持っております。

## 使用技術
- フロントエンド
  - Next.js
    - UIはMaterial UIを仕様
    - orvalでバックエンドのopenapiからapiのリクエスト関数を自動生成し、それを使用することでバックエンドへリクエストを送っている
- バックエンド
  - Django
    - Django REST FrameWorkを用いてフロントに渡すAPIを実装
- インフラ
  - Ubuntu
    - X-serverのVPSにubuntuを使用している。
  - SQLite
    - DjangoのORMで動かしている
    - ゆくゆくはMySQLにしたい。
  - Nginx
    - サーバー内でフロントエンド・バックエンドの二つのAPサーバーが動いていて、リバースプロキシとして動作させている。
