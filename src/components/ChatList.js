import axios from "axios";
import PropTypes from "prop-types";


function ChatList({ roomName, roomId }) {
    const SERVER = 'http://localhost:8080';
    const tokenHeader =
        { "Authorization": localStorage.getItem('token') };

    const onClick = () => {
        axios.get(SERVER + `/chat/room/${roomId}`, { headers: tokenHeader })
            .then((response) => {
                    const roomId = response.data.roomId;
                    localStorage.setItem('wschat.roomId', roomId);

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
            display: "table-cell",
            verticalAlign: "middle"
        }}>
            <h3>{roomId} : {roomName}</h3>
        </div>
    );
}

ChatList.propTypes = {
    roomName: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
}

export default ChatList;