import React, { Component } from 'react'
import YouTubeVideo from './YouTubeVideo';
var firebase = require('firebase');
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCUkh3vZCBcZqjfAnCRrQmV-W6KPYQ-VbM",
    authDomain: "kimaia-5807f.firebaseapp.com",
    databaseURL: "https://kimaia-5807f.firebaseio.com",
    projectId: "kimaia-5807f",
    storageBucket: "kimaia-5807f.appspot.com",
    messagingSenderId: "169231303917",
    appId: "1:169231303917:web:0913e201bfe5cc1d02b8e4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


class Results extends Component {
  constructor(props){
    super(props);

    this.state = {
      videoTitle: null,
      ytid: null,
      start_time: null,
      end_time: null,
      total_time: null,
      save_total: null
    };

    this.play = this.play.bind(this);
    this.getUserAction = this.getUserAction.bind(this);
    this.toSave = this.toSave.bind(this);
    window.ResultsComponent = this;
  }

  toSave = (video) => {
    if(this.props.userData === null){
      return false;
    }
    firebase.database().ref('youtubeQuery/'+this.props.uuid).set({
        videoID: video.id.videoId,
        videoTitle: video.snippet.title,
        userEmail:this.props.userData.email,
        query:this.props.searchQoury
    }, function(error) {
      if (error) {
       console.log("error: "+error);
       
      }else{ 
       console.log('saved to firebase');
      }
    });

  
  }

  

  play(video){ 
    var videoTitle = <h3 className="videotitle">{video.snippet.title}</h3>;
    this.setState({ytid: video.id.videoId});
    this.setState({videoTitle});

    /*if user login save to firebase*/
    // this.toSave(video);
    if(this.props.userData !== null){
      this.setState({start_time: new Date()}); 
      this.toSave(video);
    }
  } 

  getUserAction = (type) => {



  }

  render() {
    {
      if(this.props.searchRessults !== null){
        var results =         
        <div className="row">
      <h3>Results: {this.props.searchQoury}</h3>
      {
        this.props.searchRessults.map((video, i) => {
          var box = 
          <div className="video-box" key={i}>
            <div className="row">
              <div className="col-md-4 video-img">
                <img src={video.snippet.thumbnails.medium.url} width="180" />
              </div>
              <div className="col-md-6 video-info">
                <p><b>Song Name:</b> {video.snippet.title}</p>
                <p><b>Song description:</b> {video.snippet.description}</p>
                <p><b>Total votes:</b> {video.snippet.title}</p>
              </div>
              <div className="col-md-2 video-play">
                <span onClick={() => this.play(video)} >
                  <i className="fa fa-play"></i>
                </span>
              </div>                  
            </div>
          </div>
          return box;
        })
      }
    </div>

        var iframtoplay = this.state.iframToPlay;
        var videoTitle = this.state.videoTitle;
      }  

    }
    return (
      <main className="container">
        <div className="row">
          <div className="col-md-6">
            {results}
          </div>
          <div className="col-md-6">
            <div className="play-box">
              {videoTitle}
              {this.state.ytid
                ? <YouTubeVideo ytid={this.state.ytid} getUserAction={this.getUserAction}/>
                : ''
              }
              
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default Results
