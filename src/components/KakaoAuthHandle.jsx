import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'
import {KAKAO_ADD_PROPERTIES} from "../share/kakaoAuth"

const KakaoAuthHandle = (props) => {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code')
    const kakaoLogin = async () => {
      await axios
        .get(`http://localhost:8080/user/kakao/callback?code=${code}`)
        .then((res) => {
          localStorage.setItem('token', res.headers.authorization)
          window.location.href = KAKAO_ADD_PROPERTIES;
        })
    }
    kakaoLogin()
  }, [props.history])

  return (
    <>
      <Container></Container>
    </>
  )
}

export default KakaoAuthHandle

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`