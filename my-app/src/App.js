import React from 'react';
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  state = {
    user: '',
    followers: [],
  };

  componentDidMount(){
    Axios
    .get(`https://api.github.com/users/sandramkimball`)
    .then(res=> {
      this.setState({
        user: res.data.message,
      });
      console.log(user)
    })
    .catch(err=> console.log('GRRAUGH!', err))
  }


  // fetchFollowers = e => {
  //   e.preventDefault();
  //   Axios
  //   .get(`https://api.github.com/users/sandramkimball/followers`)
  //   .then(res => {
  //     this.setState({
  //       followers: res.data.message
  //     });
  //   })
  //   .catch(err=> console.log('RAGHH', err))
  // }

  render(){
    return (
      <div className="App">
        <header className="header">
          <h1> Spinosaurus </h1>
          <input
          type='text'
          value={this.state.usernameText}
          onChange={this.handleChanges}
          />
          <button onClick={this.fetchUser}>Find User</button>
        </header>

        <section className='card-container'>
          <div className='user-container userCard'>
           <h2>{this.state.user.name}</h2>
          </div>
          <div className='follower-container card'>
           <h2>I am a robot.</h2>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
