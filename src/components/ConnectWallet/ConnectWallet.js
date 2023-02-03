import { useConnectModal } from '@rainbow-me/rainbowkit';
import React from 'react'
import styled from 'styled-components';
import { useAccount } from 'wagmi';

export const ConnectWallet = ({approval, checkApproval, amount, bridge}) => {

    const { isDisconnected } = useAccount()
    const { openConnectModal } = useConnectModal();
    const handleClick = () => {
        if (isDisconnected) {
           openConnectModal()
        } else {
            console.log(approval)
            // approval?.()
            bridge?.()
        }
    }

  return (
    <>
    <Button onClick={() => handleClick()}>
        {isDisconnected ? 'Connect Wallet' : 'Bridge'}
    </Button>
    </>
  )
}

const Button = styled.button`
    padding: 20px;
    margin: 20px 0px;
    font-size: 25px;
    color: white;
    font-weight: 500;
    background-color: #0090FF;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    :hover {
        background-color: #0070D9;
    }
`;