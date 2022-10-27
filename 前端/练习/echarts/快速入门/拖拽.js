import  {data,symbolSize} from './data/拖拽data.js';

const myChart = echarts.init(document.getElementById('拖拽'));

myChart.setOption({
  tooltip:{
    triggerOn:'none',
    formatter:function (params) {
      return 'X: ' + params.data[0].toFixed(2) + '</br>Y: ' + params.data[1].toFixed(2);
    }
  },
  xAxis:{
    min:-100,
    max:80,
    type:'value',
    axisLine:{onZero:false}
  },
  yAxis:{
    min:-30,
    max:60,
    type:'value',
    axisLine:{onZero:false}
  },
  series:{
    id:'a',
    type:'line',
    smooth:true,
    symbolSize,
    data
  }
})

myChart.setOption({
  graphic:echarts.util.map(data,function (item,dataIndex) {
      return {
        type:'circle',
        position:myChart.convertToPixel('grid',item),
        shape:{
          r:symbolSize / 2
        },
        invisible:true,
        draggable:true,
        ondrag:echarts.util.curry(onPointDragging,dataIndex),
        onmousemove:echarts.util.curry(showTooltip,dataIndex),
        onmouseout:echarts.util.curry(hideTooltip,dataIndex),
        z:100
      }
  })
})

window.addEventListener('resize',function () {
  myChart.setOption({
    graphic:echarts.util.map(data,function (item) {
      return {
        position:myChart.convertToPixel('grid',item)
      }
    })
  })
})

myChart.on('dataZoom', updatePosition);

function showTooltip(dataIndex) {
    myChart.dispatchAction({
      type:'showTip',
      seriesIndex:0,
      dataIndex
    })
}

function hideTooltip(params) {
  myChart.dispatchAction({
    type:'hideTip'
  })
}

function onPointDragging(dataIndex,dx,dy) {
    data[dataIndex] = myChart.convertFromPixel('grid',this.position);
    myChart.setOption({
      series:{
        id:'a',
        data
      }
    })
}

function updatePosition() {
  myChart.setOption({
      graphic: data.map(function (item, dataIndex) {
          return {
              position: myChart.convertToPixel('grid', item)
          };
      })
  });
}
