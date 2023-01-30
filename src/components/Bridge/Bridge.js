import React from 'react'
import styled from 'styled-components'
import { Flex } from '../../Flex'
import { ConnectWallet } from '../ConnectWallet/ConnectWallet'
import { FlexCol } from '../FlexCol'
import { BridgeHeader } from './BridgeHeader/BridgeHeader'
import { BridgeType } from './BridgeType/BridgeType'

export const Bridge = () => {


    return (
        <>
            <BridgeType />
            <BridgeForm>
                <BridgeHeader />
                <BridgeContent>
                    <h1>From</h1>
                    <FlexCol>
                        <FromChain>
                            <ChainInput display={'flex'} align={'center'} borderBottom={true}>
                                <Chain>
                                    <img src='/assets/filecoin-logo.png' width={34} height={34} />
                                    <p>Filecoin chain</p>
                                </Chain>
                                <p>Balance: <span style={{ color: 'black' }}>203 FIL</span></p>
                            </ChainInput>
                            <ChainInput>
                                <Flex >
                                    <img src='/assets/filecoin-logo.png' width={34} height={34} />
                                    <SelectCurrency>
                                        <option>FIL</option>
                                    </SelectCurrency>

                                    <CurrencyInput />
                                    <p style={{ fontSize: '14px', color: '#FB118E', textDecoration: 'underline', cursor: 'pointer' }}>MAX</p>
                                </Flex>

                            </ChainInput>
                        </FromChain>
                    </FlexCol>
                    <h1>To</h1>
                    <FromChain>
                        <ChainInput borderBottom={false}>
                            <Flex >
                                <Chain>
                                    <img src='/assets/polygon.svg' width={34} height={34} />
                                    <p>Polygon chain</p>
                                </Chain>
                                <p>≈ 198 MATIC  </p>
                                <SelectCurrency>
                                    <option value={'Polygon'} >Polygon Chain</option>
                                    <option value={'Ethereum'}>Ethereum</option>
                                </SelectCurrency>
                            </Flex>
                        </ChainInput>
                    </FromChain>

                    <ConnectWallet />
                </BridgeContent>
                
            </BridgeForm>
        </>
    )
}

const BridgeContent = styled.div`
    padding: 4px 20px;
    h1 {
        color: hsla(0, 0%, 31%, 1);
    }
    :last-child {
        display: flex;
        flex-direction: column;
    }
`;

const BridgeForm = styled.div`
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: white;
    border: 1px solid #CECECE;
    border-radius: 10px;
    min-width: 800px;
    margin-top: 20px;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        min-width: 300px;
    }
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

const Chain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    gap: 12px;
`;

const ChainInput = styled.div`
    display: ${props => props.display};
    align-items: ${props => props.align};
    padding: 0px 30px;
    border-bottom: ${props => props.borderBottom ? '1px solid #BEBEBE' : 'none'};
    p {
        font-size: 25px;
        color: #5F6C7B;
    }
`;

const FromChain = styled.div`
    background: #FCFCFC;
    border: 1px solid #BEBEBE;
    border-radius: 10px;
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
