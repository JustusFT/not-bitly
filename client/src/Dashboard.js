import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import linksApi from "./linksApi";

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
            <div>{JSON.stringify(link)}</div>
          ))}
        </div>
      </Content>
    </Container>
  );
}
