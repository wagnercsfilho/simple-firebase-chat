import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import firebase from '../../services/firebase';
import './Chat.css';

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  function getMessages() {
    const unsubscribe = firebase
      .database()
      .ref('messages')
      .on('value', snapshot => {
        const messages = snapshot.val() || {};
        setMessages(Object.keys(messages).map(key => messages[key]));
      });

    return () => unsubscribe();
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!text || text.trim() === '') {
      return;
    }
    const messageRef = firebase.database().ref('messages');
    const messageId = messageRef.push().key;

    messageRef
      .child(messageId)
      .set({
        id: messageId,
        text,
        user: {
          id: user.id,
          username: user.username
        }
      })
      .then(() => {
        setText('');
      })
      .catch(err => {
        alert('Send message failed!');
      });
  }

  useEffect(() => {
    getMessages();
  }, []);

  const IsEmpty = !messages.length ? (
    <div className="chat-no-messages">
      <p>No messages...</p>
    </div>
  ) : null;

  return (
    <div className="chat">
      <header className="chat-header">TechTalk Chat</header>
      {IsEmpty || (
        <div className="chat-messages">
          {messages.map(message => (
            <div
              key={message.id}
              className={classnames({
                'chat-messages-item-author': message.user.id === user.id,
                'chat-messages-item': message.user.id !== user.id
              })}
            >
              <div className="chat-message-text">{message.text}</div>
              <div className="chat-message-username">
                {message.user.username}
              </div>
            </div>
          ))}
        </div>
      )}
      <form className="chat-footer" onSubmit={e => sendMessage(e)}>
        <input
          onChange={e => setText(e.target.value)}
          className="chat-footer-input"
          placeholder="Escreva sua mensagem..."
        />
        <button className="chat-footer-btn">Enviar</button>
      </form>
    </div>
  );
}
