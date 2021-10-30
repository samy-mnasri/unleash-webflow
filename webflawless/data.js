export default {
  saved: {
    local: window.localStorage.getItem('webflawless')
      ? JSON.parse(window.localStorage.getItem('webflawless'))
      : {},
    session: window.sessionStorage.getItem('webflawless')
      ? JSON.parse(window.sessionStorage.getItem('webflawless'))
      : {}
  },
  url: {
    value: window.location.href,
    href: window.location.href,
    params: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
    pathname: window.location.pathname,
    origin: window.location.origin,
    host: window.location.host,
    hash: window.location.hash
  },
  context: {
    item: null,
    input: null,
    form: null,
    error: null
  },
  setCookie: ({ name, value }) => {
    document.cookie = name + '=' + encodeURIComponent(value)
  },
  getCookie: (name) => {
    return document.cookie.split(name + '=')[1]
      ? decodeURIComponent(document.cookie.split(name + '=')[1].split(';')[0])
      : null
  }
}
