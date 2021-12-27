import { useEffect, useState } from "react";
import axios from "axios";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import react from "react";
import { type } from "@testing-library/user-event/dist/type";

function Chat() {
    const SERVER = 'http://localhost:8080';
    const tokenHeader =
        { "token": localStorage.getItem('token').split(" ")[1] }

    const roomId = localStorage.getItem('wschat.roomId');
    const sender = localStorage.getItem('wschat.sender');

    const [roomName, setRoomName] = useState("");
    const [msg, setMsg] = useState("");
    const [msgList, setmsgList] = useState([]);

    const sock = new SockJS(SERVER + "/ws-stomp");
    const ws = Stomp.over(sock);


    useEffect(() => {
        ws.connect(tokenHeader, () => {
                ws.subscribe(`/sub/chat/room/${roomId}`, function (message) {
                    let recv = JSON.parse(message.body);
                    console.log("recv : ", recv);
                    recvMessage(recv);
                });
            }, function (error) {
                alert("error " + error);
            });

        axios.get(SERVER + `/chat/room/${roomId}`)
            .then((response) => {
                setRoomName(response.data.name);
            })
            .catch((err) => { alert("입장 실패"); });
    }, []);

    const onChange = (e) => {
        setMsg(e.target.value);
    }

    const sendMessage = () => {
        ws.send("/pub/chat/message", tokenHeader, JSON.stringify({ type: 'TALK', roomId: roomId, message: msg }));
        setMsg("");
    }

    const recvMessage = (recv) => {
        setmsgList(prev => [recv, ...prev]);
    }

    return (
        <div>
            <div>
                <h2>{roomName}방에 입장하셨습니다.</h2>
            </div>
            <div>
                <label>내용</label><input type="text" value={msg} onChange={onChange} />
                <button type="button" onClick={sendMessage}>보내기</button>
            </div>
            <hr />
            <div>{msgList.map((item, index) => (
                    <h3 key={index}>{item.sender} : {item.message}</h3>
                )
            )}</div>
        </div >
    )
}

export default Chat;