const inps = document.getElementsByTagName('input')
const err = document.querySelector('.err')
Array.from(inps).forEach(inp => {
  inp.oninput = () => {
    err.remove();
  }
});