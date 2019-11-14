import styled from 'styled-components';

const Input = styled.input`
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 4px;

  ${props => (props.large ? 'height: 48px; padding: 8px 16px;' : '')}

  ${props => (props.block ? 'display: block; width: 100%;' : '')}
`;

export default Input;
