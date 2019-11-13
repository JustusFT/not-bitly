import styled from "styled-components";

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

export default SectionWrapper;
