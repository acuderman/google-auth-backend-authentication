import { Router } from 'express'
import { verifyToken } from './helpers'
import * as jwt from 'jsonwebtoken'
import { SERVER_PRIVATE_KEY } from '../../config';
import { protectedRoute } from '../../middleware/protected';

const router = Router()

router.post('/token', async (req, res) => {
    const { id_token } = req.body

    let tokenInfo;
    try {
        tokenInfo = await verifyToken(id_token)
    } catch(e) {
        res.status(400).json({
            err_code: 'INVALID_ID_TOKEN' 
        })
        return
    }

    const access_token = jwt.sign({
        email: tokenInfo.email,
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        iss: 'example-auth'
     }, SERVER_PRIVATE_KEY);

     res.status(200).json({
         access_token: access_token,
     })
})

router.post('/verify', protectedRoute ,async (req, res, next) => {
    res.status(200).json()
})

export default router