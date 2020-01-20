import { Router } from 'express'
import { verifyToken } from './helpers'
import * as jwt from 'jsonwebtoken'
import { SERVER_PRIVATE_KEY } from '../../config';
import { protectedRoute } from '../../middleware/protected';

const router = Router()

router.post('/token', async (req, res) => {
    const { id_token, youtube_access_token } = req.body

    try {
        await verifyToken(id_token)
    } catch(e) {
        res.status(400).json({
            err_code: 'INVALID_ID_TOKEN' 
        })
        return
    }

    const access_token = jwt.sign({ 
        youtube_api: youtube_access_token,
        role: 'admin',
        exp: parseInt(youtubeTokenData.data.exp),
        iss: 'famnit-tutorials'
     }, SERVER_PRIVATE_KEY);

     res.status(200).json({
         access_token: access_token,
     })
})

router.post('/verify', protectedRoute ,async (req, res, next) => {
    res.status(200).json()
})

export default router