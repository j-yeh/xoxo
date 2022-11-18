import React from 'react';
import io from 'socket.io-client';

// const socket = io.connect('http://localhost:8080/');
var socket = io();

class Input extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.sendMessage = this.sendMessage.bind(this);
  }
  sendMessage(evt) {
    evt.preventDefault();
    socket.emit('chat message', { message: 'Hello' });
    console.log('hi');
  }

  render() {
    return (
      <div>
        <form>
          <input placeholder="type here"></input>
          <button
            onClick={(evt) => {
              this.sendMessage(evt);
            }}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}
export default Input;
