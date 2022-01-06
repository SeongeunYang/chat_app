import axios from "axios";
import PropTypes from "prop-types";


function ChatList({ roomName, roomId, notReadCnt, lastMsg, lastMsgTime, userProfile }) {
    const SERVER = 'http://localhost:8080';
    const AWS = "http://13.125.35.82";

    const tokenHeader =
        { "Authorization": localStorage.getItem('token') };

    const onClick = () => {
        axios.get(AWS + `/chat/room/${roomId}`, { headers: tokenHeader })
            .then((response) => {
                    const roomId = response.data.roomId;
                    localStorage.setItem('wschat.roomId', roomId);
                    localStorage.setItem('wschat.longRoomId', response.data.longRoomId);

                    window.location.href = `/chat/myroom/${roomId}`;
                }
            )
            .catch(response => { alert("존재하지 않는 채팅방입니다."); });
    }

    return (
        <div onClick={onClick} style={{
            backgroundColor: "skyblue",
            width: 800,
            height: 50,
            display: "table-row-group",
            verticalAlign: "middle",
        }}>
            <img src={userProfile} style={{
                width: 50,
                height: 50
            }} />
            <h3>{roomName} | {lastMsg}({lastMsgTime})</h3>
            <h4>안 읽은 메세지 : {notReadCnt}개</h4>
        </div>
    );
}

ChatList.propTypes = {
    roomName: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
    notReadCnt: PropTypes.number.isRequired,
    lastMsg: PropTypes.string.isRequired,
    lastMsgTime: PropTypes.string.isRequired,
    userProfile: PropTypes.string.isRequired,
}

export default ChatList;