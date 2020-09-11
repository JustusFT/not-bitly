import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: white;
  opacity: ${props => (props.disabled ? '0.5' : '1')};

  ${props => (props.block ? 'display: block; width: 100%;' : '')};

  ${props => (props.large ? 'height: 48px;' : '')}

  ${props => {
    switch (props.color) {
      case 'primary':
        return `
          background-color: hsla(215,100%,62%,1);
          color: white;
          border: none;
        `;
      case 'danger':
        return `
          background-color: hsla(5,80%,50%,1);
          color: white;
          border: none;
        `;
      default:
        return '';
    }
  }};
`;

export default Button;
