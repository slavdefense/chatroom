import React from "react";
import "./App.css";
import { SignIn, ChatRoom, SignOut } from "./firebase/firebase.utils.js";

import { auth } from "./firebase/firebase.utils.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./header/header.component";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Header SignOut={<SignOut />}></Header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
