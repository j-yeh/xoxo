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
        <section id="logo-wrapper">
          <img src="logo-192x192.png" id="logo"></img>
        </section>
        {/* <h1 id="page-name">xoxo</h1> */}
        <p>Online Users: {this.state.onlineUsers.length}</p>
      </div>
    );
  }
}
export default Home;
