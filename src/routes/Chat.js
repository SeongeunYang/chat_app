import React, { useEffect, useState } from "react";
import axios from "axios";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Modal from 'react-modal';

function Chat() {
    const SERVER = 'http://localhost:8080';
    const tokenHeader =
        { "Authorization": localStorage.getItem('token') }

    const roomId = localStorage.getItem('wschat.roomId');
    const lsroomName = localStorage.getItem('wschat.roomName');
    const sender = localStorage.getItem('wschat.sender');

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [roomName, setRoomName] = useState(lsroomName);
    const [longRoomId, setLongRoomId] = useState(localStorage.getItem('wschat.longRoomId'));
    const [msg, setMsg] = useState("");
    const [msgList, setmsgList] = useState([]);

    const defaultInfo = {
        ageRange: "비공개",
        career: "비공개",
        gender: "비공개",
        nickname: "비공개",
        profileImg: "미설정",
        selfIntro: "비공개",
        vacImg: "미설정"
    }

    const [otherInfo, setOtherInfo] = useState(defaultInfo);

    const sock = new SockJS(SERVER + "/ws-stomp");
    const ws = Stomp.over(sock);

    // useEffect(() => {
    //     console.log(history.block());
    // }, [history])

    useEffect(() => {
        ws.connect(tokenHeader, () => {
            ws.subscribe(`/sub/chat/room/${roomId}`, function (message) {
                let recv = JSON.parse(message.body);
                console.log("recv : ", recv);
                recvMessage(recv);
            }, tokenHeader);
        }, function (error) {
            // window.location.href="/";
        });

        axios.get(SERVER + `/chat/message/${roomId}`, { headers: tokenHeader })
            .then((res) => {
                const recvMsgs = res.data;
                console.log("response : ", recvMsgs);
                setmsgList(recvMsgs);
            })

        return function cleanup() {
            ws.disconnect();
        }
    }, []);

    const closeSocket = () => {
        ws.disconnect();
    }

    const onClick = () => {
        setModalIsOpen(true)
        axios.get(SERVER + `/user/introduction/${longRoomId}`, { headers: tokenHeader })
            .then((res) => {
                setOtherInfo(res.data);
            })
    }

    const onChange = (e) => {
        setMsg(e.target.value);
    }

    const sendMessage = () => {
        ws.send("/pub/chat/message", tokenHeader, JSON.stringify({ type: 'TALK', roomId: roomId, message: msg }));
        setMsg("");
    }

    const recvMessage = (recv) => {
        setmsgList((prev) => [...prev, recv]);
    }

    return (
        <div>
            <div>
                <h2>방 제목 : {roomName}</h2>
                <Modal isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={() => setModalIsOpen(false)} >
                    <div><img style={{ width: 100, height: 100 }} src={otherInfo.profileImg} /></div>
                    <h3>{otherInfo.nickname} | {otherInfo.gender} {otherInfo.ageRange} {otherInfo.career}</h3>
                    <h3>자기소개 한마디 : {otherInfo.selfIntro}</h3>
                    <div><img style={{ width: 100, height: 100 }} src={otherInfo.vacImg} /></div>
                    <button onClick={() => setModalIsOpen(false)}>닫기</button>
                </Modal>
                <button onClick={onClick}>상대방 프로필 확인하기</button>
            </div>
            <div>
                <label>내용</label><input type="text" value={msg} onChange={onChange} />
                <button type="button" onClick={sendMessage}>보내기</button>
            </div>
            <hr />
            {msgList && msgList.map((item) => (
                <div key={item.messageId}>
                    <img src={item.senderImg} style={{
                        width: 50,
                        height: 50
                }}/>
                    <h3>{item.sender} : {item.message} ({item.createdAt})</h3>
                </div>
            ))}
        </div>
    )
}

export default Chat;