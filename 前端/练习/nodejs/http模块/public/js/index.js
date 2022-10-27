const inp = document.getElementById('inp')
const txt = document.getElementById('h1')
inp.oninput = function (event) {
  console.log(event)
  txt.innerText = inp.value;
  if (inp.value === "") txt.innerText = 'hello world'
}

let color = "red";
const btn = document.querySelector('#btn')
btn.onclick = function () {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  document.getElementById(color).remove();
  let href
  if (color === 'red') {
    href = './css/other.css';
    color = 'yellow'
  } else {
    href = './css/index.css'
    color = 'red'
  }
  link.setAttribute('href', href);
  link.setAttribute('id',color)
  document.getElementById('head').appendChild(link);
}