import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  margin: 32px 0;

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

const LinkItemWrapper = styled.div`
  &:not(:last-child)::after {
    content: '';
    display: block;
    border-bottom: 1px solid lightgray;
    margin: 16px;
  }
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
`;

const FlexGrow = styled.div`
  flex: 1;
`;

const LinksContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 32px;
`;

const CopyButton = styled.button`
  margin-left: 16px;
`;

export default function ShortenerForm() {
  const [links, setLinks] = useState([]);
  const [value, setValue] = useState('');

  async function submitUrl(url) {
    // prepend an http:// if not provided
    if (!/$https?:\/\//.test(url)) {
      url = `http://${url}`;
    }

    const response = await fetch(`/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    if (response.ok) {
      const json = await response.json();
      setLinks([...links, json]);
    } else {
      // TODO handle error
    }
  }

  return (
    <div>
      <FormContainer>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          type="text"
          placeholder="Shorten your link"
        ></input>
        <button onClick={() => submitUrl(value)}>Shorten</button>
      </FormContainer>
      {links.length > 0 && (
        <LinksContainer>
          {links.map(link => (
            <LinkItemWrapper>
              <LinkItem>
                <div>{link.original_url}</div>
                <FlexGrow />
                <div>{link.hashid}</div>
                <CopyButton>Copy</CopyButton>
              </LinkItem>
            </LinkItemWrapper>
          ))}
        </LinksContainer>
      )}
    </div>
  );
}
