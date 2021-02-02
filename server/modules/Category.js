const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category',schema)