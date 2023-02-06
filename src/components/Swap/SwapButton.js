import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useAccount, useContractRead, useNetwork, useWaitForTransaction } from 'wagmi';
import FileswapV2Router02 from "../assets/FileswapV2Router02.json"
import FToken from "../assets/FToken.json"
import { toast } from 'react-hot-toast';
import { RingLoader } from 'react-spinners';

export const SwapButton = ({ swapWrite, tokenIn, approval, swapData, approvalData, isLiquidity }) => {

    const { isDisconnected, address } = useAccount();
    const { openConnectModal } = useConnectModal();
    const { chain } = useNetwork()
    const trackTransaction = {
        3141: 'https://hyperspace.filfox.info/en/tx/',
        80001: 'https://mumbai.polygonscan.com/tx/',
        5: 'https://goerli.etherscan.io/tx/'
    }
    const { data } = useContractRead({
        address: tokenIn,
        abi: FToken.abi,
        functionName: 'allowance',
        args: [address, FileswapV2Router02.address],
    })

    const { isLoading, isSuccess, isError } = useWaitForTransaction({
        hash: swapData?.hash || approvalData?.hash
    })

    const handleClick = () => {
        if (isDisconnected) {
            openConnectModal()
        } else {
            console.log(data)
            if (data?._hex == "0x00") {
                approval()
            }
            console.log('approved', data)
            swapWrite?.()

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
            {(isLiquidity !== "0x0000000000000000000000000000000000000000" && isLiquidity) ? (
                <Button onClick={() => handleClick()} disabled={isLoading ? true : false}>
                    {isDisconnected ? 'Connect Wallet' : (!isLoading ? 'Swap' : (
                        <RingLoader color='white'/>
                    )
                    )}
                </Button>
            ) : (
                <Button disabled={true} >
                    No liquidty for this pair
                </Button>
            )}

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
    opacity: 1;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    :hover {
        background-color: #0070D9;
    }
    :disabled {
        background-color: #0090FF;
        opacity: 0.5;
        cursor: not-allowed;
        display: flex;
        justify-content: center;
    }
`;

const Spinner = styled.div`
.spinner {
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;