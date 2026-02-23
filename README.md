# ⛰️ 鹿児島ニュースポータルサイト

🔗 **Site URL**  
https://kagoshima.tominaga-pf.com/

WordPressをヘッドレスCMSとして使用し、Astroで構築したニュースポータルサイトです。  
コンテンツ管理はWordPress、フロントエンドはAstroによる静的生成（SSG）で実装しています。

---

## 🎯 Purpose

- ヘッドレスCMS構成の理解
- WordPress × Astro連携の実装
- 実運用を想定したサーバー構築（Xserver）

---

## 🛠 Tech Stack

- Frontend: Astro
- CMS: WordPress（Headless）
- API: WordPress REST API
- Server: Xserver
- Language: TypeScript / JavaScript

---

## 📌 Architecture

WordPressをコンテンツ管理専用（Headless CMS）として使用し、  
AstroからREST API経由で記事データを取得しています。

---

## ✨ Features

- WordPress管理画面から記事投稿が可能
- Astroによる高速な静的サイト生成
- REST APIを利用したデータ取得
- WordPressテーマに依存しないフロントエンド設計
- カスタムフィールド対応

---

## ⚡ Performance

- Static Site Generationによる高速表示
- 軽量なJavaScript構成
- 不要なスクリプトの削減

---

## 🔌 WordPress Setup

- Xserver上にWordPressを設置
- REST APIを使用して記事データを取得
- 必要に応じてカスタムフィールドを追加

---




