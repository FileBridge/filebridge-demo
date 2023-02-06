import React, { useState } from 'react'
import styled from 'styled-components';
import { Bridge } from './components/Bridge/Bridge';
import { Navbar } from './components/Navbar/Navbar';
import { Swap } from './components/Swap/Swap';

export const FileBridge = () => {

    const [type, setType] = useState('Bridge');

    return (
        <>
            <Navbar value={type} setValue={setType} />
            <Oscillate>
                {type === "Bridge" ? (
                    <Wrapper>
                        <Bridge />
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <Swap />
                    </Wrapper>
                )}

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

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
