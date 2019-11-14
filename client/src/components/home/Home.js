import React from 'react';
import styled from 'styled-components';
import FlexGrow from '../common/FlexGrow';
import Navbar from '../Navbar';
import SectionWrapper from '../common/SectionWrapper';
import ShortenerForm from './ShortenerForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

const Links = styled.div`
  > a {
    margin-left: 16px;
  }
`;

function Home() {
  return (
    <Container>
      <Navbar />
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
