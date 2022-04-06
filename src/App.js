import logo from "./logo.svg";
import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  const handleLogIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };
  return (
    <div className="App">
      <h1>Firebase Authentication</h1>

      <img src={user.photoURL} alt="" />
      <p>
        <strong>Name: </strong>
        {user.displayName}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      {user.email ? (
        <button onClick={handleLogOut}>Sign Out</button>
      ) : (
        <button onClick={handleLogIn} style={{ marginRight: "10px" }}>
          Sign In
        </button>
      )}
    </div>
  );
}

export default App;
