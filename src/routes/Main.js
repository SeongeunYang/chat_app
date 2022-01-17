import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import {KAKAO_ADD_PROPERTIES} from "../share/kakaoAuth"
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Main() {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const LOCAL = 'http://localhost:8080';
    const AWS = "http://13.125.35.82";
    const tokenHeader = { "Authorization": localStorage.getItem('token') }
    const skiResort = "HighOne";

    const sock = new SockJS(LOCAL + "/ws-alarm");
    const ws = Stomp.over(sock);

    useEffect(async() => {
        let userId = localStorage.getItem('userId');
        await ws.connect(tokenHeader, () => {
            ws.subscribe(`/sub/alarm/${userId}`, function (message) {
                let recv = JSON.parse(message.body);
                console.log("Alarm : ", recv);
            }, tokenHeader);
        }, function (error) {
            // window.location.href="/";
        });
    }, []);

    const getCards = () => {
        axios.get(LOCAL + `/board/carpool/${skiResort}?page=1&size=10`)
            .then(function (response) {
                setCards(response.data);
                setLoading(false);
            });
    }

    const Logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const addKakaoProperties = () => {
        window.location.href = KAKAO_ADD_PROPERTIES;
    }

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = "/login";
        }

        getCards();
    }, [])

    const mychat = () => {
        window.location.href = "/mychats";
    }

    const test1 = () => {
        window.location.href = "/write/freepost";
    }

    const test2 = () => {
        window.location.href = "/write/shorts";
    }

    return (
        <div>
            <div>
                <button onClick={Logout}>로그아웃 하기!!!!!</button>
                <button onClick={mychat}>내 채팅 목록 보기</button>
                {/* <button onClick={addKakaoProperties}>카카오 추가 동의하기</button> */}
            </div>
            {loading ? <h1>서버가 안켜져 있어요 :(</h1> : <div>{cards.map(
                (card) => (
                    <Card
                        key={card.postId}
                        postId={card.postId}
                        userId={card.userId}
                        nickname={card.nickname}
                        notice={card.notice}
                        carpoolType={card.carpoolType}
                        date={card.date}
                        time={card.time}
                        endLocation={card.endLocation}
                        startLocation={card.startLocation}
                        memberNum={card.memberNum}
                        price={card.price}
                        skiResort={card.skiResort}
                        status={card.status}
                    />
                )
            )}</div>}
            <button onClick={test1}>자유게시물 쓰기</button>
            <button onClick={test2}>쇼츠 올리기</button>
        </div>
    );
}

export default Main;