import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${props => props.active ? '9999999999' : '-1'};
  background-color: ${props => props.active ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.3s,
    z-index 0s ${props => props.active ? '0s' : '0.3s'};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 16px;
  transform: translateY(${props => (props.active ? '0px' : '-32px')});
  opacity: ${props => (props.active ? '1' : '0')};
  transition: transform 0.3s, opacity 0.3s;
`

const TopPart = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  border-bottom: 1px solid #999;
  padding: 16px;
`

const MiddlePart = styled.div`
  padding: 32px;
  flex: 1;
`

const BottomPart = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #999;
  padding: 16px;
`

export default function Modal({ active, title, body, footer }) {
  return (
  <ModalOverlay active={active}>
    <ModalContainer active={active}>
    <TopPart>
      {title}
    </TopPart>
    <MiddlePart>
      {body()}
    </MiddlePart>
    <BottomPart>
      {footer()}
    </BottomPart>
    </ModalContainer>
  </ModalOverlay>
  )
}
