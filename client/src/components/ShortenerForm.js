import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import styled from "styled-components";
import linksApi from "../util/api/linksApi";
import getShortUrl from "../util/getShortUrl";
import FlexGrow from "./common/FlexGrow";

const FormContainer = styled(Form)`
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
    content: "";
    display: block;
    border-bottom: 1px solid lightgray;
    margin: 16px;
  }
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
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

  async function submitUrl(url) {
    const response = await linksApi.create(url);

    if (response.ok) {
      const json = await response.json();
      setLinks([json, ...links]);
    } else {
      // TODO handle error
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          url: ""
        }}
        onSubmit={values => {
          submitUrl(values.url);
        }}
        render={() => (
          <FormContainer>
            <Field name="url" type="text" placeholder="Shorten your link" />
            <button type="submit">Shorten</button>
          </FormContainer>
        )}
      />
      {links.length > 0 && (
        <LinksContainer>
          {links.map(link => (
            <LinkItemWrapper key={link.hashid}>
              <LinkItem>
                <div>{link.original_url}</div>
                <FlexGrow />
                <div>{getShortUrl(link.hashid)}</div>
                <CopyButton>Copy</CopyButton>
              </LinkItem>
            </LinkItemWrapper>
          ))}
        </LinksContainer>
      )}
    </div>
  );
}
