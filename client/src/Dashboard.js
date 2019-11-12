import React from "react";

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <form method="POST" action="/api/auth/sign-out">
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
