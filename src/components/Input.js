import React from 'react';
import io from 'socket.io-client';

// const socket = io.connect('http://localhost:8080/');
var socket = io();

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messageReceived: [],
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendMessage(evt) {
    evt.preventDefault();
    socket.emit('chat message', { message: this.state.message });
    this.setState({ message: '' });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  componentDidMount() {
    socket.on('receive message', ({ message }) => {
      this.setState({
        messageReceived: [...this.state.messageReceived, message],
      });
    });
  }

  render() {
    return (
      <div>
        <form>
          <input
            placeholder="type here"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          ></input>
          <button
            onClick={(evt) => {
              this.sendMessage(evt);
            }}
          >
            Send
          </button>
          <h2>Chat Log</h2>
          {this.state.messageReceived.map((message) => {
            return <h3>{message}</h3>;
          })}
        </form>
      </div>
    );
  }
}
export default Input;
