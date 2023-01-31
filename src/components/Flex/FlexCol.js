import React from 'react'
import styled from 'styled-components';

const FlexCol = ({children, padding}) => {
  return (
    <FlexWrapper padding={padding}>{children}</FlexWrapper>
  )
}

export default FlexCol;

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${props => props.padding ? props.padding : '0px'};
`;