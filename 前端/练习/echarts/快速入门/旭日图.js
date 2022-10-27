import { books, coffee } from './data/旭日图data.js'

// 简单的旭日图
let option = {
  tooltip: {},
  series: {
    type: 'sunburst',
    itemStyle: {
      color: '#aaa'
    },
    levels: [{},
    {
      itemStyle: {
        color: 'blue'
      }
    },
      // {
      //   itemStyle:{
      //     color:'green'
      //   }
      // }
    ],
    data: [
      {
        name: 'A',
        value: 10,
        children: [
          {
            value: 3,
            name: 'Aa',
            itemStyle: {
              color: 'red'
            }
          },
          {
            name: 'Ab',
            value: 5
          }
        ]
      },
      {
        name: 'B',
        itemStyle: {
          color: 'red'
        },
        children: [
          {
            name: 'Ba',
            value: 4
          },
          {
            name: 'Bb',
            value: 2
          },
        ]
      },
      {
        name: 'C',
        value: 3,
      }
    ]
  }
}


const myChart = echarts.init(document.getElementById('旭日图'));
myChart.setOption(option);

// 书单旭日图
for (let j = 0; j < books.data.length; j++) {

  let level1 = books.data[j].children;
  for (let i = 0; i < level1.length; i++) {
    let block = level1[i].children;
    let bookScore = [];
    let bookScoreId;
    for (let star = 0; star < block.length; star++) {
      let style = (function (name) {
        switch (name) {
          case '5☆':
            bookScoreId = 0;
            return books.itemStyle.star5;
          case '4☆':
            bookScoreId = 1;
            return books.itemStyle.star4;
          case '3☆':
            bookScoreId = 2;
            return books.itemStyle.star3;
          case '2☆':
            bookScoreId = 3;
            return books.itemStyle.star2;

        }
      })(block[star].name);

      block[star].label = {
        color: style.color,
        downplay: {
          opacity: 0.5
        }
      }

      if (block[star].children) {
        style = {
          opacity: 1,
          color: style.color
        };
        block[star].children.forEach(book => {
          book.value = 1;
          book.itemStyle = style;

          book.label = {
            color: style.color
          };
          let value = 1;
          if (bookScoreId === 0 || bookScoreId === 3) {
            value = 5;
          }
          if (bookScore[bookScoreId]) {
            bookScore[bookScoreId].value += value
          }
          else {
            bookScore[bookScoreId] = {
              color: books.colors[bookScoreId],
              value
            }
          }
        })
      }

    }

    level1[i].itemStyle = {
      color: books.data[j].itemStyle.color
    }

  }
}

console.log(books)

let option1 = {
  backgroundColor: books.bgColor,
  color: books.colors,
  series: [
    {
      type: 'sunburst',
      center: ['50%', '50%'],
      data: books.data,
      sort: function (a, b) {
        if (a.depth === 1) {
          return b.getValue() - a.getValue()
        }
        else {
          return a.dataIndex - b.dataIndex;
        }
      },
      label: {
        rotate: 'radial',
        color: books.bgColor
      },
      itemStyle: {
        borderColor: books.bgColor,
        borderWidth: 2
      },
      levels: [
        {},
        {
          r0: 0,
          r: 40,
          label: {
            rotate: 0
          }
        },
        {
          r0: 40,
          r: 105
        },
        {
          r0: 115,
          r: 140,
          itemStyle: {
            shadowBlur: 2,
            shadowColor: books.colors[2],
            color: 'transparent'
          },
          label: {
            rotate: 'tangential',
            fontSize: 10,
            color: books.colors[0]
          }
        },
        {
          r0: 140,
          r: 145,
          itemStyle: {
            shadowBlur: 80,
            shadowColor: books.colors[0]
          },
          label: {
            position: 'outside',
            textShadowBlur: 5,
            textShadowColor: '#333'
          },
          downplay: {
            label: {
              opacity: 0.5
            }
          }
        }
      ]
    }
  ]
}


echarts.init(document.getElementById('旭日图1'))
  .setOption(option1);



// 咖啡分类旭日图
let option2 = {
  title:{
    text:'WORLD COFFEE RESEARCH SENSORY LEXICON',
    subtext:'Source: https://worldcoffeeresearch.org/work/sensory-lexicon/',
    textStyle:{
      fontSize:14,
      align:'center'
    },
    subtextStyle:{
      align:'center'
    },
    sublink:'https://worldcoffeeresearch.org/work/sensory-lexicon/'
  },
  series:{
    type:'sunburst',
    data:coffee.data,
    radius:[0,'95%'],
    sort:null,
    emphasis:{
      focus:'ancestor'
    },
    levels:[{},
    {
      r0:'15%',
      r:'35%',
      itemStyle:{
        borderWidth:2
      },
      label:{
        rotate:'tangential'
      }
    },
    {
      r0:'35%',
      r:'70%',
      label:{
        align:'right'
      }
    },
    {
      r0:'70%',
      r:'72%',
      label:{
        position:'outside',
        padding:3,
        silent:false
      },
      itemStyle:{
        borderWidth:3
      }
    }
    ]
  }
}

echarts.init(document.getElementById('旭日图2'))
  .setOption(option2)