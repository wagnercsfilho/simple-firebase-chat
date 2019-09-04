import React, { useEffect, useState } from 'react';
import firebase from '../../services/firebase';
import './App.css';
import '../../services/firebase';
import Auth from '../Auth/Auth';
import Chat from '../Chat/Chat';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        await firebase
          .database()
          .ref('users')
          .child(firebaseUser.uid)
          .once('value')
          .then(snapshot => {
            setUser(snapshot.val());
          });
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return <div className="App">{user ? <Chat user={user} /> : <Auth />}</div>;
}

export default App;
