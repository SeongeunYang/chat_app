import React, { Component } from 'react';
import { Snowfall, Snowflake } from 'react-snowflakes';
import styled from "styled-components";

function Snow() {
    return (
        // <img src='https://skifriendbucket.s3.ap-northeast-2.amazonaws.com/freepost/389251b8-82f6-424e-85be-5006986b4236SkifriendBackImg.png' style={{width: '1500px', height: '800px'}}>
        //     <Snowfall count={50}
        //         style={{
        //             position: 'relative',
        //             width: '1500px',
        //             height: '800px'
        //         }}
        //         snowflakeFactory={index => {
        //             const size = index / 50; // 50 is the number of snowflakes.
        //             const w = 5 + 10 * size + 'px';
        //             return (
        //                 <Snowflake speed={.05 + size * 2}
        //                     xSpeedPrc={.3 * size}
        //                     ySpeedPrc={.1 * size}
        //                     style={{
        //                         width: w,
        //                         height: w,
        //                         borderRadius: '50%',
        //                         backgroundColor: 'white',
        //                         opacity: .2 + .8 * size,
        //                         filter: `blur(${Math.round(Math.max(size - .5, 0) * 15)}px)`
        //                     }} />
        //             )
        //         }} />
        // </img>

        <Container>
            <Snowfall count={50}
                style={{
                    position: 'relative',
                    width: '1500px',
                    height: '700px'
                }}
                snowflakeFactory={index => {
                    const size = index / 50; // 50 is the number of snowflakes.
                    const w = 5 + 10 * size + 'px';
                    return (
                        <Snowflake speed={.05 + size * 2}
                            xSpeedPrc={.3 * size}
                            ySpeedPrc={.1 * size}
                            style={{
                                width: w,
                                height: w,
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                opacity: .2 + .8 * size,
                                filter: `blur(${Math.round(Math.max(size - .5, 0) * 15)}px)`
                            }} />
                    )
                }} />
        </Container>
    )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(https://skifriendbucket.s3.ap-northeast-2.amazonaws.com/freepost/7a099123-6907-4011-be6e-f8cad9815d7aSkifriendBackImg%20%282%29.png);
  background-size: cover;
`;
{/* <img src='https://skifriendbucket.s3.ap-northeast-2.amazonaws.com/freepost/389251b8-82f6-424e-85be-5006986b4236SkifriendBackImg.png' /> */ }
export default Snow;