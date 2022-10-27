import {scatter3DData} from './data/3DData.js'
function makeGaussian(amplitude, x0, y0, sigmaX, sigmaY) {
  return function (amplitude, x0, y0, sigmaX, sigmaY, x, y) {
      var exponent = -(
              ( Math.pow(x - x0, 2) / (2 * Math.pow(sigmaX, 2)))
              + ( Math.pow(y - y0, 2) / (2 * Math.pow(sigmaY, 2)))
          );
      return amplitude * Math.pow(Math.E, exponent);
  }.bind(null, amplitude, x0, y0, sigmaX, sigmaY);
}
// 创建一个高斯分布函数
var gaussian = makeGaussian(50, 0, 0, 20, 20);

var data = [];
for (var i = 0; i < 1000; i++) {
  // x, y 随机分布
  var x = Math.random() * 100 - 50;
  var y = Math.random() * 100 - 50;
  var z = gaussian(x, y);
  data.push([x, y, z]);
}

let option = {
  grid3D:{
    viewControl:{
      projection:'orthographic'
    }
  },
  xAxis3D:{type:'category'},
  yAxis3D:{type:'log'},
  zAxis3D:{},
  visualMap:{
    calculable:true,
    max:100,
    dimension:'Life Expectancy',
    inRange:{
      color:['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
    }
  },
  dataset:{
    source:scatter3DData
  },
  series:[
    {
      type:'scatter3D',
      symbolSize:5,
      encode:{
        x:'Country',
        y:'Year',
        z:'Income',
        tooltip:[0,1,2,3,4]
      }
    }
  ]
}

console.log(scatter3DData)

let myChart = echarts.init(document.getElementById('3D'));
myChart.setOption(option);