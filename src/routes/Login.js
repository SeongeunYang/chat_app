import { useEffect, useState } from "react";
import axios from "axios";
import {KAKAO_AUTH_URL} from "../share/kakaoAuth"
import {NAVER_AUTH_URL} from "../share/naverAuth"

function Login() {
    const LOCAL = 'http://localhost:8080';
    const AWS = "http://13.125.35.82";
    let TEST_SERVER = "http://3.34.19.50:8080"

    const [id, setId] = useState("tjddm12");
    const [pw, setPw] = useState("diddl123!");

    const onChangeID = (e) => {
        setId(e.target.value);
    }

    const onChangePW = (e) => {
        setPw(e.target.value);
    }

    const onClickLogin = () => {
        axios.post(LOCAL + '/user/login', {
            username: id,
            password: pw,
        }).then((res) => {
            console.log(res.data);
            console.log(res.headers.authorization);
            localStorage.setItem('token', res.headers.authorization);
            window.location.href = "/";
        }).catch((err) => { alert(err, " 로그인 실패"); });
    }

    const signUp = () => {
        axios.post(LOCAL + '/user/signup', {
            username: "tjddm12",
            password: "diddl123",
            phoneNum: "01012343234",
            nickname: "tjdkl11",
        }).then((res) => {
            alert("회원가입 완료");
        })
        .catch((err) => { alert("이미 회원임..!") });
    }

    const kakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    const naverLogin = () => {
        window.location.href = NAVER_AUTH_URL;
    }

    return (
        <div>
            <p>ID : <input value={id} type="text" onChange={onChangeID} /></p>
            <p>PW : <input value={pw} type="text" onChange={onChangePW} /></p>
            <button onClick={onClickLogin}>로그인</button>
            <button onClick={signUp}>일반 회원가입</button>
            <button onClick={kakaoLogin}>카카오 로그인</button>
            <button onClick={naverLogin}>네이버 로그인</button>
        </div>
    );
}

export default Login;