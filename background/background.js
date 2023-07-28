import { YApi2Ts } from './helper.js';
const regex1 = /api\/interface\/get/;
const regex2 = /^(?!.*jiangniao).*$/;
chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (
      details.method === "GET" &&
      regex1.test(details.url) &&
      regex2.test(details.url)
    ) {
      // console.log("GET 请求 URL:", details.url);
        fetch(`${details.url}&jiangniao`)
          .then((response) => response.json())
          .then((response) => {
            // console.log('response', response)        
            const res = YApi2Ts(response?.data);
            console.log('res', res);
            chrome.storage.sync.set({ result:res });
          })
          .catch((error) => {
            console.error(error);
          });
    }
  },
  { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
  []
);

