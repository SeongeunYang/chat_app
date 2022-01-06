import { useEffect, useState } from "react";
import axios from "axios";
import ChatList from "../components/ChatList";

function MyChatList () {
    const LOCAL = 'http://localhost:8080';
    const AWS = "http://13.125.35.82";

    const [chats, setChats] = useState([]);
    const tokenHeader =
        { "Authorization": localStorage.getItem('token') };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href="/login";
        }

        axios.get(LOCAL + '/chat/rooms', {headers: tokenHeader})
        .then(response => {
            console.log(response.data);
            setChats(response.data);
        });

    }, [])

    return (
        <div>
            <h2>내 채팅 목록</h2>
            <hr />
            <div>{chats.map((item, index) => (
                <ChatList key={index} 
                    roomName={item.roomName} 
                    roomId={item.roomId} 
                    notReadCnt={item.notVerifiedMsgCnt} 
                    lastMsg={item.lastMsg}
                    lastMsgTime={item.lastMsgTime}
                    userProfile={item.userProfile}
                />
            ))}</div>
        </div>
    );
}

export default MyChatList;