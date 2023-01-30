import React from 'react'
import styled from 'styled-components';

export const Flex = ({children, padding, paddingRight}) => {
  return (
    <FlexWrapper padding={padding} paddingRight={paddingRight}> {children} </FlexWrapper>
  )
}

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: ${props => props.padding ? props.padding : '0px'};
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0px'};
`;