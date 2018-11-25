<?php
// 環境ごとで書き換え
const BASIC_USER_ID = 'xxxx';
const BASIC_PASSWORD = 'xxxx';
const WORDPRESS_PATH = '/wordpress/';

if(empty($_SERVER["HTTPS"])) {
  $wordpress_url = 'http://';
} else {
  $wordpress_url = 'https://';
}

// Basic認証対応（jsからBasic認証をかけたWordpressフォルダにアクセス不可のため）
$wordpress_url .= BASIC_USER_ID . ':' . BASIC_PASSWORD . '@' . $_SERVER["HTTP_HOST"] . WORDPRESS_PATH;


// クロスドメイン制約対応（Jsからアクセスする場合、以下2行が必要）
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// クエリチェック
if(!isset( $_SERVER["QUERY_STRING"] )) {
  echo "アクセスエラー";
} else {
  $wordpress_api_url = $wordpress_url . $_SERVER["QUERY_STRING"];

  $option = [
        CURLOPT_RETURNTRANSFER => true, //文字列として返す
        CURLOPT_TIMEOUT        => 3, // タイムアウト時間
  ];

  $ch = curl_init($wordpress_api_url);
  curl_setopt_array($ch, $option);
  $json = curl_exec($ch);

  curl_close($ch);
  echo $json;
}
?>
