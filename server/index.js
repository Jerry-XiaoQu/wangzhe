const express = require("express")

const app = express()

app.set('secret', 'reergrew3fg')

app.use(require('cors')())
app.use(express.json())
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))
app.use('/uploads', express.static(__dirname + '/uploads'))
require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)


app.listen(3330,() => {
    console.log('服务器启动成功')
})