import axios from "axios";

const LOCAL = 'http://localhost:8080';
const AWS = "http://13.125.249.172";

const api = axios.create({
    baseURL: LOCAL,
})

export const apis = {

    testsignup: (id, pw, phNum, nick) =>
        api.post('/user/test/signup', {
            username: id,
            password: pw,
            phoneNum: phNum,
            nickname: nick,
        }).then((res) => {
            console.log(res.data);
            console.log(res.headers.authorization);
            localStorage.setItem('token', res.headers.authorization);
            window.location.href = "/";
        }).catch((err) => { alert("로그인 실패"); }),

    login: (id, pw) =>
        api.post('/user/login', {
            username: id,
            password: pw,
        }).then((res) => {
            alert("회원가입 완료");
        })
            .catch((err) => { alert("이미 회원임..!") }),

};
