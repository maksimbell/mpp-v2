import jwt from 'jsonwebtoken'

export default function (req, res, next) {

    // next()
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        if (req.headers.cookie) {
            const token = req.headers.cookie.substring(4)
        }
        if (!token) {
            res.status(401).json({
                message: 'You are not logged in, please log in to your account'
            })
        }

        const data = jwt.verify(token, 'secret')

        req.user = data

        next()
    } catch (e) {
        console.log(e)
        res.status(403).json({
            message: 'Access denied'
        })
    }

}