import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'

const KakaoAuthHandle2 = (props) => {
    useEffect(() => {
      let code = new URL(window.location.href).searchParams.get('code')
      let userId = localStorage.getItem('userId')
      const kakaoLogin = async () => {
        await axios
          .get(`http://localhost:8080/user/kakao/callback/${userId}?code=${code}`)
          .then((res) => {
            console.log("window.location.href = / 실행")
            console.log(res.data);
            window.location.href = "/";
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


export default KakaoAuthHandle2

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`