import axios from "axios";

const LOCAL = 'http://localhost:8080';
const AWS = "http://13.125.35.82";

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
        }),

    login: (id, pw) =>
        api.post('/user/login', {
            username: id,
            password: pw,
        }),

};
