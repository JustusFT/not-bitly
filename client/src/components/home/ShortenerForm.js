import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import linksApi from '../../util/api/linksApi';
import getShortUrl from '../../util/getShortUrl';
import Button from '../common/Button';
import CopyButton from '../common/CopyButton';
import ErrorText from '../common/ErrorText';
import Input from '../common/Input';

const FormContainer = styled.div`
  margin: 32px 0;
`;

const LinkForm = styled(Form)`
  display: flex;

  > input {
    flex: 1;
  }

  > button {
    padding: 0 32px;
    margin-left: 16px;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;

    > input {
      flex: initial;
      margin-bottom: 16px;
    }

    > button {
      margin-left: 0;
    }
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

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const UrlText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const LinksContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 32px;
  color: #111;
`;

const CopyButtonContainer = styled.div`
  margin-left: 16px;

  @media screen and (max-width: 480px) {
    margin-left: 0px;
  }
`;

const LinkSpacer = styled.div`
  flex: 1 1 16px;

  @media screen and (max-width: 480px) {
    display: none;
  }
`

export default function ShortenerForm() {
  const [links, setLinks] = useState([]);

  async function submitUrl(url, formikBag) {
    const response = await linksApi.create(url);

    if (response.ok) {
      const json = await response.json();
      setLinks([json, ...links]);
    } else if (response.status === 422) {
      const json = await response.json();
      formikBag.setErrors(json);
    } else {
      // server error
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          url: ''
        }}
        onSubmit={(values, formikBag) => {
          submitUrl(values.url, formikBag);
        }}
      >
        {({ handleChange }) => (
          <FormContainer>
            <LinkForm>
              <Input
                large
                name="url"
                type="text"
                placeholder="Shorten your link"
                onChange={handleChange}
              />
              <Button large color="primary" type="submit">
                Shorten
              </Button>
            </LinkForm>
            <ErrorMessage name="url" component={ErrorText} />
          </FormContainer>
        )}
      </Formik>
      {links.length > 0 && (
        <LinksContainer>
          {links.map(link => (
            <LinkItemWrapper key={link.hashid}>
              <LinkItem>
                <UrlText>{link.original_url}</UrlText>
                <LinkSpacer />
                <UrlText>{getShortUrl(link.hashid)}</UrlText>
                <CopyButtonContainer>
                  <CopyButton text={getShortUrl(link.hashid)} />
                </CopyButtonContainer>
              </LinkItem>
            </LinkItemWrapper>
          ))}
        </LinksContainer>
      )}
    </div>
  );
}
