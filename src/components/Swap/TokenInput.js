import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchBalance } from '@wagmi/core'
import { useAccount } from 'wagmi'

export const TokenInput = ({ hideBalance, chain }) => {

    const [value, setValue] = useState('')
    const [balance, setBalance] = useState('')
    const [selectedCurrency, setSelectedCurrency] = useState(chain.currencies[0])
    const {address} = useAccount()
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
        <SelectCurrency>
            <CurrencyInput value={value == balance?.data?.formatted ? value : value} onChange={(e) => handleTokenQuantity(e.target.value)} />
            {!hideBalance && (
                <p style={{ textDecoration: 'underline', color: '#FB118E', cursor: 'pointer', marginRight: '20px' }} onClick={() => setMaxCurrency()}>MAX</p>
            )}
        </SelectCurrency>
    )
}

const CurrencyInput = styled.input`
    width: 80%;
    background-color: #FCFCFC;
    border: none;
    outline: none;
    font-size: 25px;
    padding: 10px;
    text-align: center;
    border-left: 1px solid #BEBEBE;
    display: flex;
`;
const SelectCurrency = styled.div`
    width: 100%;
    height: 50px;
    
    background-color: #FCFCFC;
    border:  1px solid #BEBEBE;
    outline: none;
    font-size: 25px;
    padding: 10px;
    text-align: center;
    border-left: 1px solid #BEBEBE;
    border-radius: 10px;
`;

