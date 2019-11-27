import React from 'react';
import styled from 'styled-components';
import headerBg from '../assets/headerBg.jpg';
import Navbar from './Navbar';

const ContainerWrapper = styled.div`
  background-image: url('/${headerBg}');
  color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 320px;
  margin-bottom: 64px;
`;

export default function AuthLayout({ children }) {
  return (
    <ContainerWrapper>
      <Container>
        <Navbar />
        <ContentWrapper>
          <Content>{children}</Content>
        </ContentWrapper>
      </Container>
    </ContainerWrapper>
  );
}
