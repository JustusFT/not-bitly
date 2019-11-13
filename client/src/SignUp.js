import React from "react";
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

export default function SignUp() {
  return (
    <AuthLayout>
      <h2>Create an account</h2>
      <Form method="POST" action="/api/auth/sign-up">
        <FormItem label="Email address">
          <input type="text" name="email" />
        </FormItem>
        <FormItem label="Password">
          <input type="password" name="password" />
        </FormItem>
        <FormItem label="Confirm Password">
          <input type="password" name="passwordConfirmation" />
        </FormItem>
        <input type="submit" value="Sign up" />
      </Form>
    </AuthLayout>
  );
}
