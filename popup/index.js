const paramsButton = document.getElementById("paramsButton");
const responseButton = document.getElementById("responseButton");
paramsButton.addEventListener("click", async () => {
  chrome.storage.sync.get("result", ({ result }) => {
    navigator.clipboard
      .writeText(result.queryParams || result.bodyParams)
      .then(function () {
        alert("数据已复制到剪贴板！");
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
        alert("数据已复制到剪贴板！");
      })
      .catch(function (error) {
        console.error("复制失败：", error);
      });
  });
});
