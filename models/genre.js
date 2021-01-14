const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const GenreSchema = Schema({
    name:{type: String, require: true, min:4, max:100},
})


// 虚拟属性 url
GenreSchema
 .virtual('url')
 .get(function(){
     return '/catalog/genre/' + this._id;
 })

// 导出
module.exports = mongoose.model('Genre', GenreSchema)