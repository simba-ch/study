import { getVirtualData, graphData, listData,cellSize,pieRadius } from "./data/日历图data.js";


// 在日历坐标系中使用热力图
const virtualData1 = getVirtualData();
const option = {
  calendar: {
    range: '2017',
    left: 200,
    right: 100,
    top: 100
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: virtualData1,
  },
  visualMap: {
    min: 0,
    max: 10000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
    top: 20
  },
  tooltip: {}
}

echarts.init(document.getElementById('日历图'))
  .setOption(option);



// 在日历坐标系中使用散点图
const virtualData2 = getVirtualData('2016');
const top12 = virtualData2.sort((a, b) => {
  return b[1] - a[1];
}).slice(0, 12);

const option1 = {
  backgroundColor: '#404a59',
  title: {
    top: 30,
    text: '2016某人每天步数',
    subtext: '数据纯属虚构',
    left: 'center',
    textStyle: {
      color: '#fff',
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 30,
    left: 100,
    // data: ['步数', 'Top12'],
    textStyle: {
      color: '#fff',
    }
  },
  calendar: [{
    top: 100,
    left: 'center',
    range: ['2016-01-01', '2016-06-30'],
    splitLine: {
      lineStyle: {
        color: '#000',
        width: 4,
        type: 'solid'
      }
    },
    yearLabel: {
      formatter: '{start} 1st',
      textStyle: {
        color: '#fff'
      }
    },
    itemStyle: {
      color: '#323c48',
      borderWidth: 1,
      borderColor: '#111'
    }
  },
  {
    top: 340,
    left: 'center',
    range: ['2016-07-01', '2016-12-31'],
    splitLine: {
      lineStyle: {
        color: '#000',
        width: 4,
        type: 'solid'
      }
    },
    yearLabel: {
      formatter: '{start} 2nd',
      textStyle: {
        color: '#fff'
      }
    },
    itemStyle: {
      color: '#323c48',
      borderWidth: 1,
      borderColor: '#111'
    }
  }],
  series: [{
    name: '步数',
    type: 'scatter',
    coordinateSystem: 'calendar',
    data: virtualData2,
    symbolSize: function (val) {
      return val[1] / 500;
    },
    itemStyle: {
      color: '#ddb926'
    }
  },
  {
    name: 'Top12',
    type: 'effectScatter',
    coordinateSystem: 'calendar',
    data: top12,
    symbolSize: function (val) {
      return val[1] / 500;
    },
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    hoverAnimation: true,
    itemStyle: {
      color: '#f4e925',
      shadowBlur: 10,
      shadowColor: '#333'
    },
    zlevel: 1
  },
  {
    name: '步数',
    type: 'scatter',
    coordinateSystem: 'calendar',
    calendarIndex: 1,
    data: virtualData2,
    symbolSize: function (val) {
      return val[1] / 500;
    },
    itemStyle: {
      color: '#ddb926',
    }
  },
  {
    name: 'Top12',
    type: 'effectScatter',
    coordinateSystem: 'calendar',
    calendarIndex: 1,
    data: top12,
    symbolSize: function (val) {
      return val[1] / 500;
    },
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    hoverAnimation: true,
    itemStyle: {
      color: '#f4e925',
      shadowBlur: 200,
      shadowColor: '#333'
    },
    zlevel: 1,
  }
  ]
};
echarts.init(document.getElementById('日历图1'))
  .setOption(option1);


// 在日历坐标系中同时放置热力图与散点图
const links = graphData.map((item, index) => {
  return {
    source: index,
    target: index + 1
  }
});
// links.pop();
// console.log("🚀 ~ file: 日历图.js ~ line 187 ~ links ~ links", links)

const option2 = {
  calendar: {
    top: 'middle',
    left: 'center',
    orient: 'vertical',
    cellSize: 40,
    yearLabel: {
      margin: 50,
      textStyle: {
        fontSize: 30
      }
    },
    dayLabel: {
      firstDay: 1,
      nameMap: 'cn'
    },
    monthLabel: {
      nameMap: 'cn',
      margin: 15,
      fontSize: 20,
      color: '#999'
    },
    range: ['2017-02', '2017-03-31'],
  },
  visualMap: {
    type: 'piecewise',
    min: 0,
    max: 10000,
    left: 'center',
    bottom: 20,
    inRange: {
      color: ['#5291FF', '#C7DBFF']
    },
    orient: 'horizontal',
    seriesIndex: [1]
  },
  series: [
    {
      type: 'graph',
      edgeSymbol: ['none', 'arrow'],
      coordinateSystem: 'calendar',
      links: links,
      symbolSize: 15,
      calendarIndex: 0,
      itemStyle: {
        color: 'yellow',
        shadowBlur: 9,
        shadowOffsetX: 1.5,
        shadowOffsetY: 3,
        shadowColor: '#555'
      },
      lineStyle: {
        color: '#D10E00',
        width: 1,
        opacity: 1
      },
      data: graphData,
      z: 20
    },
    {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData()
    }
  ]
}

echarts.init(document.getElementById('日历图2'))
  .setOption(option2);



// 制作农历
const heatmapData = [];
const lunarData = [];

for (let i = 0; i < listData.length; i++) {
  heatmapData.push([
    listData[i][0],
    Math.random() * 300
  ]);

  lunarData.push([
    listData[i][0],
    1,
    listData[i][1],
    listData[i][2]
  ])

}

const option3 = {
  calendar: {
    left: 'center',
    top: 'middle',
    cellSize: [70, 70],
    yearLabel: {
      show: false
    },
    orient: 'vertical',
    dayLabel: {
      firstDay: 1,
      nameMap: 'cn'
    },
    monthLabel: {
      show: false
    },
    range: '2017-03'
  },
  visualMap: {
    show: false,
    min: 0,
    max: 300,
    calculable: true,
    seriesIndex: 2,
    orient: 'horizontal',
    left: 'center',
    bottom: 20,
    inRange: {
      color: ['#e0ffff', '#006edd'],
      opacity: 0.3,
    },
    controller: {
      inRange: {
        opacity: 0.5
      }
    }
  },
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: 0,
      label: {
        show:true,
        formatter: function (params) {
          let d = echarts.number.parseDate(params.value[0]);
          return d.getDate() + '\n\n' + params.value[2] + '\n\n';
        },
        color: '#000'
      },
      data: lunarData
    },
    {
      type:'scatter',
      coordinateSystem:'calendar',
      symbolSize:0,
      label:{
        show:true,
        formatter:function (params) {
          return '\n\n\n' + (params.value[3] || '')
        },
        fontSize:14,
        fontWeight:700,
        color:'#a00'
      },
      data:lunarData
    },
    {
      name:'降水量',
      type:'heatmap',
      coordinateSystem:'calendar',
      data:heatmapData
    }],
  tooltip:{
    formatter:function (params) {
      return '降水量：' + params.value[1].toFixed(2);
    }
  }



}
echarts.init(document.getElementById('日历图3'))
  .setOption(option3)


