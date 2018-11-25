// 記事一覧
new Vue({ el: '#articleList' });

// 記事一覧ページャー用
new Vue({ el: '#articleListPager' });
/*
 ＜記事一覧ページャー用をjsから操作する＞
 js側から1ページに表示する件数、ページ数を変えたい場合は、以下を使う。
 new Vue({ el: '#articleListPager', data:{ showArticleNum: 2, showArticlePage: 2, isjapanese: true} });

 その場合は、HTMLの方は以下のように修正する。
<article-list :japanese="true" :articlenum="showArticleNum" :articlepage="showArticlePage"></article-list>
*/

// 記事詳細
new Vue({ el: '#articleDetail' });
/*
 ＜記事詳細をjsから操作する＞
 js側から記事Noを変えたい場合は、以下を使う。
 new Vue({ el: '#articleDetail', data:{ changeno: "30", isjapanese: true} });

 その場合は、HTMLの方は以下のように修正する。
 <article-detail :articleno="changeno" :japanese="isjapanese"></article-detail>
*/