# ダサパト

正式名称: ダサい“かもしれない”サイトをパトロール

デザイン起点でHPリニューアル営業先を探すSaaSのMVPプロトタイプです。

## 現在の範囲

- 地域、半径、業種、営業スタイルの指定
- Webデザイン、SNS、ライティングのコース切替
- コースごとのテーマカラー切替
- コースごとの狙い目業種と見るポイントの表示
- Webデザインは公式HP、SNSはInstagram導線、ライティングはブログ・コラム・記事募集の手がかりを探索
- Google Maps API連携による営業先取得
- Google PlacesのwebsiteUriを使った公式HPの自動検出
- 実ページHTMLを取得してスマホ対応、古いHTML、CTA、更新年、表示速度を診断
- 実ページHTMLから電話、メール、フォーム、LINE、Instagram、Xの連絡手段を抽出
- 電話・LINEしか窓口がなさそうな候補を除外するフィルター
- Google Places検索で通常検索に加えてInstagram検索も併用
- HPの古さ、スマホ対応、デザイン崩れ、更新停止、問い合わせ導線のスコアリング
- 営業優先度の判定
- 営業先のHPリンク遷移
- 最初の10件は診断カード、残り40件は名前リンクのみの軽量一覧で表示
- 営業先、リンク、提案文をCSV出力
- 営業者本人のスキル、経歴、経験、実績URLの入力
- あなたの強みをブラウザ内に保存して次回起動時に復元
- 売り込みから始めないHPリニューアル提案文の生成
- コースごとの提案文生成
- 同じ検索条件の短時間キャッシュ

## 生成ポリシー

- いきなり売り込まない
- 相手のHPやサービスを見た感想を入れる
- 課題は断定せず仮説として伝える
- 自己紹介は短くする
- 初回の目的は受注ではなく返信にする
- 医療系では成果保証や集患断定表現を避ける

## 次の実装候補

- チーム、ユーザー、営業ステータス管理
- 提案テンプレートの保存
- OpenAI APIを使った実サイト別の文面生成

## 起動方法

デモ候補で起動:

```bash
npm run dev
```

Google Maps API連携を有効にして起動:

```bash
GOOGLE_MAPS_API_KEY=your_google_maps_api_key npm run dev
```

有効化するAPI:

- Places API (New)
- Geocoding API

APIキー未設定時は、画面上に「APIキー未設定」と表示され、デモ候補にフォールバックします。

## 公開時の環境変数

公開環境ではAPIキーをブラウザに埋め込まず、サーバーの環境変数として設定してください。

```bash
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
API_CACHE_MS=600000
```

キャッシュ設定:

- `API_CACHE_MS`: 同じ検索条件の結果をサーバー内に保持する時間

## Vercelデプロイ

Vercel Functionsで `/api/leads`、`/api/config`、`/api/diagnose` を動かし、画面ファイルは静的配信します。APIキーはVercelの環境変数に置くため、ブラウザには露出しません。

1. このフォルダをGitHubにpush
2. Vercelで `New Project`
3. GitHubリポジトリを選択
4. Framework Presetは `Other`
5. Build Commandは空欄、または未設定
6. Output Directoryも未設定
7. Environment Variablesに以下を追加

```bash
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
API_CACHE_MS=600000
```

`vercel.json` で `/` を `/index.html` に向け、`api/[...path].js` でAPIリクエストを受けています。公開URLにアクセスすれば、そのリンクを踏んだ人が使えます。

Google Cloud側でも、Places APIとGeocoding APIだけにAPIキーを制限し、必要に応じてクォータ・予算アラートを設定してください。

## AI Dev Harness

`ai-dev-harness-fixed/` に、セミナー用の AI 開発ハーネス一式を追加しています。

```bash
cd ai-dev-harness-fixed
python3 harness.py doctor
python3 harness.py new "小さなWebアプリを作りたい" --project my-project
python3 harness.py plan my-project --domain web-saas
python3 harness.py run my-project --agent mock
python3 harness.py gate-review my-project
```

同梱版は `FIXES.md` にあるレビュー判定と `/refine-spec` のパス誤検出修正を含みます。
