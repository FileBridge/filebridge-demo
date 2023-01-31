import React, { useState } from 'react'
import styled from 'styled-components';
import { useBalance, useAccount, useNetwork } from 'wagmi';
import { FlexCol, Flex } from '../../Flex/index.js'

export const ChainSelector = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { chain } = useNetwork()
    const balance = useBalance({
        address: address
    })

    const [value, setValue] = useState('')

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

    return (
        <Wrapper>
            <ChainInformation>
                <Flex>
                    <img src={`/assets/${chain?.network}.svg`} width={34} height={34} />
                    <select>
                        <option value={chain?.network} title={chain?.id}>{chain?.name}</option>

                        <option value={'Filecoin'} title={'22323'}>Mumbai chain</option>
                    </select>
                    <p>Balance: <span>{balance?.data?.formatted + ' ' + balance?.data?.symbol}</span></p>
                </Flex>
            </ChainInformation>
            <CurrencyData>
                <Flex>
                    <img src={`/assets/${chain?.network}.svg`} width={34} height={34} />
                    <SelectCurrency>
                        <option>FIL</option>
                    </SelectCurrency>
                    <CurrencyInput value={value == balance?.data?.formatted ? value: value} onChange={(e) => handleTokenQuantity(e.target.value)}/>
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
