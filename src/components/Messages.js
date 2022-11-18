import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';

const Messages = () => {
  let [dbmessage, setdbMessage] = useState('');

  async function getMessage() {
    const { data: dbmessage } = await axios.get('/message');
    setdbMessage(dbmessage.text);
  }
  getMessage();
  return (
    <h1>
      {dbmessage}
      <Input />
    </h1>
  );
};
export default Messages;
