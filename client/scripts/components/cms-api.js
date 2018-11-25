const WEB_SITE = 'http://xxxx';
// endpointURL（日本語）
const API_URL_JA = `${WEB_SITE}/api/cms-api.php?`;
// endpointURL（英語）
const API_URL_EN = `${WEB_SITE}/api/cms-api.php?en/`;
// 記事一覧を取得（記事詳細は「/id」で記事Noを指定して取得）
const ARTICLE_LIST = 'wp-json/wp/v2/posts';
// 最新のx件のみ取得
const QUERY_CURRENT_ARTICLE = '?per_page=';
// x件数ごとでページ数ごとに指定（ページャー専用）
const QUERY_PAGER_ARTICLE = '&page=';
// アイキャッチ画像を取得
const QUERY_IMAGE = '?_embed';


// 記事一覧コンポーネント
Vue.component('article-list', {
    data: function() {
        return {
            articles: [],
            showJapanese: this.japanese,
            showArticleNum: this.articlenum,
            showArticlePage: this.articlepage,
        }
    },
    props: ["japanese", "articlenum", "articlepage"],
    created() {
        let axiosBase = axios.create({
            baseURL: this.showJapanese ? API_URL_JA : API_URL_EN,
        });
        // 最新のx件をxページ取得するAPI
        let api_url = `${ARTICLE_LIST}${QUERY_CURRENT_ARTICLE}${this.showArticleNum}`;
        api_url += `${QUERY_PAGER_ARTICLE}${this.showArticlePage}`;
        axiosBase.get(api_url)
        .then((response) => {
            this.articles = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    template: `
        <ul>
            <li v-for="article in articles">
                <a :href=article.id>
                    <span v-text="dateFns.format(article.date, 'YYYY.MM.DD')"></span>
                    <span v-html="article.title.rendered"></span>
                </a>
            </li>
        </ul>
    `,
});


// 記事詳細コンポーネント
Vue.component('article-detail', {
    data: function() {
        return {
            article: [],
            showJapanese: this.japanese,
            articleNo: this.articleno,
            articleTitle: null,
            articleContent: null,
            releaseDate: null,
            articleImage: null,
            articleCategory: null,
        }
    },
    props: ["japanese", "articleno"],
    created() {
        let axiosBase = axios.create({
            baseURL: this.showJapanese ? API_URL_JA : API_URL_EN,
        });
        axiosBase.get(`${ARTICLE_LIST}/${this.articleNo}${QUERY_IMAGE}`)
        .then((response) => {
            this.article = response.data;
            this.articleImage = this.article._embedded['wp:featuredmedia'][0].source_url;
            this.articleCategory = this.article._embedded['wp:term'][0][0].name;
            this.articleTitle = this.article.title.rendered;
            this.releaseDate = dateFns.format(this.article.date, 'YYYY/MM/DD HH:mm');
            this.articleContent = this.article.content.rendered;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    template: `
        <div>
            <div>記事No：{{ articleNo }} </div>
            <img :src="articleImage" width=400></img>
            <div v-html="articleTitle"></div>
            <div v-text="articleCategory"></div>
            <div v-text="releaseDate"></div>
            <div v-html="articleContent"></div>
        </div>
    `,
});