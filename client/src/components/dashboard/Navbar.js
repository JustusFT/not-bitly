import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../App';
import Button from '../common/Button';
import FlexGrow from '../common/FlexGrow';
import Avatar from './Avatar';
import PopMenu from './PopMenu';
import Spacer from '../common/Spacer';

const Wrapper = styled.div`
  border-bottom: 1px solid #ccc;
  box-shadow: 2px 2px 4px #ccc;
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
  border: 1px solid #ccc;
  background-color: white;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #ccc;
`;

const EmailText = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default function Navbar() {
  const userContext = useContext(UserContext);

  return (
    <Wrapper>
      <Container>
        <Logo>not bitly</Logo>
        <FlexGrow />
        <PopMenu
          menu={
            <Menu>
              <EmailText>{userContext.user.email}</EmailText>
              <Spacer />
              <form method="POST" action="/api/auth/sign-out">
                <Button block type="submit">
                  Sign out
                </Button>
              </form>
            </Menu>
          }
        >
          <Avatar id={userContext.user.email} />
        </PopMenu>
      </Container>
    </Wrapper>
  );
}
