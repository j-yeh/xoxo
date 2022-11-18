import React from 'react';
import io from 'socket.io-client';
var socket = io();

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      onlineUsers: [],
    };
  }

  componentDidMount() {
    socket.on('online users', (users) => {
      this.setState({
        onlineUsers: [...this.state.onlineUsers, users],
      });
    });
  }

  render() {
    return (
      <div>
        <p>Online Users:</p>
        <div>{this.state.onlineUsers}</div>
      </div>
    );
  }
}
export default Home;
