let arr, gap, timer;
function ajax(method, url, success) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
    }
  };
}

function init() {
  let residueW, col, clientW;
  clientW = $(".wrapper")[0].clientWidth;
  col = Math.floor(clientW / 200);
  residueW = clientW - col * 200;

  if (residueW < col * 20) {
    residueW += 200;
    col--;
  }
  gap = residueW / col / 2;
  arr = new Array(col);
  arr.fill(10);
}

function render(oArr) {
  let min,
    max,
    i,
    left,
    height,
    contant = 1;
  oArr.forEach((element) => {
    let img = $("<img/>");
    img.attr("src", element.img);
    img[0].onload = function () {
      contant++;
      min = Math.min.apply(null, arr);
      i = arr.indexOf(min);
      left = (2 * i + 1) * gap + i * 200;
      height = (element.height / element.width) * 200;
      img
        .height(height)
        .css({ left: left, top: arr[i] })
        .appendTo($(".wrapper"));
      arr[i] += height + 10;
      max = Math.max.apply(null, arr);
      $(".wrapper").height(max);
      if (contant === oArr.length) {
        load();
      }
    };
  });
}

function load() {
  let minH, scrollT, viewH;
  minH = Math.min.apply(null, arr);
  scrollT = document.documentElement.scrollTop;
  viewH = document.documentElement.clientHeight;
  if (minH < scrollT + viewH) {
    ajax("get", "http://localhost:8888/", render);
  }
}

function resize() {
  init();
  let min,
    max,
    i,
    left,
    height,
    imgs = $("img");
  imgs.each((index, element) => {
    min = Math.min.apply(null, arr);
    i = arr.indexOf(min);
    left = (2 * i + 1) * gap + i * 200;
    $(element).css({ left: left, top: arr[i] });
    height = element.clientHeight;
    arr[i] += height + 10;
    max = Math.max.apply(null, arr);
    $(".wrapper").height(max);
  });
}

function debounce(cb) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    cb();
  }, 1000);
}
init();
ajax("get", "http://localhost:8888/", render);
window.onscroll = load;
window.onresize = function () {
  debounce(resize);
};
