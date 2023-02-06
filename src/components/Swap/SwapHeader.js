import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { chains } from '../../constants/chains';

export const SwapHeader = ({selectedChain: swapChain, setChain}) => {

    const { chain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork({
        chainId: swapChain?.chainId,
    })

    const handleNetworkSwitch = (e) => {
        const chain = JSON.parse(e)
        setChain(chain)
        switchNetwork(chain?.chainId)
    }

    return (
        <Wrapper>
            <h1>
                Swap
            </h1>
            <SelectChain>
            <img src={swapChain?.icon} width={34} height={34} />
                    <select onChange={(e) => handleNetworkSwitch(e.target.value)} value={JSON.stringify(swapChain)}>
                        {chains.map((chain) => (

                            <option value={JSON.stringify(chain)} title={chain?.id} onChange={() => {
                                setChain(chain)
                            }}>{chain?.network}</option>

                        ))}
                    </select>
            </SelectChain>
            <img src='/assets/settings.svg' width={34} height={34} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    color: #222222;
    border-bottom: 2px solid #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 20px;
    h1 {
        font-size: 32px;
    }
`;

const SelectChain = styled.div`
    display: flex;
    background: #FFFFFE;
    border: 1px solid #BEBEBE;
    border-radius: 10px;    
    padding: 15px;
    gap: 10px;
   select {
        width: 100%;
        background-color: transparent;
        border: none;
        font-size:25px;
        outline: none;
        margin-right: 10px;
        label {
            text-align: center;
        }
    }
`;