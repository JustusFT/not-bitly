import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from './AuthLayout';
import Button from './common/Button';
import FormItem from './common/FormItem';
import Input from './common/Input';
import Spacer from './common/Spacer';

const Form = styled.form`
  > *:not(:first-child) {
    margin-top: 16px;
  }
`;

export default function SignIn() {
  return (
    <AuthLayout>
      <h2>Sign in</h2>
      <Form method="POST" action="/api/auth/sign-in">
        <FormItem label="Email address">
          <Input block type="text" name="email" />
        </FormItem>
        <FormItem label="Password">
          <Input block type="password" name="password" />
        </FormItem>
        <Button block color="primary" type="submit">
          Sign in
        </Button>
      </Form>
      <Spacer />
      <div>
        <Link to="/sign-up">Create an account</Link>
      </div>
    </AuthLayout>
  );
}
