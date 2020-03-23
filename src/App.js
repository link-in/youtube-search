import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import * as firebase from 'firebase';

import * as uuid from 'uuid';
// var uuid = require('uuid');


import Header from './Header';
import Login from './Login';
import Search from './Search';
import Results from './Results';

// var firebase = require('firebase');
//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyCUkh3vZCBcZqjfAnCRrQmV-W6KPYQ-VbM",
//     authDomain: "kimaia-5807f.firebaseapp.com",
//     databaseURL: "https://kimaia-5807f.firebaseio.com",
//     projectId: "kimaia-5807f",
//     storageBucket: "kimaia-5807f.appspot.com",
//     messagingSenderId: "169231303917",
//     appId: "1:169231303917:web:0913e201bfe5cc1d02b8e4"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);



class App extends Component {

  constructor() {
    super();
    this.state = {
        uuid:  uuid.v1(),
        searchRessults: null,
        searchQoury : null,
        q: null,
        userData: null        
    };


    this.setSearchQoury = this.setSearchQoury.bind(this);
    this.setQ = this.setQ.bind(this);
    this.setSearchRessults = this.setSearchRessults.bind(this);
    // this.setUuid = this.setUuid.bind(this);
  }

  setSearchQoury = (val) => {
    this.setState({searchQoury: val});
  }

  setQ = (val) => {
    this.setState({q: val});
  }

  setSearchRessults = (val) => {
    this.setState({searchRessults: val})
  }

  setUserData = (user) => {
    this.setState({userData: user.user});
  }

  // setUuid = () => {
  //   this.setState({uuid: uuid.v1()});
  // }




  render() {
    
    return (
      <div className="App">
        <Header headerText="Youtube Search" />
        <Login getUserData={this.setUserData}/>
        <Search SearchQoury={this.setSearchQoury} q={this.setQ}  searchRessults={this.setSearchRessults} />
        <Results 
          searchRessults={this.state.searchRessults} 
          searchQoury={this.state.searchQoury} 
          videoTitle={this.state.videoTitle} 
          userData={this.state.userData}
          uuid={this.state.uuid}
        />
      </div>

    );
  }
}




export default App;
