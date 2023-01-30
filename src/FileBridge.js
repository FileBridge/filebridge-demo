import React, { useState } from 'react'
import styled from 'styled-components';
import { Bridge } from './components/Bridge/Bridge';
import { Navbar } from './components/Navbar/Navbar';

export const FileBridge = () => {

    return (
        <>
            <Navbar />
            <Oscillate>
                <BridgeWrapper>
                    <Bridge />
                </BridgeWrapper>
            </Oscillate>
        </>
    )
}

const Oscillate = styled.div`
    width: 100%;
    height: 900px;
    scroll-behavior: smooth;
    /* height: 100vh; */
    background-image: url('/assets/oooscillate.svg');
    
    /* background-repeat: no-repeat; */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* margin-top: 20px; */
`;

const BridgeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
`;
