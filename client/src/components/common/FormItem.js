import React from "react";
import styled from "styled-components";

const LabelText = styled.div`
  margin-bottom: 8px;
`;

export default function FormItem({ label, children }) {
  return (
    <div>
      <label>
        <LabelText>{label}</LabelText>
        {children}
      </label>
    </div>
  );
}
