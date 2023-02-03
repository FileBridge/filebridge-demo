import { ethers } from "ethers"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
    useContractWrite,
    usePrepareContractWrite,
} from "wagmi"
import { chains } from "../../constants/chains"
import { currencies } from "../../constants/currencies"
import { ConnectWallet } from "../ConnectWallet/ConnectWallet"
import { BridgeHeader } from "./BridgeHeader/BridgeHeader"
import { BridgeType } from "./BridgeType/BridgeType"
import { ChainSelector } from "./ChainSelector/ChainSelector"
import { useFeeData } from 'wagmi'
import bridgeContract from "../assets/FileBridge.json"
import FileswapV2Factory from "../assets/FileswapV2Factory.json"
import FileswapV2Router02 from "../assets/FileswapV2Router02.json"
import FToken from "../assets/FToken.json"
import Token from "../assets/Token.json"

export const Bridge = () => {

    const swapChains = () => {}
    const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState(0)
    const { data, isError, isLoading } = useFeeData()

    useEffect(() => {
      setMaxPriorityFeePerGas(data?.maxPriorityFeePerGas)
    
      return () => {
        setMaxPriorityFeePerGas(0)
      }

    }, [data])
    

    // FToken = Filecoin token (Wrapped Filecoin)
    // Token = DAI token, or any other token on ERC-20 network
    
    // await fileBridgeContract.initialize(deployer, [guardian], 1, {
    //     maxPriorityFeePerGas: gasData.maxPriorityFeePerGas!,
    // })

    const { config } = usePrepareContractWrite({
        address: Token.address,
        abi: Token.abi,
        functionName: 'approve',
        args: [bridgeContract.address, ethers.utils.parseEther('1')],
      })
   
      // args: spender (BridgeContract address), amount (1 FToken)
    const { config : bridgeConfig } = usePrepareContractWrite({
        address: bridgeContract.address,
        abi: bridgeContract.abi,
        functionName: 'depositToken',
        args: ['0x36140eEE3893C84886EdC687D598dBD7Cccd5534', 80001, Token.address, ethers.utils.parseEther('1')],
    })

    console.log(bridgeConfig)

    const { write } = useContractWrite(config)
    const { write : bridgeWrite } = useContractWrite(bridgeConfig)

    const [type, setType] = useState('token');

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
                        <ConnectWallet approval={write} bridge={bridgeWrite}/>
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
