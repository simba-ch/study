let solar;
let sun;
let earth;
let moon;
let ctx;
let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight;
function init(){
    solar = new Image();
    sun = new Image();
    earth = new Image();
    moon = new Image();
    solar.src = "solar.jpg";
    sun.src = "sun.png"
    earth.src = "earth.png";
    moon.src = "moon.png";
 
    let canvas = document.querySelector("#solar");
    canvas.width= w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
        draw()
}
init();
function draw(){
    ctx.clearRect(0, 0, w, h); //清空所有的内容
    /*绘制 太阳*/
    ctx.drawImage(solar, 0, 0, w, h);
    ctx.drawImage(sun,w/2-150,h/2-150,300,300)
    ctx.save();
    ctx.translate(w/2, h/2);
 
    // 绘制earth轨道
    // ctx.beginPath();
    // ctx.strokeStyle = "rgba(255,255,0,0.5)";
    // ctx.arc(0, 0, 200, 0, 2 * Math.PI)
    // ctx.stroke()
 
    // let time = new Date();
    // //绘制地球
    // ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds())
    // ctx.translate(200, 0);
    // ctx.drawImage(earth, -35, -35,70,70)
 
    // //绘制月球轨道
    // ctx.beginPath();
    // ctx.strokeStyle = "rgba(255,255,255,.3)";
    // ctx.arc(0, 0, 55, 0, 2 * Math.PI);
    // ctx.stroke();
 
    // //绘制月球
    // ctx.rotate(2 * Math.PI / 6 * time.getSeconds() + 2 * Math.PI / 6000 * time.getMilliseconds());
    // ctx.translate(55, 0);
    // ctx.drawImage(moon, -15, -15,30,30);
    ctx.restore();
 
    // requestAnimationFrame(draw);
}