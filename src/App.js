import React from "react";
import "./App.css";
import { SignIn, ChatRoom, SignOut } from "./firebase/firebase.utils.js";

import { auth } from "./firebase/firebase.utils.js";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
