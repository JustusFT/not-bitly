import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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
      <MenuContainer>{active && menu}</MenuContainer>
    </Container>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => PopMenu.handleClickOutside
};

export default onClickOutside(PopMenu, clickOutsideConfig);
