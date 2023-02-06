import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { RingLoader } from 'react-spinners';
import styled from 'styled-components';
import { useAccount, useContractRead, useNetwork, useWaitForTransaction } from 'wagmi';
import bridgeContract from "../assets/FileBridge.json"
import Token from "../assets/Token.json"

export const ConnectWallet = ({ approval, amount, bridge, currencyAddress, fromChain, toChain, bridgeData, approvalData }) => {
   
    const { isDisconnected, address } = useAccount()
    const { openConnectModal } = useConnectModal();
    const { chain } = useNetwork()
    const { data } = useContractRead({
        address: currencyAddress,
        abi: Token.abi,
        functionName: 'allowance',
        args: [address, bridgeContract.address],
    })
    console.log(currencyAddress, Token.abi, address, bridgeContract.address,data)
    const { isLoading, isSuccess, isError } = useWaitForTransaction({
        hash: bridgeData?.hash || approvalData?.hash,
        chainId: fromChain.chainId
    })
    
    const handleClick = () => {
        if (isDisconnected) {
            openConnectModal()
        } else {
            
            if (data._hex === "0x00") {
                approval()
            }

            bridge?.()
        }
    }

    useEffect(() => {
   
        if (isLoading) {
            toast.loading('Loading...')
        }
        if (isSuccess) {
            toast.success('Success!')
        }
        if (isError) {
            toast.error('Error!')
        }

        return () => {
            toast.dismiss()
        }
    }, [isLoading, isSuccess, isError])

    return (
        <>
            {fromChain.chainId === toChain.chainId ? (
                <Button disabled>Choose another chain</Button>)
                :
                (
                    <Button onClick={() => handleClick()} disabled={isLoading ? true : false}>
                        {isDisconnected ? 'Connect Wallet' : (!isLoading ? 'Bridge' : (
                            <RingLoader color='white'/>
                        ))}</Button>
                )
            }

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
    display: flex;
    justify-content: center;
    cursor: pointer;
    :hover {
        background-color: #0070D9;
    }
    :disabled {
        background-color: #0090FF;
        opacity: 0.5;
        cursor: not-allowed;
    }
`;