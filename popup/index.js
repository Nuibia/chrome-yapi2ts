const requestDesc = document.getElementById("requestDesc");
const paramsButton = document.getElementById("paramsButton");
const responseButton = document.getElementById("responseButton");

requestDesc.addEventListener("click", async () => {
  chrome.storage.sync.get("result", ({ result }) => {
    navigator.clipboard
      .writeText(result.requestDesc)
      .then(function () {
        alert("请求方法注释已复制到剪贴板！");
      })
      .catch(function (error) {
        console.error("复制失败：", error);
      });
  });
});
paramsButton.addEventListener("click", async () => {
  chrome.storage.sync.get("result", ({ result }) => {
    navigator.clipboard
      .writeText(result.queryParams || result.bodyParams)
      .then(function () {
        alert("请求ts参数已复制到剪贴板！");
      })
      .catch(function (error) {
        console.error("复制失败：", error);
      });
  });
});
responseButton.addEventListener("click", async () => {
  chrome.storage.sync.get("result", ({ result }) => {
    navigator.clipboard
      .writeText(result.resultData)
      .then(function () {
        alert("响应ts参数已复制到剪贴板！");
      })
      .catch(function (error) {
        console.error("复制失败：", error);
      });
  });
});
