import 'whatwg-fetch'
import Promise from 'promise-polyfill'

// To add to window
if (!window.Promise) window.Promise = Promise

const apiRoot = 'http://localhost:8080'

const serverApi = {
  getSpectrumData: {
    method: 'GET',
    url: config => `${apiRoot}/spectrum/summary/${config.id}`,
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  },
  getSpectrum: {
    method: 'GET',
    url: config => `${apiRoot}/spectrum/${config.id}`,
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  },
  addSpectrum: {
    method: 'POST',
    url: config => `${apiRoot}/spectrum/`,
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  },
  deleteSpectrum: {
    method: 'DELETE',
    url: config => `${apiRoot}/spectrum/${config.id}`,
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  },
  getAllSpectrums: {
    method: 'GET',
    url: config => `${apiRoot}/spectrum/`,
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  },
  getAllPost: {
    method: 'GET',
    url: config => `http://140.122.146.39/wordpress/index.php/wp-json/wp/v2/posts`,
    headers: {
      'Content-Type': 'application/json',
    },
  },
}

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["sendRequest"] }] */
class HttpService {

  sendRequest(apikey, config) {
    const requestOption = {
      method: serverApi[apikey].method,
      headers: new Headers(serverApi[apikey].headers || {}),
    };

    let url = serverApi[apikey].url(config);

    switch(requestOption.method) {
      case 'POST':
        console.log(config)
        if(config.data) requestOption.body = JSON.stringify(config.data);
        break;
      case 'GET':
        if(config.params){
          const urlParams = config.params.map(data=> data.value ? `${data.key}=${encodeURIComponent(data.value)}` : `${data.key}`);
          url = `${url}?${urlParams.join('&')}`
        }
        break;
    }

    return new Promise((resolve) => {
      switch (apikey) {
        default:
          fetch(url, requestOption).then((rsp) => {
            if (rsp.ok) {
              rsp.json().then((data) => { resolve(data) })
                .catch(error => console.error(error))
            }
          }).catch(error => console.error(error))

      }
    })
  }
}

export default new HttpService()
