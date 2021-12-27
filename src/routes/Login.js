import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
    const SERVER = 'http://localhost:8080';
    const [id, setId] = useState("diddl12");
    const [pw, setPw] = useState("tjddms123!");

    const onChangeID = (e) => {
        setId(e.target.value);
    }

    const onChangePW = (e) => {
        setPw(e.target.value);
    }

    const onClickLogin = () => {
        axios.post(SERVER + "/user/login", { username: id, password: pw })
            .then((response) => {
                console.log(response.data);
                console.log(response.headers.authorization);
                localStorage.setItem('token', response.headers.authorization);
                window.location.href = "/";
            })
            .catch((err) => { alert("로그인 실패"); });
    }

    useEffect(()=>{
        axios.post(SERVER + "/user/test/signup", { username: "diddl12", password: "tjddms123!", phoneNum:"01012341234", nickname:"tjdkl" })
            .then((res) => {
                alert("회원가입 완료");
            })
            .catch((err)=>{alert("이미 회원임..!")})
    }, []);

    return (
        <div>
            <p>ID : <input value="diddl12" type="text" onChange={onChangeID} /></p>
            <p>PW : <input value="tjddms123!" type="text" onChange={onChangePW} /></p>
            <button onClick={onClickLogin}>로그인</button>
        </div>
    );
}

export default Login;