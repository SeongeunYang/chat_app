import { useEffect, useState } from "react";
import axios from "axios";

function FreePost() {
    const SERVER = 'http://localhost:8080';
    const AWS = "http://13.125.249.172";
    const skiResort = "HighOne";
    const tokenHeader =
        { "Authorization": localStorage.getItem('token') }
    const [img, setImg] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const uploadImg = (e) => {
        setImg(e.target.files[0])
        console.log(e.target.files[0]);
    }

    const uploadTitle = (e) => {
        setTitle(e.target.value);
    }

    const uploadContent = (e) => {
        setContent(e.target.value);
    }


    const onClick = () => {

        const requestDto = {
            title: title,
            content: content
        }

        const formData = new FormData();
        formData.append('image', img);
        formData.append("requestDto", new Blob([JSON.stringify(requestDto)], {type: "application/json"}))

        axios.post(SERVER + `/board/${skiResort}/freeBoard`, formData, {headers: tokenHeader})
            .then((res)=>{
                console.log(res);
            })
    }

    return (
        <div>
            <input type="file" onChange={uploadImg} />
            <input type="text" onChange={uploadTitle} />
            <input type="text" onChange={uploadContent} />
            <button onClick={onClick}>보내기</button>
        </div>
    );
}

export default FreePost;