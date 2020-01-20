import { Router } from 'express'
import { protectedRoute } from '../../middleware/protected'
const router = Router()

router.get('/example', protectedRoute, async (req, res) => {
    
    res.status(200).json({ data: req.tokenData })
})

export default router