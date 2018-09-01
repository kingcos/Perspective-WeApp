// APIs
const API_BASE_URL = "https://kingcos.top"
const API_ARTICLES_URL = API_BASE_URL.concat("/repos/kingcos/perspective/issues")
const API_ARTICLE_DETAILS_URL = API_BASE_URL.concat("/repos/kingcos/perspective/issues/")
const API_REPOS_URL = API_BASE_URL.concat("/users/kingcos/repos")

// ERROR Messages
const MESSAGE_ERROR_REQUEST_FAILED = "网络异常，请检查网络并重试"
const MESSAGE_LOADING = "Loading..."

module.exports = {
  API_BASE_URL: API_BASE_URL,
  API_ARTICLES_URL: API_ARTICLES_URL,
  API_ARTICLE_DETAILS_URL: API_ARTICLE_DETAILS_URL,
  API_REPOS_URL: API_REPOS_URL,
  MESSAGE_ERROR_REQUEST_FAILED: MESSAGE_ERROR_REQUEST_FAILED,
  MESSAGE_LOADING: MESSAGE_LOADING
}