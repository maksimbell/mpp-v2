import jwt from 'jsonwebtoken'

export default function (req, res, next) {

    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        let token = null
        if (req.headers.cookie) {
            token = req.headers.cookie.substring(4)
            const data = jwt.verify(token, 'secret')
            req.user = data
            next()
        }
        if (!token) {
            res.status(401).json({
                message: 'You are not logged in, please log in to your account'
            })
            // res.redirect(401, '/login')
            // res.status(401).location('/login').end();
        }

    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: 'Access denied'
        })
    }

}