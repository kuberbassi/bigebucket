import jwt from 'jsonwebtoken'

const auth = async(request,response,next)=>{
    try {
        // Prefer cookie token, fall back to Authorization header (Bearer)
        const headerAuth = request.headers && request.headers.authorization ? request.headers.authorization : null
        const tokenFromHeader = headerAuth && headerAuth.startsWith('Bearer ') ? headerAuth.split(' ')[1] : null
        const token = (request.cookies && request.cookies.accessToken) || tokenFromHeader

        if(!token){
            // Keep the message the frontend UI expects
            return response.status(401).json({
                message : "You have not login",
                error: true,
                success: false
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return response.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }

        request.userId = decode.id

        // Debug log for development: token source
        try {
            const src = request.cookies && request.cookies.accessToken ? 'cookie' : (tokenFromHeader ? 'header' : 'none')
            console.debug(`Auth: token source=${src} tokenLen=${token ? token.length : 0}`)
        } catch (e) {
            // ignore logging errors
        }

        next()

    } catch (error) {
        // Token verify failed or other auth error: log info to server console to help debugging
        console.error('Auth middleware error:', error && error.message ? error.message : error)

        // Map common jwt errors to a friendly message used by the frontend UI.
        if (error && error.name === 'TokenExpiredError') {
            return response.status(401).json({
                message: 'Access token expired',
                error: true,
                success: false
            })
        }

        // Fallback message (match the UI wording used in the client toast)
        return response.status(401).json({
            message: 'You have not login',
            error: true,
            success: false
        })
    }
}

export default auth