import React from 'react';
import io from 'socket.io-client';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import ModeIcon from '@mui/icons-material/Mode';

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
    socket.emit('chat message', {
      message: this.state.message,
      date: new Date().toLocaleString(),
    });

    this.setState({ message: '' });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  componentDidMount() {
    socket.on('receive message', ({ message, date }) => {
      console.log(date);
      this.setState({
        messageReceived: [...this.state.messageReceived, { message, date }],
      });
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={(evt) => {
            this.sendMessage(evt);
          }}
        >
          <TextField
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            id="standard-basic"
            label="Type Here"
            variant="standard"
          />
          <Button
            type="submit"
            variant="outlined"
            size="small"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
          <h4>Chat Log</h4>
          <div>
            {this.state.messageReceived.map((message, index) => {
              return (
                <div key={index}>
                  <p>{message.message}</p>
                  <p>{message.date}</p>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    );
  }
}
export default Input;
