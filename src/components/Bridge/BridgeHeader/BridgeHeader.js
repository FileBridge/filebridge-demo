import React from 'react'
import styled from 'styled-components';

export const BridgeHeader = () => {
    return (
        <BridgeHeaderWrapper>
            <h1>
                Bridge
            </h1>
            <img src='/assets/settings.svg' width={34} height={34} />
        </BridgeHeaderWrapper>
    )
}

const BridgeHeaderWrapper = styled.div`
    color: #222222;
    border-bottom: 2px solid #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 20px;
    h1 {
        font-size: 32px;
    }
`;
