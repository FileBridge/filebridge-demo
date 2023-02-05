import React, { useState } from 'react'
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { Bridge } from './components/Bridge/Bridge';
import { Navbar } from './components/Navbar/Navbar';

export const FileBridge = () => {
    const { address } = useAccount()
    return (
        <>
            <Navbar />
            <Oscillate>
                <BridgeWrapper>
                    <Bridge loggedAddress={address}/>
                </BridgeWrapper>
            </Oscillate>
        </>
    )
}

const Oscillate = styled.div`
    width: 100%;
    height: calc(900px);
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
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
