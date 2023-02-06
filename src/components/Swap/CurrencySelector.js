import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useAccount, useNetwork } from 'wagmi';
import { Flex } from '../Flex/index.js';
import { fetchBalance } from '@wagmi/core'
import { chains } from '../../constants/chains.js';

export const CurrencySelector = ({ selectedChain: swapChain, hideBalance, hideChain, getToken, getAmount, receiveAmount }) => {

    const { address, isConnecting, isDisconnected, isConnected } = useAccount()

    const { chain } = useNetwork()

    const [value, setValue] = useState('')
    const [balance, setBalance] = useState('')
    const [selectedCurrency, setSelectedCurrency] = useState(swapChain?.currencies[0])
    const setMaxCurrency = () => {
        setValue(balance?.data?.formatted)
    }

    const handleTokenQuantity = (value) => {
        console.log(value)
        if (value > parseInt(balance?.data?.formatted)) {
            // setValue(balance?.data?.formatted)
        } else {
            getAmount(value)
            setValue(value)
        }
    }

    const handleCurrency = (e) => {
        const currency = JSON.parse(e)
        setSelectedCurrency(currency)
        getToken(currency.address)
        getTokenBalance(currency.address)
    }

    const getTokenBalance = async (tokenAddress) => {
        const balance = await fetchBalance({
            address: address,
            token: tokenAddress,

        })
        setBalance(balance)
    }

    useEffect(() => {
        getTokenBalance(selectedCurrency?.address)
    }, [balance])

    useEffect(() => {
        setSelectedCurrency(swapChain?.currencies[0])

        return () => {
            setSelectedCurrency({})
        }
    }, [swapChain])

    return (
        <Wrapper>
            {!hideChain && (
                <ChainInformation>
                    <Flex>
                        <img src={swapChain?.icon} width={34} height={34} />
                        <select value={JSON.stringify(swapChain)} defaultValue={swapChain}>
                            {chains.map((chain) => (

                                <option value={JSON.stringify(swapChain)} title={swapChain?.id} onChange={() => {
                                }}>
                                    {swapChain?.network}
                                </option>
                            ))}
                        </select>
                        {!hideBalance && (
                            <p><span>{(isConnected && swapChain?.chainId == chain.id) ? ('Balance: ' + balance?.formatted?.slice(0, 5) + ' ' + balance?.symbol) : (<span>Change network</span>)}</span></p>
                        )}
                    </Flex>
                </ChainInformation>
            )}
            <CurrencyData>
                <Flex>
                    <img src={selectedCurrency?.icon} width={34} height={34} />
                    <SelectCurrency defaultValue={selectedCurrency} onChange={e => handleCurrency(e.target.value)} value={JSON.stringify(selectedCurrency)}>
                        {chains.filter((chain) => (chain.chainId == swapChain.chainId)).pop()?.currencies.map((currency) => (
                            <>
                                <option value={JSON.stringify(currency)} onChange={() => {
                                    setSelectedCurrency(currency?.chainId)
                                    
                                    }}>{currency?.currency}</option>
                            </>

                        ))}
                    </SelectCurrency>
                    <CurrencyInput value={ (receiveAmount ? receiveAmount : (value === '0' ? '' : value))} onChange={(e) => handleTokenQuantity(e.target.value)} 
                     placeholder={(isConnected && swapChain?.chainId == chain.id) ? ('Balance: ' + balance?.formatted?.slice(0, 6) + ' ' + balance?.symbol) : (<span>Change network</span>)}/>
                    {!hideBalance && (
                        <div>
                        <p style={{ textDecoration: 'underline', color: '#FB118E', cursor: 'pointer', marginRight: '20px' }} onClick={() => setMaxCurrency()}>MAX</p>
                        {/* <p style={{fontSize:'15px', color: 'black', fontWeight:'semibold'}}><span>{(isConnected && swapChain?.chainId == chain.id) ? ('Balance: ' + balance?.formatted?.slice(0, 5) + ' ' + balance?.symbol) : (<span>Change network</span>)}</span></p> */}
                        </div>
                    )}
                </Flex>
            </CurrencyData>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: #FCFCFC;
    border: 1px solid #BEBEBE;
    border-radius: 10px;
    font-size:25px;
    color: #5F6C7B;
    img {
        padding: 20px 0px 20px 20px;
    }
`;

const ChainInformation = styled.div`
  
    border-bottom: 1px solid #BEBEBE;
    select {
        width: 100%;
        background-color: transparent;
        border: none;
        padding: 20px;
        font-size:25px;
        outline: none;
        margin-right: 10px;
    }
    p {
        flex: 1;
        flex-basis: 300px;
        span {
            color: black;
            font-weight: 500;
        }
        position: fixed;
        right: 75px;
        cursor: alias;
    }
`;

const CurrencyData = styled.div`

`;

const CurrencyInput = styled.input`
    width: 80%;
    height: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 25px;
    padding: 10px;
    text-align: center;
    border-left: 1px solid #BEBEBE;
`;

const SelectCurrency = styled.select`
    border: none;
    border-right: 16px solid transparent;
    font-size: 25px;
    color: #5F6C7B;
    padding: 20px 10px;
    outline: none;
    background-color: #FCFCFC;
`;
