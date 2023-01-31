import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useBalance, useAccount, useNetwork } from 'wagmi';
import { chains } from '../../../constants/chains.js';
import { currencies } from '../../../constants/currencies.js';
import { FlexCol, Flex } from '../../Flex/index.js'

export const ChainSelector = ({ defaultChain, defaultCurrency }) => {
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()
    const { chain } = useNetwork()
    const balance = useBalance({
        address: address
    })

    const [value, setValue] = useState('')
    const [selectedChain, setSelectedChain] = useState(defaultChain)
    const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency)
    const setMaxCurrency = () => {
        setValue(balance?.data?.formatted)
    }

    const handleTokenQuantity = (value) => {
        if (value > parseInt(balance?.data?.formatted)) {
            // setValue(balance?.data?.formatted)
        } else {
            setValue(value)
        }
    }

    useEffect(() => {

        setSelectedChain(defaultChain)
        setSelectedCurrency(defaultCurrency)

    }, [defaultChain])


    return (
        <Wrapper>
            <ChainInformation>
                <Flex>
                    <img src={selectedChain.icon} width={34} height={34} />
                    <select defaultValue={selectedChain?.network}>
                        {chains.map((chain) => (
                            <option value={chain?.network} title={chain?.id} onSelect={() => setSelectedChain(chain)}>{chain?.network}</option>

                        ))}
                    </select>
                    <p>Balance: <span>{(isConnected && selectedChain?.id == chain.id) ? (balance?.data?.formatted + ' ' + balance?.data?.symbol) : (0)}</span></p>
                </Flex>
            </ChainInformation>
            <CurrencyData>
                <Flex>
                    <img src={selectedCurrency?.icon} width={34} height={34} />
                    <SelectCurrency defaultValue={selectedCurrency?.currency}>
                        {currencies.map((currency) => (
                            <option value={currency?.currency} onSelect={() => setSelectedChain(currency?.chainId)}>{currency?.currency}</option>
                        ))}
                    </SelectCurrency>
                    <CurrencyInput value={value == balance?.data?.formatted ? value : value} onChange={(e) => handleTokenQuantity(e.target.value)} />
                    <p style={{ textDecoration: 'underline', color: '#FB118E', cursor: 'pointer', marginRight: '20px' }} onClick={() => setMaxCurrency()}>MAX</p>
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
