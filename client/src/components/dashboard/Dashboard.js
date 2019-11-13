import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import linksApi from "../../util/api/linksApi";
import LinkInfo from "./LinkInfo";
import LinkList from "./LinkList";
import Navbar from "./Navbar";

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
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
`;

const RightSide = styled.div`
  padding: 16px;
`;

const LinkListContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const UrlForm = styled(Form)`
  padding: 16px;
  display: flex;

  > input[name="url"] {
    flex: 1;
  }
`;

export default function Dashboard() {
  const { path } = useRouteMatch();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("/api/links")
      .then(response => response.json())
      .then(json => setLinks(json));
  }, []);

  return (
    <Container>
      <Navbar />
      <Content>
        <LeftSide>
          <Formik
            initialValues={{
              url: ""
            }}
            onSubmit={async values => {
              const response = await linksApi.create(values.url);

              if (response.ok) {
                const json = await response.json();
                setLinks([json, ...links]);
              } else {
                // TODO handle error
              }
            }}
            render={() => (
              <UrlForm>
                <Field name="url" type="text" />
                <button type="submit">Shorten</button>
              </UrlForm>
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
            <Route path={`${path}`}>Select a link above</Route>
          </Switch>
        </RightSide>
      </Content>
    </Container>
  );
}
