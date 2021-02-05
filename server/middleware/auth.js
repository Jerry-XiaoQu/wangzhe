module.exports = option => {
    const jwt = require('jsonwebtoken')
    const User = require('../modules/AdminUser')
    const assert = require('http-assert')
    return async (req,res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请提供jwt token')
        const { id } = jwt.verify(token,req.app.get('secret'))
        assert(id, 401, '无效token')
        req.user = await User.findById(id)
        assert(req.user, 401, '请先登陆')
        await next()
    }
}