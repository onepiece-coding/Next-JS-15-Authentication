"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";

const Counter = () => {
  //   const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  console.log(user);

  const [count, setCount] = useState(0);

  //   if (!isLoaded || !userId) {
  //     return null;
  //   }

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
