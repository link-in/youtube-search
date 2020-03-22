import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from 'firebase';
import * as uuid from 'uuid';
// var uuid = require('uuid');


import Header from './Header';
import Login from './Login';
import Search from './Search';
import Results from './Results';



class App extends Component {

  constructor() {
    super();
    this.state = {
        uuid: null,
        searchRessults: null,
        searchQoury : null,
        q: null,
        userData: null
        
    };

    this.toSave = this.toSave.bind(this);
    this.setSearchQoury = this.setSearchQoury.bind(this);
    this.setQ = this.setQ.bind(this);
    this.setSearchRessults = this.setSearchRessults.bind(this);
    this.setUuid = this.setUuid.bind(this);
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
    this.setState({userData: user});
  }

  setUuid = () => {
    this.setState({uuid: uuid.v1()});
  }

  toSave = (video) => {
    //console.log(this.state.userData.user);
    firebase.database().ref('youtubeQuery/'+this.state.uuid).set({
        videoID: video.id.videoId,
        videoTitle: video.snippet.title,
        userEmail: this.state.userData.user.email,
        query:this.state.searchQoury
    });

  }


  render() {
    
    return (
      <div className="App">
        <Header headerText="Youtube Search" />
        <Login getUserData={this.setUserData}/>
        <Search SearchQoury={this.setSearchQoury} q={this.setQ}  searchRessults={this.setSearchRessults} />
        <Results searchRessults={this.state.searchRessults} searchQoury={this.state.SearchQoury} 
          iframToPlay={this.state.iframToPlay} videoTitle={this.state.videoTitle} toSave={this.toSave} userData={this.state.userData}
          uuid={this.setUuid}
        />
      </div>

    );
  }
}




export default App;
