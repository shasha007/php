$(".close").click(function () {
  $('#atari').modal('hide');
})
$(".open_rule").click(function () {
  window.location.href = $(this).data('url');
});

$(function () {
  //var nScrollHight = 0;
  //var nScrollTop = 0;
  //var nDivHight = $(".record_ul").height();
  //$(".record_ul").scroll(function () {
  //  nScrollHight = $(this)[0].scrollHeight;
  //  nScrollTop = $(this)[0].scrollTop;
  //  if (nScrollTop + nDivHight >= nScrollHight) {
  //    alert("下拉");
  //  }
  //  if (nScrollTop <= 0) {
  //    alert("上拉");
  //  }
  //})
})
