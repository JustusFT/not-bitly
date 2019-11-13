import React from "react";
import styled from "styled-components";
import FlexGrow from "../common/FlexGrow";
import Avatar from "./Avatar";
import PopMenu from "./PopMenu";

const Wrapper = styled.div`
  border-bottom: 1px solid gray;
`;

const Container = styled.nav`
  display: flex;
  align-items: center;
  height: 64px;
  margin: 0 16px;
`;

const Logo = styled.div`
  font-family: Pacifico, sans-serif;
  font-size: 32px;
  color: #ee6123;
`;

const Menu = styled.div`
  width: 200px;
  border: 1px solid gray;
  background-color: white;
  padding: 16px;
  box-sizing: border-box;
`;

export default function Navbar() {
  return (
    <Wrapper>
      <Container>
        <Logo>not bitly</Logo>
        <FlexGrow />
        <PopMenu
          menu={
            <Menu>
              <form method="POST" action="/api/auth/sign-out">
                <button type="submit">Sign out</button>
              </form>
            </Menu>
          }
        >
          <Avatar />
        </PopMenu>
      </Container>
    </Wrapper>
  );
}
