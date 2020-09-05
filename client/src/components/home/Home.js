import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import headerBg from '../../assets/headerBg.jpg';
import FlexGrow from '../common/FlexGrow';
import SectionWrapper from '../common/SectionWrapper';
import Navbar from '../Navbar';
import ShortenerForm from './ShortenerForm';

const ContainerWrapper = styled.div`
  background-image: url('/${headerBg}');
  background-size: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: white;
  background-color: rgba(0, 0, 0, 0.75);
`;

const Header = styled.header`
  padding: 32px 0;
  color: white;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: 32px 0;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Links = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 16px;
  > a {
    margin-left: 16px;
  }
`;

function Home() {
  return (
    <ContainerWrapper>
      <Container>
        <Navbar />
        <Content>
          <SectionWrapper>
            <Header>
              <h1>A URL shortener.</h1>
              <p>Use the form below to shorten your links.</p>
              <p><Link to="/a/sign-in">Sign in</Link> to keep track of your link's performace</p>
              <ShortenerForm />
            </Header>
          </SectionWrapper>
        </Content>
        <SectionWrapper>
          <Footer>
            <div>Made by <a href="https://justusft.github.io/" target="_blank">Justus Tumacder</a></div>
            <FlexGrow />
            <Links>
              <a href="https://github.com/JustusFT/not-bitly" target="_blank">Source</a>
              <a href="https://github.com/JustusFT" target="_blank">Github</a>
            </Links>
          </Footer>
        </SectionWrapper>
      </Container>
    </ContainerWrapper>
  );
}

export default Home;
