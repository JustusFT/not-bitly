import React from 'react';
import styled from 'styled-components';
import AuthLayout from './AuthLayout';
import Button from './common/Button';
import FormItem from './common/FormItem';
import Input from './common/Input';

const Form = styled.form`
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
          <Input block type="text" name="email" />
        </FormItem>
        <FormItem label="Password">
          <Input block type="password" name="password" />
        </FormItem>
        <FormItem label="Confirm Password">
          <Input block type="password" name="passwordConfirmation" />
        </FormItem>
        <Button block color="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </AuthLayout>
  );
}
