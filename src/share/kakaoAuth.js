const CLIENT_ID = 'af4c2105b17debc9c5ba96f70c6ee0b9'
const REDIRECT_URI =
  'http://localhost:3000/user/kakao/callback'

const REDIRECT_URI_PRO = 'http://localhost:3000/user/kakao/callback/properties'

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

export const KAKAO_ADD_PROPERTIES = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_PRO}&response_type=code&scope=gender,age_range`