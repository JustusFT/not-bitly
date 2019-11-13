import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FlexGrow from "./common/FlexGrow";
import SectionWrapper from "./common/SectionWrapper";

const Container = styled.nav`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Logo = styled(Link)`
  font-family: Pacifico, sans-serif;
  font-size: 32px;
  color: #ee6123;
  text-decoration: none;
`;

const Links = styled.div`
  > a {
    margin-left: 16px;
  }
`;

export default function Navbar() {
  return (
    <SectionWrapper>
      <Container>
        <Logo to="/">not bitly</Logo>
        <FlexGrow />
        <Links>
          <Link to="/a/sign-in">Log in</Link>
          <Link to="/a/sign-up">Sign up</Link>
        </Links>
      </Container>
    </SectionWrapper>
  );
}
