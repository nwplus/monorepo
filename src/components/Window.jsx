import React from 'react'
import styled from 'styled-components'
import btns from '@assets/btns.svg'

const WindowContainer = styled.div`
    max-width: 700px;
    background-color: #EFEDEA;
    margin: auto;
    border: 4px solid #4A5759;
    border-radius: 4px;
`

const Header = styled.div`
    position: relative;
    text-align: center;
    border-bottom: 4px solid #4A5759;
    padding: 4px;
    background-color: #C8BFB6;
    font-family: 'Fira Mono', monospace;
`

const Body = styled.div`
    text-align: center;
    padding: 2em;
    color: #B95D1D;
`

const BtnsImg = styled.img`
    position: absolute;
    right: 0.5em;
`

const Footer = ({ title, children }) => {
    return (
        <WindowContainer>
            <Header>
                {title}
                <BtnsImg src={btns} />
            </Header>
            <Body>
                {children}
            </Body>
        </WindowContainer>
    )
}

export default Footer
