const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    icon: String
})

module.exports = mongoose.model('Item',schema)