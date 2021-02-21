module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const User = require('../../modules/AdminUser')
    const jwt = require('jsonwebtoken')
    //登陆校验
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')
    const router = express.Router({
        mergeParams: true
    }
    )
    router.post('/', authMiddleware(), async (req,res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.put('/:id', authMiddleware(), async (req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    router.delete('/:id', authMiddleware(),async (req,res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    router.get('/', authMiddleware(),async (req,res) => {
        let queryOptions = {}
        if( req.Model.modelName === 'Category' ){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    router.get('/:id', async (req,res) => {
        const items = await req.Model.findById(req.params.id)
        res.send(items)
    })
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req,res) => {
        const file = req.file
        file.url = `http://localhost:3330/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req,res) => {
        const { username, password } = req.body
        const user = await User.findOne({username}).select('+password')
        assert(user, 422, '用户不存在')
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        const token = jwt.sign({
            id:user._id
        },app.get('secret'))
        res.send({token})
    })

    //错误处理
    app.use(async (err,req,res,next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
} 