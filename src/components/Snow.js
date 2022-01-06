import React, { Component } from 'react';
import { Snowfall, Snowflake } from 'react-snowflakes';

function Snow() {
    return (
        <div style={{backgroundColor: 'black',
                    width: '1500px',
                    height: '800px'}}>
            <Snowfall count={50}
                style={{
                    position: 'relative',
                    width: '1500px',
                    height: '800px'
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
        </div>
    )
}

export default Snow;