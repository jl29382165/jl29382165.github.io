//按按鈕驗證學號,開門條件判斷
$(document).ready(function() {
  $("#openDoor").click(function () {
    var studentId = $("#studentId").val();
    if (studentId === "40072001H") {
      alert("驗證成功,開啟門鎖。");
    } else {
      alert("驗證失敗,無法開門!");
    }
    $("#studentId").val("");
  });
});