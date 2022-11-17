import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';

const Messages = () => {
  let [message, setMessage] = useState('');

  async function getMessage() {
    const { data: message } = await axios.get('/message');
    setMessage(message.text);
  }
  getMessage();
  return (
    <h1>
      {message}
      <Input />
    </h1>
  );
};
export default Messages;
