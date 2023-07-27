const params = document.getElementById("paramsButton");
params.addEventListener("click", async () => {
  chrome.storage.sync.get("data", ({ data }) => {
    navigator.clipboard
      .writeText(data)
      .then(function () {
        alert("数据已复制到剪贴板！");
      })
      .catch(function (error) {
        console.error("复制失败：", error);
      });
  });
});
