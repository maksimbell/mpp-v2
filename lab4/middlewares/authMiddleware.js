import jwt from 'jsonwebtoken'

export default function (req, res, next) {

    try {
        if (req.path === '/login' || req.path === '/register') {
            return next()
        }
        
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]

        req.user = jwt.verify(token, 'secret')
        next()
        return res.status(200).json({
            message: 'Noice'
        })
    } catch (e) {
        return res.status(401).json({
            message: 'User is not authenticated'
        })
    }
}