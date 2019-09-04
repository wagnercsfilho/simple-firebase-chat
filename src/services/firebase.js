import firebase from 'firebase/app';

require('firebase/auth');
require('firebase/database');

const firebaseConfig = {
  apiKey: 'AIzaSyDQce04X_xh8qbc66kM0Rue2YawYQGz-7w',
  authDomain: 'tech-talk-chat.firebaseapp.com',
  databaseURL: 'https://tech-talk-chat.firebaseio.com',
  projectId: 'tech-talk-chat',
  storageBucket: '',
  messagingSenderId: '505834260036',
  appId: '1:505834260036:web:a45677d040225741'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
