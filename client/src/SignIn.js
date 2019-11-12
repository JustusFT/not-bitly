import React from "react";

export default function SignIn() {
  return (
    <div>
      Sign in
      <form method="POST" action="/api/auth/sign-in">
        <input type="text" name="email" />
        <input type="password" name="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
