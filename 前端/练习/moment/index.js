import { calendar } from "./calendar.js/calendar.js";
// calendar.solar2lunar(1987,11,01)
moment.locale("zh-cn");

let dateList = document.getElementById("dateList");
let weekName = document.getElementById("weekName");
function init() {
  let currentDate = moment();
  let oLunar = calendar.solar2lunar(
    currentDate.year(),
    currentDate.month() + 1,
    currentDate.date()
  );
  let time = document.getElementById("time");
  setInterval(() => {
    time.innerText = moment().format("LTS");
  }, 1000);
  let date = document.getElementById("date");
  date.innerText = currentDate.format("LL");
  let lunar = document.getElementById("lunar");
  lunar.innerText = oLunar.IMonthCn + oLunar.IDayCn;
  let festival = document.getElementById("festival");
  festival.innerText = oLunar.lunarFestival || "";

  let weekdayOfFirst = moment().weekday(0);
  let frament = document.createDocumentFragment();
  for (let i = 0; i < 7; i++) {
    let li = document.createElement("li");
    li.innerText = weekdayOfFirst.format("dd");
    frament.appendChild(li);
    weekdayOfFirst = weekdayOfFirst.add(1, "days");
  }
  weekName.appendChild(frament);

  update(currentDate.year(), currentDate.month() + 1, currentDate.date());
}

function update(year, month, date) {
  let initDate = moment();
  let currentDate = moment(`${year} ${month} ${date}`);
  let startOfweekday = currentDate.clone().date(1).weekday();
  let monthDayOfStart = currentDate.clone().startOf("month");
  let monthDayOfEnd = currentDate.clone().endOf("month");
  let monthDays = currentDate.clone().endOf("month").date();
  let frament = document.createDocumentFragment();
  let nodeYear = document.getElementById("year");
  nodeYear.innerText = currentDate.format("LL");
  for (let i = 0; i < 42; i++) {
    let li = document.createElement("li");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    if (i < startOfweekday) {
      li.classList.add("opacity-50");
      let lastmonthday = monthDayOfStart
        .clone()
        .subtract(startOfweekday - i, "days")
        .date();
      span1.innerText = lastmonthday;
      let lunar = calendar.solar2lunar(year, month - 1, lastmonthday);
      span2.innerText =
        lunar.lunarFestival ||
        (lunar.IDayCn === "初一" ? lunar.IMonthCn : null) ||
        lunar.festival ||
        lunar.IDayCn;
    } else if (i >= startOfweekday + monthDays) {
      li.classList.add("opacity-50");
      let nextmonthday = monthDayOfEnd
        .clone()
        .add(i - startOfweekday - monthDays + 1, "days")
        .date();
      span1.innerText = nextmonthday;
      let lunar = calendar.solar2lunar(year, month + 1, nextmonthday);
      span2.innerText =
        lunar.lunarFestival ||
        (lunar.IDayCn === "初一" ? lunar.IMonthCn : null) ||
        lunar.festival ||
        lunar.IDayCn;
    } else {
      let dayOfMonth = i - startOfweekday + 1;
      span1.innerText = currentDate.clone().date(dayOfMonth).format("D");
      if (
        initDate.format("L") ===
        currentDate.clone().date(dayOfMonth).format("L")
      ) {
        li.classList.add("selected");
      }
      let lunar = calendar.solar2lunar(year, month, dayOfMonth);
      span2.innerText =
        lunar.lunarFestival ||
        (lunar.IDayCn === "初一" ? lunar.IMonthCn : null) ||
        lunar.festival ||
        lunar.IDayCn;
    }
    li.appendChild(span1);
    li.appendChild(span2);
    frament.appendChild(li);
  }
  dateList.innerHTML = "";
  dateList.appendChild(frament);
}

init();

let initVal = moment();
let upArrow = document.getElementsByClassName("icon-xiangshang")[0];
upArrow.onclick = function () {
  let date = initVal.subtract(1, "month");
  update(date.year(), date.month() + 1, date.date());
};
let downArrow = document.getElementsByClassName("icon-xiangxia")[0];
downArrow.onclick = function () {
    let date = initVal.add(1, "month");
    update(date.year(), date.month() + 1, date.date());
};
