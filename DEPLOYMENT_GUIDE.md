# GitHub Pages デプロイガイド

## 手動デプロイ方法

GitHubリポジトリは作成済みですが、GitHub Pagesを有効化するには手動設定が必要です。

### 手順

1. **GitHubリポジトリにアクセス**
   - URL: https://github.com/tailofyukki-cell/block-breaker-game

2. **Settings タブをクリック**
   - リポジトリページ上部のタブから「Settings」を選択

3. **Pages 設定を開く**
   - 左サイドバーの「Pages」をクリック

4. **Source を設定**
   - **Source**: Deploy from a branch を選択
   - **Branch**: `main` を選択
   - **Folder**: `/ (root)` を選択
   - **Save** ボタンをクリック

5. **デプロイ完了を待つ**
   - 数分後、以下のURLでゲームが公開されます
   - **公開URL**: https://tailofyukki-cell.github.io/block-breaker-game/

## 確認事項

- リポジトリは公開（Public）設定済み
- すべてのソースファイルは main ブランチにプッシュ済み
- index.html, styles.css, main.js が正しく配置されている

## トラブルシューティング

### GitHub Pagesが表示されない場合

1. Settings → Pages で設定が正しいか確認
2. Actions タブでデプロイ状況を確認
3. ブラウザのキャッシュをクリアして再読み込み

### 404エラーが出る場合

- index.html がリポジトリのルートディレクトリにあるか確認
- ファイル名の大文字小文字が正しいか確認

## 代替方法: GitHub Actions（将来的に）

GitHub Actions を使用した自動デプロイも可能ですが、現在のGitHub App権限では
ワークフローファイルのプッシュができません。手動設定後は自動的にデプロイされます。
