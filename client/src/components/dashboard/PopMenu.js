import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 32;
  right: 0;

  ${props =>
    props.visible
      ? `
        visibility: visible;
        opacity: 1;
      `
      : `
        visibility: hidden;
        opacity: 0;
      `}

  transition: opacity 0.4s, visibility 0.4s;
`;

function PopMenu({ menu, children }) {
  const [active, setActive] = useState(false);

  PopMenu.handleClickOutside = () => setActive(false);

  return (
    <Container>
      <div
        onClick={() => {
          setActive(true);
        }}
      >
        {children}
      </div>
      <MenuContainer visible={active}>{menu}</MenuContainer>
    </Container>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => PopMenu.handleClickOutside
};

export default onClickOutside(PopMenu, clickOutsideConfig);
