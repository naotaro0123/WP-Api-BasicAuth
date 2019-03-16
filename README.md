# WP-Api-BasicAuth

Basic認証のかかったWordPress配下にアクセスし、WordPress APIからVue.jsで表示するサンプルです。

serverフォルダ配下の.htaccessは、このフォルダのBasic認証を除外する設定です。

Wordpressの/wp-content/uploads配下にも同様の.htaccessを配置して下さい。

（画像のBasic認証を外すさないと、jsから画像表示で認証エラーになる）

WordPressには「qTranslate-X」プラグインをインストールして、日本語/英語記事を投稿している前提になります。

また、serverフォルダ配下は、レンタルサーバーのroot配下にapiフォルダを作って配置してください。
