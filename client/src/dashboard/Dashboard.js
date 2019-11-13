import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import linksApi from "../linksApi";
import LinkInfo from "./LinkInfo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.nav`
  height: 64px;
`;

const Content = styled.main`
  flex: 1;
`;

export default function Dashboard() {
  const { path, url } = useRouteMatch();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("/api/links")
      .then(response => response.json())
      .then(json => setLinks(json));
  }, []);

  return (
    <Container>
      <Navbar>
        <form method="POST" action="/api/auth/sign-out">
          <button type="submit">Sign out</button>
        </form>
      </Navbar>
      <Content>
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
            <Form>
              <Field name="url" type="text" />
              <button type="submit">Shorten</button>
            </Form>
          )}
        />
        <div>
          {links.map(link => (
            <div>
              <div>{link.hashid}</div>
              <Link to={`${url}/${link.hashid}`}>Link</Link>
            </div>
          ))}
        </div>
      </Content>
      <Switch>
        <Route path={`${path}/:hashid`}>
          <LinkInfo />
        </Route>
        <Route path={`${path}`}>Select a link above</Route>
      </Switch>
    </Container>
  );
}
