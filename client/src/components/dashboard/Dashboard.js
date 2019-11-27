import { ErrorMessage, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import linksApi from '../../util/api/linksApi';
import Button from '../common/Button';
import ErrorText from '../common/ErrorText';
import Input from '../common/Input';
import Spin from '../common/Spin';
import LinkInfo from './LinkInfo';
import LinkList from './LinkList';
import Navbar from './Navbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
`;

const LeftSide = styled.div`
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  overflow: hidden;

  @media screen and (max-width: 640px) {
    position: absolute;
    transform: translateX(${props => (props.active ? '0%' : '-100%')});
  }

  transition: transform 0.4s;
  background-color: white;
`;

const RightSide = styled.div`
  flex: 1;
  padding: 16px;
`;

const LinkListContainer = styled.div`
  flex: 1;
`;

const UrlFormContainer = styled.div`
  padding: 16px;
`;

const UrlForm = styled(Form)`
  display: flex;

  > input[type='text'] {
    width: 100%;
    flex: 1;
  }

  > button {
    margin-left: 16px;
  }
`;

const SpinContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const UrlInput = styled(Input)`
  min-width: 0;
`;

export const LinksContext = React.createContext([]);

export default function Dashboard() {
  const { path } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);

  const [leftSideActive, setLeftSideActive] = useState(false);

  useEffect(() => {
    fetch('/api/links')
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        setLinks(json);
      });
  }, []);

  return (
    <LinksContext.Provider value={links}>
      <Container>
        <Navbar onToggle={() => setLeftSideActive(!leftSideActive)} />
        {loading ? (
          <SpinContainer>
            <Spin />
          </SpinContainer>
        ) : (
          <Content>
            <LeftSide active={leftSideActive}>
              <Formik
                initialValues={{
                  url: ''
                }}
                onSubmit={async (values, formikBag) => {
                  const response = await linksApi.create(values.url);

                  if (response.ok) {
                    const json = await response.json();
                    setLinks([{ ...json, visits: 0 }, ...links]);
                  } else if (response.status === 422) {
                    const json = await response.json();
                    formikBag.setErrors(json);
                  } else {
                    // server error
                  }
                }}
                render={({ handleChange }) => (
                  <UrlFormContainer>
                    <UrlForm>
                      <UrlInput
                        name="url"
                        type="text"
                        onChange={handleChange}
                      />
                      <Button type="submit">Shorten</Button>
                    </UrlForm>
                    <ErrorMessage name="url" component={ErrorText} />
                  </UrlFormContainer>
                )}
              />
              <LinkListContainer>
                <LinkList links={links} />
              </LinkListContainer>
            </LeftSide>
            <RightSide>
              <Switch>
                <Route path={`${path}/:hashid`}>
                  <LinkInfo />
                </Route>
                <Route path={`${path}`}>Select a link to view its stats.</Route>
              </Switch>
            </RightSide>
          </Content>
        )}
      </Container>
    </LinksContext.Provider>
  );
}
