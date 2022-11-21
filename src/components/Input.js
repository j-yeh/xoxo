import React from 'react';
import io from 'socket.io-client';
import { Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import MoodIcon from '@mui/icons-material/Mood';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

// const socket = io.connect('http://localhost:8080/');
var socket = io.connect();

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      message: '',
      messageReceived: [],
      showEmojis: false,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendMessage(evt) {
    evt.preventDefault();
    socket.emit('chat message', {
      name: this.state.name,
      message: this.state.message,
      date: new Date().toLocaleString(),
    });

    this.setState({ message: '' });
  }

  addEmoji(e) {
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji,
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  componentDidMount() {
    socket.on('receive message', ({ name, message, date }) => {
      console.log(date);
      this.setState({
        messageReceived: [
          ...this.state.messageReceived,
          { name, message, date },
        ],
      });
    });
  }

  render() {
    return (
      <div className="input-div">
        <form
          className="input-form"
          onSubmit={(evt) => {
            this.sendMessage(evt);
          }}
        >
          <TextField
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            id="standard-basic"
            label="Name"
            variant="standard"
          />
          <br />
          <TextField
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            id="standard-basic"
            label="Type Here"
            variant="standard"
          />
          <IconButton
            aria-label="emoji"
            onClick={() => {
              this.setState({ showEmojis: !this.state.showEmojis });
            }}
          >
            <MoodIcon />
          </IconButton>
          {this.state.showEmojis ? (
            <span>
              <Picker data={data} onEmojiSelect={this.addEmoji} />
            </span>
          ) : null}
          <Button
            type="submit"
            variant="outlined"
            size="small"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
          <h5>Chat Log</h5>
          <div className="chat-log-container">
            {this.state.messageReceived.map((message, index) => {
              return (
                <div key={index}>
                  <div id="message">
                    {message.name}: {message.message}
                  </div>{' '}
                  <p id="date">{message.date}</p>
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