// 在日历坐标系中绘制饼图
function getRandom(max,min = 0) {
  return Math.round(Math.random() * (max - min) + min);
}

function getPieSeries(scatterData,chart) {
  return scatterData.map((item,index) => {
    let center = chart.convertToPixel('calendar',item);
    let work = getRandom(24);
    let amusement = getRandom(24 - work);
    let sleep = 24 - work - amusement;
    return {
      id:index + 'pie',
      type:'pie',
      center:center,
      label:{
        formatter:'{c}',
        position:'inside'
      },
      radius:pieRadius,
      data:[
        {name:'工作',value:work,show:true},
        {name:'娱乐',value:amusement,show:true},
        {name:'睡觉',value:sleep,show:true}
      ]
    }
  })
}

function getPieSeriesUpdata(scatterData,chart) {
    return scatterData.map((item,index) => {
      let center = chart.convertToPixel('calendar',item);
      return {
        id:index + 'pie',
        center
      }
    })
    
}

let scatterData = getVirtualData();

let option4 = {
  tooltip:{},
  legend:{
    data:['工作','娱乐','睡觉'],
    bottom:20,
  },
  calendar:{
    top:'middle',
    left:'center',
    orient:'vertical',
    cellSize,
    yearLabel:{
      show:false,
    },
    dayLabel:{
      margin:20,
      firstDay:1,
      nameMap:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    },
    monthLabel:{
      show:false
    },
    range:['2017-02']
  },
  series:[
    {
      id:'label',
      type:'scatter',
      coordinateSystem:'calendar',
      symbolSize:1,
      label:{
        show:true,
        formatter:function (params) {
          return echarts.format.formatTime('dd',params.value[0]);
          
        },
        offset:[-cellSize[0]/2 + 10,-cellSize[1]/2+10],
        fontSize:14
      },
      data:scatterData
    }
  ]
}
let myChart = echarts.init(document.getElementById('日历图4'));
myChart.setOption(option4);
let pieInitialized;
setTimeout(() => {
  pieInitialized = true;
  myChart.setOption(
    {
      series:getPieSeries(scatterData,myChart)
    }
  )
}, 10);

let app = {};
app.onresize = function () {
  if(pieInitialized){
    myChart.setOption({
      series:getPieSeriesUpdata(scatterData,myChart)
    })
  }
}