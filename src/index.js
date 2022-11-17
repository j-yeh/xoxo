import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

const Root = () => {
  let [message, setMessage] = useState('');

  async function getMessage() {
    const { data: message } = await axios.get('/message');
    setMessage(message.text);
  }
  getMessage();
  return <h1>{message}</h1>;
};

const root = createRoot(document.getElementById('root'));

root.render(<Root />);
