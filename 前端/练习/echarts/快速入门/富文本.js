const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
const weatherIcons = {
  'Sunny': ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
  'Cloudy': ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
  'Showers': ROOT_PATH + '/data/asset/img/weather/showers_128.png'
}

const option = {
  title:{
    text:'天气情况',
    subtext:'虚构数据',
    left:'center'
  },
  tooltip:{
    trigger:'item',
    formatter:'{a} <br/>{b} : {c} ({d}%)'
  },
  legend:{
    bottom:10,
    left:'center',
    data:['西凉','益州','兖州','荆州','幽州']
  },
  series:[
    {
      type:'pie',
      radius:'65%',
      center:['50%','50%'],
      selectedMode:'single',
      data:[
        {
          name:'幽州',
          value:1548,
          label:{
            formatter:[
              '{title|{b}}{abg|}',
              ' {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
              '{hr|}',
              ' {Sunny|}{value|202}{rate|55.3%}',
              ' {Cloudy|}{value|142}{rate|38.9%}',
              ' {Showers|}{value|21}{rate|5.8%}'
            ].join('\n'),
            backgroundColor:'#eee',
            borderColor:'#777',
            borderWidth:1,
            borderRadius:4,
            rich:{
              title:{
                color:'#eee',
                align:'center'
              },
              abg:{
                backgroundColor:'#333',
                width:'100%',
                align:'right',
                height:25,
                borderRadius:[4,4,0,0]
              },
              Sunny:{
                height:30,
                align:'left',
                backgroundColor:{
                  image:weatherIcons.Sunny
                }
              },
              Cloudy:{
                height:30,
                align:'left',
                backgroundColor:{
                  image:weatherIcons.Cloudy
                }
              },
              Showers:{
                height:30,
                align:'left',
                backgroundColor:{
                  image:weatherIcons.Showers
                }
              },
              weatherHead:{
                color:'#333',
                height:24,
                align:'left'
              },
              hr:{
                borderColor:'#777',
                width:'100%',
                borderWidth:0.5,
                height:0
              },
              value:{
                width:20,
                padding:[0,20,0,30],
                align:'left'
              },
              valueHead:{
                color:'#333',
                width:20,
                padding:[0,20,0,30],
                align:'center'
              },
              rate:{
                width:40,
                align:'right',
                padding:[0,10,0,0]
              },
              rateHead:{
                color:'#333',
                width:40,
                align:'center',
                padding:[0,10,0,0]
              }
            }
          }
        },
        {name:'荆州',value:735},
        {name:'兖州',value:510},
        {name:'益州',value:434},
        {name:'西凉',value:335}
      ],
      emphasis:{
        itemStyle:{
          shadowBlur:10,
          shadowOffsetX:0,
          shadowColor:'rgba(0,0,0,0.5)'
        }
      }
    }
  ]
}

echarts.init(document.getElementById('富文本'))
.setOption(option);