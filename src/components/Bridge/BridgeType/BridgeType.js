import React, { useState } from 'react'
import styled from 'styled-components';

export const BridgeType = ({type, setType}) => {

    return (
        <BridgeTypeWrapper>
            <Button clicked={type === 'token' ? true : false} onClick={() => setType('token')}>
                <h1>Token</h1>
            </Button>
            <Button clicked={type === 'NFT' ? true : false} onClick={() => setType('NFT')}>
                <h1>NFT</h1>
            </Button>
        </BridgeTypeWrapper>
    )
}

const BridgeTypeWrapper = styled.div`
    background-color: #0090FF;
    display: flex;
    gap: 0px;
    min-width: 500px;
    color: white;
    border-radius: 150px 150px 0px 0px;
    padding: 8px 12px;
    /* margin-top: -30px; */
    margin-bottom: -40px;
    align-self: center;
    filter:  drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    @media (max-width: 768px) {
        min-width: 300px;
    }
`;

const Button = styled.button`
    flex: 1;
    padding: 5px ;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 150px 150px 0px 0px;
    ${({ clicked }) => clicked && `
        background-color: white;
        color: #094067;
    `};
`;