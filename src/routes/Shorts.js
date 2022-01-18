import React, { useState } from "react";
import axios from "axios";

function Shorts() {
    const LOCAL = 'http://localhost:8080';
    const AWS = "http://13.125.35.82";
    let TEST_SERVER = "http://3.34.19.50:8080"
    const skiResort = "HighOne";
    const tokenHeader =
        { "Authorization": localStorage.getItem('token') };

    const emptyFile = new File([""], "empty");
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState("");
    const [res, setRes] = useState(null);

    const uploadImg = (e) => {
        setVideoFile(e.target.files[0])
        console.log(e.target.files[0]);
    }

    const uploadTitle = (e) => {
        setTitle(e.target.value);
    }

    const onClick = () => {
        const formData = new FormData();
        formData.append('videoFile', videoFile);
        formData.append("title", new Blob([JSON.stringify(title)], { type: "application/json" }))

        axios.post(TEST_SERVER + `/shorts`, formData, { headers: tokenHeader })
            .then((res) => {
                console.log("sucess : ", res);
                console.log(res.data.videoPath);
                setVideoFile(null);
                setTitle("");
                setRes(res.data.videoPath);
            })
    }

    return (
        <div>
            <p><input type="file" onChange={uploadImg} /></p>
            <p>제목 : <input value={title} type="text" onChange={uploadTitle} /></p>
            <button onClick={onClick}>보내기</button>
            <div>
                <video
                    src={res}
                    autoPlay // 자동재생
                    controls
                    muted // 음소거 -> 안하면 좋겠지만 이거 안하면 자동 재생이 안돼요
                    loop // 반복 재생
                >
                </video>
            </div>
        </div>
    );
}

export default Shorts;