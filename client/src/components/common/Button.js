import React from 'react';
import styled from 'styled-components';
import Spin from './Spin';

const ButtonElement = styled.span`
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: white;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  transition: background-color 0.1s;
  color: #222222;
  user-select: none;

  ${props => (props.block ? 'display: flex; width: 100%;' : 'display: inline-flex;')};

  ${props => (props.large ? 'height: 48px;' : '')}

  &:hover {
    background-color: #eeeeee;
  }

  &:active {
    background-color: #dddddd;
  }

  ${props => {
    switch (props.color) {
      case 'primary':
        return `
          background-color: hsla(215,100%,62%,1);
          color: white;
          border: none;

          &:hover {
            background-color: hsla(215,100%,72%,1);
          }
        
          &:active {
            background-color: hsla(215,100%,82%,1);
          }
        `;
      case 'danger':
        return `
          background-color: hsla(5,80%,50%,1);
          color: white;
          border: none;

          &:hover {
            background-color: hsla(5,80%,60%,1);
          }
        
          &:active {
            background-color: hsla(5,80%,70%,1);
          }
        `;
      default:
        return '';
    }
  }};
`;

const SpinSpacer = styled.div`
  width: 4px;
`;

export default function Button({ loading, children, ...props }) {
  return (
    <ButtonElement {...props} role="button">
      {loading && (
        <>
          <Spin size={16} />
          <SpinSpacer />
        </>
      )}
      {children}
    </ButtonElement>
  )
};
