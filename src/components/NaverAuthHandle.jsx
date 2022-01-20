import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'

const NaverAuthHandle = (props) => {
    let LOCAL = "localhost:8080"
    let TEST_SERVER = "3.34.19.50:8080"
    let NGINX = "seongeunyang.shop"
    useEffect(() => {
        let code = new URL(window.location.href).searchParams.get('code')
        const kakaoLogin = async () => {
            await axios
                .get(`https://${NGINX}/user/naver/callback?code=${code}`)
                .then((res) => {
                    localStorage.setItem('token', res.headers.authorization)
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

export default NaverAuthHandle

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`