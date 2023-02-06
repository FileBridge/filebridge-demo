import React, { useEffect, useState } from "react"
import { ethers, providers } from "ethers"
import styled from "styled-components"
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
} from "wagmi"
import { chains } from "../../constants/chains"
import { ConnectWallet } from "../ConnectWallet/ConnectWallet"
import { ChainSelector } from "../Bridge/ChainSelector/ChainSelector"
import bridgeContract from "../assets/FileBridge.json"
import FileswapV2Factory from "../assets/FileswapV2Factory.json"
import FileswapV2Router02 from "../assets/FileswapV2Router02.json"
import FileswapV2Pair from "../assets/FileswapV2Pair.json"
import FToken from "../assets/FToken.json"
import Token from "../assets/Token.json"
import { SwapHeader } from "./SwapHeader"
import { SwapButton } from "./SwapButton"
import { TokenInput } from "./TokenInput"
import { CurrencySelector } from "./CurrencySelector"
const { provider, utils } = require('ethers');

export const Swap = () => {

    const swapChains = () => { }

    const { address } = useAccount()

    const [selectedChain, setSelectedChain] = useState(chains[0])
    const [tokenIn, setTokenIn] = useState('0')
    const [tokenOut, setTokenOut] = useState("0")
    const [amountIn, setAmountIn] = useState("0")
    const [timeTra, setTimeTra] = useState("0")
    const [receiveAmount, setReceiveAmount] = useState("")

    var reserveIn = 0;
    var reserveOut = 0;
    var timestamp;

    providers.getDefaultProvider().getBlock('latest').then((block) => {
        timestamp = (block.timestamp + 1000);
        setTimeTra(timestamp);
    });

    const { data: isLiquidity } = useContractRead({
        address: FileswapV2Factory.address,
        abi: FileswapV2Factory.abi,
        functionName: 'getPair',
        args: [tokenIn, tokenOut],
    })

    const { config: swapConfig } = usePrepareContractWrite({
        address: FileswapV2Router02.address,
        abi: FileswapV2Router02.abi,
        functionName: 'swapExactTokensForTokens',
        args: [ethers.utils.parseEther(amountIn == '' ? '0' : amountIn), 0, [tokenIn, tokenOut], address, timeTra]
    });

    const { config: approveTokenConfig } = usePrepareContractWrite({
        address: tokenIn,
        abi: FToken.abi,
        functionName: 'approve',
        args: [FileswapV2Router02.address, ethers.utils.parseEther(amountIn == '' ? '0' : amountIn)]
    });

    const { write: swapWrite, data: swapData } = useContractWrite(swapConfig);
    const { write: approveToken, data: approvalData } = useContractWrite(approveTokenConfig);
    console.log(swapConfig)
    const [type, setType] = useState('token');

    const { data: reserveRead } = useContractRead({
        address: isLiquidity,
        abi: FileswapV2Pair.abi,
        functionName: 'getReserves',
    })

    const { data: token0 } = useContractRead({
        address: isLiquidity,
        abi: FileswapV2Pair.abi,
        functionName: 'token0',
    })

    if (isLiquidity && token0 && token0 === tokenIn ) {
        reserveIn = reserveRead[0];
        reserveOut = reserveRead[1];
    } else if(isLiquidity && token0) {
        reserveIn = reserveRead[1];
        reserveOut=reserveRead[0];
    }
    console.log(reserveIn, reserveOut)

    const { data: amountToRecieve } = useContractRead({
        address: FileswapV2Router02.address,
        abi: FileswapV2Router02.abi,
        functionName: 'getAmountOut',
        args: [ethers.utils.parseEther(amountIn == '' ? '0' : amountIn), reserveIn, reserveOut]
    })

    useEffect(() => {
        if (amountToRecieve) {
            setReceiveAmount(ethers.utils.formatEther(amountToRecieve).toString())
        }

        return () => {
            setReceiveAmount("")
        }
    }, [amountToRecieve])


    return (
        <>
            <Wrapper>
                <SwapHeader
                    selectedChain={selectedChain}
                    setChain={setSelectedChain} />
                {type === "token" ? (
                    <SwapContent>
                        <>
                            <h1>From</h1>
                            <CurrencySelector
                                selectedChain={selectedChain}
                                hideChain={true}
                                getToken={setTokenIn}
                                getAmount={setAmountIn}
                            />
                            {/* <TokenInput chain={chain}/> */}
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
                            <CurrencySelector
                                selectedChain={selectedChain}
                                hideChain={true}
                                getToken={setTokenOut}
                                receiveAmount={receiveAmount}
                            />
                        </>
                        <SwapButton swapWrite={swapWrite} tokenIn={tokenIn} approval={approveToken}
                            swapData={swapData} approvalData={approvalData} isLiquidity={isLiquidity} />
                    </SwapContent>
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
            </Wrapper>
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

const SwapContent = styled.div`
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    h1 {
        color: hsla(0, 0%, 31%, 1);
        margin: 5px;
    }
`

const Wrapper = styled.div`
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
    padding: 25px;
    margin-top: -120px;
`
