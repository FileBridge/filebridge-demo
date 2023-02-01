import { ethers } from "ethers"
import React, { useState } from "react"
import styled from "styled-components"
import {
    useAccount,
    useConnect,
    useContract,
    useContractRead,
    useContractWrite,
    useNetwork,
    useWaitForTransaction,
} from "wagmi"
import { chains } from "../../constants/chains"
import { currencies } from "../../constants/currencies"
import { ConnectWallet } from "../ConnectWallet/ConnectWallet"
import { BridgeHeader } from "./BridgeHeader/BridgeHeader"
import { BridgeType } from "./BridgeType/BridgeType"
import { ChainSelector } from "./ChainSelector/ChainSelector"

import {
    abi as FileBridgeABI,
    address as FileBridgeAddress,
} from "../assets/FileBridge.json"
import {
    abi as FileswapV2FactoryABI,
    address as FileswapV2FactoryAddress,
} from "../assets/FileswapV2Factory.json"
import {
    abi as FileswapV2Router02ABI,
    address as FileswapV2Router02Address,
} from "../assets/FileswapV2Router02.json"
import { abi as FTokenABI } from "../assets/FToken.json"
import { abi as TokenABI } from "../assets/Token.json"

export const Bridge = () => {
    const swapChains = () => {}

    const approve = async (spender, amount, tokenAddress) => {
        //Approve function
        const {
            data: approveData,
            write: _approve,
            isLoading: isApproveLoading,
            isSuccess: isApproveStarted,
            error: approveError,
        } = useContractWrite({
            addressOrName: tokenAddress,
            contractInterface: TokenABI,
            functionName: "approve",
        })

        await _approve({ args: [spender, ethers.utils.parseEther(amount)] })
    }

    const [type, setType] = useState("token")

    return (
        <>
            <BridgeType type={type} setType={setType} />
            <BridgeForm>
                <BridgeHeader />
                {type === "token" ? (
                    <BridgeContent>
                        <>
                            <h1>From</h1>
                            <ChainSelector
                                defaultChain={chains[0]}
                                defaultCurrency={currencies[0]}
                            />
                        </>
                        <>
                            <ArrowButton onClick={() => swapChains()}>
                                <img
                                    src="/assets/arrow.svg"
                                    width={24}
                                    height={24}
                                />
                            </ArrowButton>
                        </>
                        <>
                            <h1>To</h1>
                            <ChainSelector
                                defaultChain={chains[1]}
                                defaultCurrency={currencies[2]}
                            />
                        </>
                        <ConnectWallet />
                    </BridgeContent>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "500px",
                            justifyContent: "center",
                        }}
                    >
                        <h1 style={{ textAlign: "center" }}>Coming soon!</h1>
                    </div>
                )}
            </BridgeForm>
        </>
    )
}

const ArrowButton = styled.button`
    background-color: #f4f4f4;
    border: 1px solid #bebebe;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    align-self: center;
    justify-self: center;
    margin: 25px 0px -15px 0px;
    cursor: pointer;
`

const BridgeContent = styled.div`
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    h1 {
        color: hsla(0, 0%, 31%, 1);
        margin: 5px;
    }
`

const BridgeForm = styled.div`
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: white;
    border: 1px solid #cecece;
    border-radius: 10px;
    min-width: 800px;
    margin-top: 20px;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        min-width: 300px;
    }
`
