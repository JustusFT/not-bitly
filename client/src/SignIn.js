import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "./AuthLayout";
import FormItem from "./FormItem";

const Form = styled.form`
  input {
    width: 100%;
  }

  > *:not(:first-child) {
    margin-top: 16px;
  }
`;

const Spacer = styled.div`
  height: 16px;
`;

export default function SignIn() {
  return (
    <AuthLayout>
      <h2>Sign in</h2>
      <Form method="POST" action="/api/auth/sign-in">
        <FormItem label="Email address">
          <input type="text" name="email" />
        </FormItem>
        <FormItem label="Password">
          <input type="password" name="password" />
        </FormItem>
        <input type="submit" value="Submit" />
      </Form>
      <Spacer />
      <div>
        <Link to="/sign-up">Create an account</Link>
      </div>
    </AuthLayout>
  );
}
