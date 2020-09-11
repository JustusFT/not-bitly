import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from './AuthLayout';
import Button from './common/Button';
import ErrorText from './common/ErrorText';
import FormItem from './common/FormItem';
import Input from './common/Input';

const SignUpForm = styled(Form)`
  > *:not(:first-child) {
    margin-top: 16px;
  }
`;

export default function SignUp() {
  const history = useHistory();

  return (
    <AuthLayout>
      <h2>Create an account</h2>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          email: '',
          password: '',
          passwordConfirmation: ''
        }}
        onSubmit={async (values, formikBag) => {
          const response = await fetch('/api/auth/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          });

          if (response.ok) {
            history.push('/a/sign-in');
          } else if (response.status === 422) {
            const json = await response.json();
            formikBag.setErrors(json.errors);
          } else {
            // server error
          }
        }}
      >
        {({ getFieldProps, submitForm }) => (
          <SignUpForm>
            <FormItem label="Email address">
              <Input
                block
                type="text"
                name="email"
                {...getFieldProps('email')}
              />
            </FormItem>
            <ErrorMessage name="email" component={ErrorText} />
            <FormItem label="Password">
              <Input
                block
                type="password"
                name="password"
                {...getFieldProps('password')}
              />
            </FormItem>
            <ErrorMessage name="password" component={ErrorText} />
            <FormItem label="Confirm Password">
              <Input
                block
                type="password"
                name="passwordConfirmation"
                {...getFieldProps('passwordConfirmation')}
              />
            </FormItem>
            <ErrorMessage name="passwordConfirmation" component={ErrorText} />
            <Button block onClick={() => submitForm()} color="primary">
              Sign up
            </Button>
          </SignUpForm>
        )}
      </Formik>
    </AuthLayout>
  );
}
