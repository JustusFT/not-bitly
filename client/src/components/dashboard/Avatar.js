import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 100%;
`;

export default function Avatar() {
  return (
    <Img
      src="https://api.adorable.io/avatars/48/image.png"
      alt="profile picture"
    />
  );
}
