import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Home.css";
import ShortenerForm from "./ShortenerForm";

const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${props => props.background || "none"};
  padding: 0 16px;

  > * {
    width: 100%;
    max-width: 960px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Header = styled.header`
  height: 200px;
`;

const Content = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Logo = styled.div`
  font-family: Pacifico, sans-serif;
  font-size: 32px;
  color: #ee6123;
`;

const FlexGrow = styled.div`
  flex: 1;
`;

const Links = styled.div`
  > a {
    margin-left: 16px;
  }
`;

function Home() {
  return (
    <Container>
      <SectionWrapper>
        <Navbar>
          <Logo>not bitly</Logo>
          <FlexGrow />
          <Links>
            <Link to="/sign-in">Log in</Link>
            <Link to="/sign-up">Sign up</Link>
          </Links>
        </Navbar>
      </SectionWrapper>
      <Content>
        <SectionWrapper>
          <Header>
            <h1>A URL shortener.</h1>
          </Header>
        </SectionWrapper>
        <SectionWrapper background="darkgray">
          <ShortenerForm />
        </SectionWrapper>
      </Content>
      <SectionWrapper>
        <Footer>
          <div>Made by JustusFT</div>
          <FlexGrow />
          <Links>
            <a href="/">Source</a>
            <a href="/">Github</a>
          </Links>
        </Footer>
      </SectionWrapper>
    </Container>
  );
}

export default Home;
