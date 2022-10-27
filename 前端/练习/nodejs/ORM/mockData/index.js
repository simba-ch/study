const Mock = require('mockjs')

//mock学生数据
const students = Mock.mock({
  'students|500-1000': [{
    name: '@cname',
    birthday: '@date',
    sex: '@natural(0,1)',
    mobile: `@natural(${10 ** 10},${2 * 10 ** 10 - 1})`,
    'ClassId|1-16': 0
  }]
}).students

//mock班级数据
const classes = Mock.mock({
  'classes|16': [{
    'name|+1': `渡一教育 第 ${1} 期`,
    'openData': '@date'
  }]
}).classes


exports.studentsData = students;
exports.classesData = classes;