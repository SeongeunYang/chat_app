import React,{ useState } from "react";
import axios from "axios";

function FreePost() {
    const LOCAL = 'http://localhost:8080';
    const AWS = "http://13.125.35.82";
    const skiResort = "HighOne";
    const tokenHeader =
        { "Authorization": localStorage.getItem('token') };

    const emptyFile = new File([""], "empty");
    const [img, setImg] = useState(null);
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
        formData.append("requestDto", new Blob([JSON.stringify(requestDto)], { type: "application/json" }))

        axios.post(LOCAL + `/board/${skiResort}/freeBoard`, formData, { headers: tokenHeader })
            .then((res) => {
                console.log("sucess : ", res);
                setImg(null);
                setTitle("");
                setContent("");
                window.location.href="/";
            })
    }

    return (
        <div>
            <p><input type="file" onChange={uploadImg} /></p>
            <p>제목 : <input type="text" onChange={uploadTitle} /></p>
            <p>내용 : <input type="text" onChange={uploadContent} /></p>
            <button onClick={onClick}>보내기</button>
        </div>
    );
}

export default FreePost;