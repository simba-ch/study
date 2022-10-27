const Class = require('./Class').class
const Student = require('./Student').student
Class.hasMany(Student)
Student.belongsTo(Class)