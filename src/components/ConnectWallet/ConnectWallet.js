import { useConnectModal } from '@rainbow-me/rainbowkit';
import React from 'react'
import styled from 'styled-components';
import { useAccount, useContractRead } from 'wagmi';
import bridgeContract from "../assets/FileBridge.json"

export const ConnectWallet = ({approval, amount, bridge, tokenContract}) => {

    const { isDisconnected, address } = useAccount()
    const { openConnectModal } = useConnectModal();

    const {data} = useContractRead({
        address: tokenContract.address,
        abi: tokenContract.abi,
        functionName: 'allowance',
        args: [address, bridgeContract.address],
    })
   

    const handleClick = () => {
        if (isDisconnected) {
           openConnectModal()
        } else {
            if(data._hex === "0x00") {
                approval()
            }
            
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