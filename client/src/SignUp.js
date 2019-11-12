import React from "react";

export default function SignUp() {
  return (
    <div>
      Sign up
      <form method="POST" action="/api/auth/sign-up">
        <input type="text" name="email" />
        <input type="password" name="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
