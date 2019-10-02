import React from 'react';
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  state = {
    user: '',
    usernameText: 'sandramkimball',
    followings: [],
  };

  componentDidMount(){
    Axios
    .get(`https://api.github.com/users/sandramkimball`)
    .then(res=> {
      console.log(res.data)
      this.setState({
        user: res.data,
      });
    })
    .catch(err=> console.log('GRRAUGH!', err))
  }
  
  componentDidUpdate(prevProps, prevState){
    if(this.state.user !== prevState.user){
      if (this.state.usernameText === null){
        Axios
        .get(`https://api.github.com/users/sandramkimball`)
      .then(res=> {
        console.log(res.data)
        this.setState({
          user: res.data,
        });
      })
    .catch(err=> console.log('GRRAUGH!', err));
      }
    }
  }

  handleChanges = e => {
    this.setState({
      usernameText: e.target.value
    });
  };

  fetchFollowing = e => {
    e.preventDefault();
    Axios
    .get(`https://api.github.com/users/${this.state.usernameText}/following`)
    .then(res => {
        console.log(res.data)
      this.setState({
        followings: res.data
      });
    })
    .catch(err=> console.log('RAGHH', err))
  };

  fetchUser = e => {
    e.preventDefault();
    Axios
    .get(`https://api.github.com/users/${this.state.usernameText}`)
    .then(res => {
        console.log(res.data)
      this.setState({
        user: res.data
      });
    })
    .catch(err=> console.log('RAGHH', err))
  };

  render(){
    return (
      <div className="App">
        <header className="header">
          <h1> Spinosaurus </h1>
          <input
          type='text'
          placeholder='Enter Username'
          value={this.state.usernameText}
          onChange={this.handleChanges}
          />
          <button onClick={this.fetchUser}>Find User</button>
        </header>

        <section className='card-container'>
          <div className='user-container userCard'>
            <img height='300' src={this.state.user.avatar_url} alt='profile avatar'/>
            <div>
              <h2>{this.state.user.login}</h2>
              <p>{this.state.user.name}</p>
              <p>{this.state.user.location}</p>
              <p>{this.state.user.bio}</p>
              
            </div>
          </div>
         
          <button onClick={this.fetchFollowing} className='following-btn'>Following:</button>

          <div className='following-container card'>
           {this.state.followings.map((following) =>(
             <div className='followingCard'>
              <img src={following.avatar_url} key={following.id} alt={following}/> 
              <p>{following.login}</p>
            </div>
           ))}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
