import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

function Main() {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const SERVER = 'http://localhost:8080';
    const AWS = "http://13.125.249.172";
    const skiResort = "HighOne";

    const getCards = () => {
        axios.get(AWS + `/board/carpool/${skiResort}?page=1&size=10`)
            .then(function (response) {
                setCards(response.data);
                setLoading(false);
            });
    }

    const Logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href="/login";
        }

        getCards()
    }, [])


    const test = () => {
        window.location.href="/write/freepost";
    }

    return (
        <div>
            <div>
                <button onClick={Logout}>로그아웃 하기!!!!!</button>
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
            <button onClick={test}>자유게시물 쓰기</button>
        </div>
    );
}

export default Main;