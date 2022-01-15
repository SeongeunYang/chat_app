import PropTypes from "prop-types";
import axios from "axios";
import {KAKAO_ADD_PROPERTIES} from "../share/kakaoAuth"
import { Link } from "react-router-dom";

function Card({ carpoolType, date, endLocation, memberNum, nickname, notice,
    postId, price, skiResort, startLocation, status, time, userId }) {

    function onClick(e) {
        const LOCAL = 'http://localhost:8080';
        const AWS = "http://13.125.35.82";
        const tokenHeader =
            { "Authorization": localStorage.getItem('token') };

        axios.post(LOCAL + `/chat/room/${postId}`, {}, { headers: tokenHeader })
            .then((response) => {
                const roomId = response.data.roomId;

                localStorage.setItem('wschat.longRoomId', response.data.longRoomId);
                localStorage.setItem('wschat.roomName', response.data.roomName);
                localStorage.setItem('wschat.roomId', roomId);
                localStorage.setItem('sender', nickname);

                //<Link to="/history">예제</Link>
                window.location.href = "/chat/myroom";
            })
            .catch((err) => {
                if(err.response.data.errorMessage === "추가 동의 항목이 필요합니다."){
                    window.location.href=KAKAO_ADD_PROPERTIES;
                }
                alert(err.response.data.errorMessage);
            });
    }

    return (
        <div style={{
            backgroundColor: "skyblue",
            width: 700,
            margin: 10,
            padding: 10
        }}>
            <h3>[ {carpoolType} ]</h3>
            <p>{startLocation} ➡ {endLocation}</p>
            <p>📆 {date}   🕓 {time}</p>
            <p>인원 : {memberNum}</p>
            <p>카풀 비용 : {price}</p>
            <p>주의사항 : {notice}</p>
            {/* <Link to="/chat/myroom"><button onClick={onClick}>채팅하기</button></Link> */}
            <button onClick={onClick}>채팅하기</button>
        </div>
    );
};

Card.propTypes = {
    carpoolType: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    endLocation: PropTypes.string.isRequired,
    memberNum: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    notice: PropTypes.string.isRequired,
    postId: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    skiResort: PropTypes.string.isRequired,
    startLocation: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired
}

export default Card;