import * as axios from 'axios';

export async function verifyToken(token) {
  return axios.get(`${GOOGLE_OAUTH_BASE_URI}tokeninfo?id_token=${token}`)
}
