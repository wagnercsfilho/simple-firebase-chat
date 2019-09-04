import React, { useState } from 'react';
import './Auth.css';
import firebase from '../../services/firebase';

function Auth() {
  const [username, setUsername] = useState('');

  async function signIn(e) {
    e.preventDefault();

    if (!username || username.trim() === '') {
      alert('Preencha seu nome de usuário...');
    }

    await firebase
      .auth()
      .signInAnonymously()
      .then(snapshot => {
        const userRef = firebase.database().ref('users');
        const { uid: id } = snapshot.user;

        return userRef.child(id).set({
          id,
          username
        });
      });
  }

  return (
    <div className="auth">
      <form onSubmit={signIn}>
        <h1>TechTalk Chat</h1>
        <div>
          <input
            className="auth-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <button className="auth-button">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
