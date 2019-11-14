import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
    <Container>
      <Navbar />
      <ContentWrapper>
        <Content>{children}</Content>
      </ContentWrapper>
    </Container>
  );
}
