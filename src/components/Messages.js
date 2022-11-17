import React, { useState } from 'react';
import axios from 'axios';

const Messages = () => {
  let [message, setMessage] = useState('');

  async function getMessage() {
    const { data: message } = await axios.get('/message');
    setMessage(message.text);
  }
  getMessage();
  return <h1>{message}</h1>;
};
export default Messages;
