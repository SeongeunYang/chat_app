import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
    // const LOCAL = 'http://localhost:8080';
    const AWS = "http://13.125.249.172";

    const [id, setId] = useState("tjddms12");
    const [pw, setPw] = useState("diddl123!");

    const onChangeID = (e) => {
        setId(e.target.value);
    }

    const onChangePW = (e) => {
        setPw(e.target.value);
    }

    const onClickLogin = () => {
        axios.post(AWS + '/user/login', {
            username: id,
            password: pw,
        }).then((res) => {
            console.log(res.data);
            console.log(res.headers.authorization);
            localStorage.setItem('token', res.headers.authorization);
            window.location.href = "/";
        }).catch((err) => { alert(err, " 로그인 실패"); });
    }

    useEffect(() => {
        axios.post(AWS + '/user/signup', {
            username: "tjddms12",
            password: "diddl123!",
            phoneNum: "01012341234",
            nickname: "tjdkl111",
        }).then((res) => {
            alert("회원가입 완료");
        })
        .catch((err) => { alert("이미 회원임..!") });
    }, []);

    return (
        <div>
            <p>ID : <input value={id} type="text" onChange={onChangeID} /></p>
            <p>PW : <input value={pw} type="text" onChange={onChangePW} /></p>
            <button onClick={onClickLogin}>로그인</button>
        </div>
    );
}

export default Login;