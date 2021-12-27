import { useEffect, useState } from "react";
import axios from "axios";

function MyChatList () {
    const LOCAL = 'http://localhost:8080';
    const [chats, setChats] = useState([]);
    const tokenHeader =
        { "Authorization": localStorage.getItem('token') };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href="/login";
        }

        axios.get(LOCAL + '/chat/rooms', {headers: tokenHeader})
        .then(response => {
            console.log(response);
            //setChats(response.data)
        });

    }, [])

    return (
        <div>
            <h1>내 채팅 목록</h1>
        </div>
    );
}

export default MyChatList;