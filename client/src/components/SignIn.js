import { ErrorMessage, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './App';
import AuthLayout from './AuthLayout';
import Button from './common/Button';
import ErrorText from './common/ErrorText';
import FormItem from './common/FormItem';
import Input from './common/Input';
import Spacer from './common/Spacer';

const SignInForm = styled(Form)`
  > *:not(:first-child) {
    margin-top: 16px;
  }
`;

export default function SignIn() {
  const history = useHistory();
  const userContext = useContext(UserContext);

  return (
    <AuthLayout>
      <h2>Sign in</h2>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async (values, formikBag) => {
          const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });

          if (response.ok) {
            const json = await response.json();
            userContext.setUser(json.user);
          } else {
            formikBag.setErrors({ email: 'Invalid email or password.' });
          }
        }}
      >
        {({ handleChange }) => (
          <SignInForm>
            <FormItem label="Email address">
              <Input block type="text" name="email" onChange={handleChange} />
            </FormItem>
            <FormItem label="Password">
              <Input
                block
                type="password"
                name="password"
                onChange={handleChange}
              />
            </FormItem>
            <ErrorMessage name="email" component={ErrorText} />
            <Button block color="primary" type="submit">
              Sign in
            </Button>
          </SignInForm>
        )}
      </Formik>
      <Spacer />
      <div>
        <Link to="/sign-up">Create an account</Link>
      </div>
    </AuthLayout>
  );
}
