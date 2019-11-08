import React from 'react';
import styled from 'styled-components';
import './App.css';

const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${props => props.background || 'none'};
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
  font-family: Pacifico;
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

const ShortenerForm = styled.div`
  display: flex;
  padding: 32px 0;

  > input {
    height: 48px;
    padding: 0 8px;
    box-sizing: border-box;
    border: 1px solid gray;
    border-radius: 4px;

    flex: 1;
  }

  > button {
    height: 48px;
    padding: 0 32px;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;

    background-color: dodgerblue;
    color: white;
    margin-left: 16px;
  }
`;

function App() {
  return (
    <Container>
      <SectionWrapper>
        <Navbar>
          <Logo>not bitly</Logo>
          <FlexGrow />
          <Links>
            <a href="/log-in">Log in</a>
            <a href="/sign-up">Sign up</a>
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
          <ShortenerForm>
            <input type="text" placeholder="Shorten your link"></input>
            <button>Shorten</button>
          </ShortenerForm>
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

export default App;
