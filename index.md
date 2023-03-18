# Aqua.js ドキュメント
[![CodeFactor](https://www.codefactor.io/repository/github/forestrharumaki/aqua.js-framework/badge)](https://www.codefactor.io/repository/github/forestrharumaki/aqua.js-framework)
- Aqua.jsについて
- スタートアップガイド
- コードリファレンス
# Aqua.jsについて
## 何これ？
これはHTML上でAquaを動かすフレームワークです。

Aquaタグで囲った部分がインタープリタによって実行されます
```html
<aqua>
    outf "HelloWorld!"
</aqua>
```
## Aquaって?
sakamotor様によって作られた言語です。

元々はコンソール上で動作するインタープリタ言語です
# スタートアップガイド
## ダウンロード
1. (こちら)[https://github.com/forestrharumaki/Aqua.js-Framework/archive/refs/heads/main.zip]でフレームワークのソースコードを取得する
2. buildフォルダを開く
3. aqua.jsを取り出す
4. aqua.jsをサーバーにアップロード
5. 適用したいHTMLにmetaとscriptのコードを追加

```html
<!DOCTYPE html>
<html>
    <head>
        略
        <meta name="aquascript" content="true">
    </head>
    <body>
        略
        <script src="ファイルパス" defer>
    </body>
</html>
```
## CDN
順次対応予定
# コードリファレンス
## Aqua.js対応メソッド
### outf
ストリームに文字列を出力できます
## Aqua公式メソッド
### option
オプションを設定できます
### out
公式からの詳細な情報はありません
### ln
公式からの詳細な情報はありません
### style
出力スタイルを変更できます
### var
変数を宣言できます
### set
変数を変更できます
### if & end if
公式からの詳細な情報はありません