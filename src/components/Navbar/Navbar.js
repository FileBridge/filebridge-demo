import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
import styled from 'styled-components';
import styles from "./Navbar.module.css";

export const Navbar = () => {
  console.log(styles)

  const [value, setValue] = useState('Bridge');

  const handleOnClick = (e) => {
    setValue(e.target.innerHTML);
  }

  return (
    <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src='/assets/bridge.svg' width={70} height={60} />
          <h1 className={styles.title}>File Bridge</h1>
        </div>
    <Block/>
      <Nav defaultValue={value} onClick={(e) => handleOnClick(e)}>
        <NavLink style={{
          '--color':
            value === 'Bridge' ? 'hsla(328, 97%, 53%, 1)' : 'revert',
            '--font-weight':
            value === 'Bridge' ? '600' : 'revert',
        }}>
          Bridge
        </NavLink>
        <NavLink style={{
          '--color':
            value === 'Swap' ? 'hsla(328, 97%, 53%, 1)' : 'revert',
            '--font-weight':
            value === 'Swap' ? '600' : 'revert',
        }}>Swap</NavLink>
      </Nav>
      <Spacer />
      <ConnectButton />
    </div>
  );

}

const Spacer = styled.div`
  flex: 1;
`

const Block = styled.div`
  width: 100px;
`
const NavLink = styled.a`
  font-size: 1.125rem;
  color: var(--color);
  font-weight: var(--font-weight);
  cursor: pointer;
`
const Nav = styled.nav`
  display: flex;
  gap: 48px;
  font-weight: 300;
  margin-left: 30px;
  
 `
