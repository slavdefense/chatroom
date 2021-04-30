import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
// import SignInButton from "../sign-in/sign-in.component";
import "./firebase.style.css";

firebase.initializeApp({
  apiKey: "AIzaSyA0lKezQQeDmBMsJ1-k3Ede7P4rSGVi08E",
  authDomain: "chatroom-a6b30.firebaseapp.com",
  projectId: "chatroom-a6b30",
  storageBucket: "chatroom-a6b30.appspot.com",
  messagingSenderId: "1083279852403",
  appId: "1:1083279852403:web:a905fe6a3ff0856ac1fb06",
  measurementId: "G-6EY0PR4S4H",
});

export const auth = firebase.auth();
const firestore = firebase.firestore();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign In With Google </button>;
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const nepchatRef = firestore.collection("nepchat");
  const query = nepchatRef.orderBy("createdAt").limit(25);
  const [nepchat] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await nepchatRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
  };

  return (
    <>
      <main>
        {nepchat &&
          nepchat.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Enter </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className="messageBox">
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export { SignIn, ChatRoom, SignOut };
