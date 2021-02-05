const express = require("express")

const app = express()

app.set('secret', 'reergrew3fg')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3330,() => {
    console.log('服务器启动成功')
})