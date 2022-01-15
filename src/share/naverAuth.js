const CLIENT_ID = 'XixDTjoKiTwLZf5WpyKv'
const REDIRECT_URI =
  'http://localhost:3000/user/naver/callback'

export const NAVER_AUTH_URL = `	https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`