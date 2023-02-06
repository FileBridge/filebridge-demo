import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useBalance, useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { Flex } from '../../Flex/index.js';
import { fetchBalance } from '@wagmi/core'
import { chains } from '../../../constants/chains.js';


export const ChainSelector = ({ defaultChain, hideBalance, hideChain, getChain, getAmount, getCurrency }) => {

    const { address, isConnecting, isDisconnected, isConnected } = useAccount()

    const { switchNetwork } = useSwitchNetwork({
        chainId: defaultChain?.chainId,
    })
    const { chain } = useNetwork()
    const [value, setValue] = useState('')
    const [selectedChain, setSelectedChain] = useState(defaultChain)
    const [selectedCurrency, setSelectedCurrency] = useState(defaultChain?.currencies[1])
    const [balance, setBalance] = useState('')

    const setMaxCurrency = () => {
        setValue(balance?.formatted)
    }

    const handleTokenQuantity = (value) => {
        if (value > parseInt(balance?.data?.formatted)) {
            // setValue(balance?.data?.formatted)
        } else {
            setValue(value)
            getAmount(value)
        }
    }

    useEffect(() => {

        setSelectedChain(defaultChain)
        setSelectedCurrency(defaultChain.currencies[1])
        getTokenBalance(defaultChain.currencies[0].address)

    }, [defaultChain])

    const handleNetworkSwitch = (e) => {
        const chain = JSON.parse(e)
        setSelectedChain(chain)
        getChain(chain)
        if (!hideBalance) {
            switchNetwork(chain?.chainId)
        }
        handleCurrency(JSON.stringify(chain.currencies[0]))
        getTokenBalance()
    }

    const handleCurrency = (e) => {
        const currency = JSON.parse(e)
        setSelectedCurrency(currency)
        getTokenBalance(currency.address)
        getCurrency(currency)
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

    return (
        <Wrapper>
            {!hideChain && (
                <ChainInformation style={{borderBottom: `${hideBalance ? 'none' : '1px solid #BEBEBE'}`}}>
                    <Flex>
                        <img src={selectedChain?.icon} width={34} height={34} />
                        <select defaultValue={selectedChain?.network} onChange={(e) => handleNetworkSwitch(e.target.value)} value={JSON.stringify(selectedChain)}>
                            {chains.map((chain) => (

                                <option value={JSON.stringify(chain)} title={chain?.id} onChange={() => {
                                    setSelectedChain(chain)
                                }}>{chain?.network}</option>

                            ))}
                        </select>
                        {!hideBalance && (
                            <p><span>{(isConnected && selectedChain?.chainId == chain.id) ? ('Balance: ' + balance?.formatted?.slice(0, 5) + ' ' + balance?.symbol) : (<span>Change network</span>)}</span></p>
                        )}
                    </Flex>
                </ChainInformation>
            )}
            {!hideBalance && (
                <CurrencyData>
                    <Flex>
                        <img src={selectedCurrency?.icon} width={34} height={34} />
                        <SelectCurrency defaultValue={selectedCurrency} onChange={e => handleCurrency(e.target.value)} value={JSON.stringify(selectedCurrency)}>
                            {chains.filter((chain) => (chain.chainId == selectedChain.chainId)).pop()?.currencies.map((currency) => (
                                <>
                                {currency.address !== '' && (
                                    <>
                                    <option value={JSON.stringify(currency)} onChange={() => setSelectedChain(currency?.chainId)}>{currency?.currency}</option>
                                </>
                                )}
                                
                                </>
                            ))}
                        </SelectCurrency>
                        <CurrencyInput value={value == balance?.data?.formatted ? value : value} onChange={(e) => handleTokenQuantity(e.target.value)} />

                        <p style={{ textDecoration: 'underline', color: '#FB118E', cursor: 'pointer', marginRight: '20px' }} onClick={() => setMaxCurrency()}>MAX</p>
                    </Flex>
                </CurrencyData>
            )}
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
