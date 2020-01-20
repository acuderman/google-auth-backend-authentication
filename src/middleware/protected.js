import * as jwt from 'jsonwebtoken'
import { SERVER_PRIVATE_KEY } from '../config'

export async function protectedRoute (req, res, next) {
  try {
    const authorizationToken = req.headers.authorization.replace('Bearer ', '')
    const decodedToken = jwt.verify(authorizationToken, SERVER_PRIVATE_KEY);
    req.tokenData = decodedToken;

    next()
  } catch (e) {
    res.status(401).json({
      err_code: 'INVALID_TOKEN'
    })
  }
}
