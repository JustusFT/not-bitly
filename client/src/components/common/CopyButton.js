import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Container = styled(Button)`
  width: 7ch;
  box-sizing: content-box;
  color: #2a5bd7;
  background-color: #e5edff;
  border: none;
  transition: background-color 0.3s;
  ${props =>
    props.copied
      ? `
        color: white;
        background-color: #649949;
      `
      : ``}
`;

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  async function onCopy(text) {
    if (copied) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container copied={copied} onClick={() => onCopy(text)}>
      {copied ? 'Copied!' : 'Copy'}
    </Container>
  );
}
