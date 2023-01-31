import React from 'react'
import styled from 'styled-components'
import { ConnectWallet } from '../ConnectWallet/ConnectWallet'
import { BridgeHeader } from './BridgeHeader/BridgeHeader'
import { BridgeType } from './BridgeType/BridgeType'
import { ChainSelector } from './ChainSelector/ChainSelector'

export const Bridge = () => {

    const swapChains = () => {

    }

    return (
        <>
            <BridgeType />
            <BridgeForm>
            
                <BridgeHeader />
                <BridgeContent>
                    <>
                        <h1>From</h1>
                        <ChainSelector />
                    </>
                    <>
                    <ArrowButton onClick={() => swapChains()}>
                        <img src='/assets/arrow.svg' width={24} height={24} />
                    </ArrowButton>
                    </>
                    <>
                    <h1>To</h1>
                    <ChainSelector />
                    </>
                    <ConnectWallet />
                </BridgeContent>

            </BridgeForm>
        </>
    )
}

const ArrowButton = styled.button`
        background-color: #F4F4F4;
        border: 1px solid #BEBEBE;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        align-self: center;
        justify-self: center;
        margin: 25px 0px -15px 0px;
        cursor: pointer;
`;

const BridgeContent = styled.div`
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    h1 {
        color: hsla(0, 0%, 31%, 1);
        margin: 5px;
    }

    
`;

const BridgeForm = styled.div`
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: white;
    border: 1px solid #CECECE;
    border-radius: 10px;
    min-width: 800px;
    margin-top: 20px;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        min-width: 300px;
    }
`;
