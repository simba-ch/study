(function () {
  window.onload = function () {
    let canvas = document.getElementById("solar");
    if (canvas.getContext === undefined) return;
    let ctx, solar, sun, earth, moon, w, h;
    let p = document.getElementById("time");
    function init() {
      ctx = canvas.getContext("2d");
      solar = new Image();
      solar.src = "solar.jpg";
      sun = new Image();
      sun.src = "sun.png";
      earth = new Image();
      earth.src = "earth.png";
      moon = new Image();
      moon.src = "moon.png";
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
      canvas.width = w;
      canvas.height = h;
      draw();
    }
    init();
    function draw() {
      let time = new Date();
      let t = time.getMinutes() / 60,
        m = time.getSeconds() / 60;
      p.innerText = time.toLocaleString();
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.drawImage(solar, 0, 0, w, h);

      ctx.drawImage(sun, w / 2 - 200, h / 2 - 200, 400, 400);

      ctx.translate(w / 2, h / 2);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,0,0.5)";
      ctx.arc(0, 0, 300, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.rotate(2 * Math.PI * t);
      ctx.translate(0, -300);
      ctx.drawImage(earth, -77, -57, 150, 120);

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,.3)";
      ctx.arc(0, 0, 100, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.rotate(2 * Math.PI * m);
      ctx.drawImage(moon, -50, -145, 100, 90);
      ctx.restore();
      requestAnimationFrame(draw);
    }
    window.onresize = init;
  };
})();
