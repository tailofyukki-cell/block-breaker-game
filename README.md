# 🎮 ブロック崩し (Block Breaker Game)

ブラウザで遊べるシンプルなブロック崩しゲームです。

## 🌐 プレイする

[**ゲームをプレイ**](https://[USERNAME].github.io/block-breaker-game/)

## 📖 ゲーム概要

画面下部のパドルを操作してボールを跳ね返し、画面上部のブロックをすべて破壊するとクリアです。ボールを落とすと残機が減り、残機が0になるとゲームオーバーになります。

### ゲームの特徴

- **シンプルな操作**: マウスやキーボード、タッチ操作に対応
- **カラフルなブロック**: 5色のブロックが並ぶ視覚的に楽しいデザイン
- **スコアシステム**: ブロックを破壊してハイスコアを目指そう
- **レスポンシブ対応**: PC・スマホ・タブレットで快適にプレイ可能

## 🎯 操作方法

### PC
- **マウス**: マウスを左右に動かしてパドルを操作
- **キーボード**: ← → キーでパドルを操作

### スマホ・タブレット
- **タッチ**: 画面をタッチ・スワイプしてパドルを操作

## 🎲 ルール

1. パドルを操作してボールを跳ね返す
2. ブロックにボールを当てて破壊する
3. すべてのブロックを破壊するとクリア
4. ボールを落とすと残機が1つ減る
5. 残機が0になるとゲームオーバー
6. ブロック1つにつき10ポイント獲得

## 🛠️ 技術スタック

- **HTML5**: ゲーム構造
- **CSS3**: スタイリング（グラデーション、アニメーション）
- **JavaScript (Vanilla)**: ゲームロジック
- **Canvas API**: 2D描画

## 📦 ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/[USERNAME]/block-breaker-game.git

# ディレクトリに移動
cd block-breaker-game

# ローカルサーバーを起動（Python 3の場合）
python3 -m http.server 8000

# ブラウザで開く
# http://localhost:8000
```

## 📁 ファイル構成

```
block-breaker-game/
├── index.html      # メインHTML
├── styles.css      # スタイルシート
├── main.js         # ゲームロジック
└── README.md       # このファイル
```

## 🚀 デプロイ方法（GitHub Pages）

1. GitHubリポジトリを作成
2. ファイルをプッシュ
3. リポジトリの Settings → Pages で `main` ブランチを選択
4. 公開URLが生成される

## 📝 ライセンス

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🤝 コントリビューション

バグ報告や機能提案は Issue でお願いします。プルリクエストも歓迎します!

## 📧 お問い合わせ

質問や提案がある場合は、GitHub の Issue をご利用ください。

---

**楽しんでプレイしてください! 🎉**
