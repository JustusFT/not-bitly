import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: #999;
  font-size: 0;
`;

export default function Avatar({ id }) {
  return (
    <Img
      src={`https://api.adorable.io/avatars/48/${id}.png`}
      alt="profile picture"
    />
  );
}
