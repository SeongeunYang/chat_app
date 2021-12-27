import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import axios from "axios";

function Card({ carpoolType, date, endLocation, memberNum, nickname, notice,
    postId, price, skiResort, startLocation, status, time, userId }) {

    function onClick(e) {
        const SERVER = 'http://localhost:8080';

        let params = new URLSearchParams();
        params.append("name", "카풀채팅");
        axios.post(SERVER + '/chat/room', params)
            .then((response) => {
                    let sender = prompt('대화명을 입력해 주세요.');
                    localStorage.setItem('wschat.sender', sender);
                    localStorage.setItem('wschat.roomId', response.data.roomId);

                    window.location.href = `/chat/room/${userId}`;
                }
            )
            .catch(response => { alert("채팅방 개설에 실패하였습니다."); });
    }

    return (
        <div style={{
            backgroundColor: "skyblue",
            margin: 10,
            padding: 10
        }}>
            <h3>[ {carpoolType} ]</h3>
            <p>{startLocation} ➡ {endLocation}</p>
            <p>📆 {date}   🕓 {time}</p>
            <p>인원 : {memberNum}</p>
            <p>카풀 비용 : {price}</p>
            <p>주의사항 : {notice}</p>
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