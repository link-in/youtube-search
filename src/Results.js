import React, { Component } from 'react'
import YouTubeVideo from './YouTubeVideo';
import * as uuid from 'uuid';
var firebase = require('firebase');


class Results extends Component {
  constructor(props){
    super(props);

    this.state = {
      videoTitle: null,
      ytid: null,
      start_time: null,
      end_time: null,
      total_time: null,
      save_total: null,
      uuid: uuid.v1(),
      video: null
    };

    this.play = this.play.bind(this);
    this.getUserAction = this.getUserAction.bind(this);
    this.toSave = this.toSave.bind(this);
  }

  play(video){ 
    this.setState({video: video});
    if(this.state.ytid !== null && this.props.userData !== null){
      this.toSave(video);
      this.setState({total_time: null});
      this.setState({uuid: uuid.v1()});
    }

    var videoTitle = <h3 className="videotitle">{video.snippet.title}</h3>;
    this.setState({ytid: video.id.videoId});
    this.setState({videoTitle});
  } 

  getUserAction = (type) => {
    
    if(this.props.userData === null){
      return false;
    }

    /*press play button*/
    if(type == '_onPlay'){
      this.setState({start_time: new Date()}); 
      // if(this.state.total_time === null){
       
      // }else{
      //   var total_temp = new Date() - this.state.total_time;
      // } 
    }

    if(type == '_onPause'){
      var total_temp = new Date() - this.state.start_time;
      if(this.state.total_time === null){
        this.setState({total_time: total_temp});
        this.setState({save_total: total_temp / 1000});
      }else{
          var new_total = total_temp + this.state.total_time;
          this.setState({total_time: new_total});
          this.setState({save_total: new_total / 1000});
      } 
      console.log(this.state.save_total);
      this.toSave(this.state.video);
    }

    

  
  }

  /*if user login save to firebase*/
  toSave = (video) => {
    firebase.database().ref('users_activity/'+ this.state.uuid).set({
        videoID: video.id.videoId,
        videoTitle: video.snippet.title,
        userEmail: this.props.userData.email,
        watch_time: this.state.save_total
    }, function(error) {
      if (error) {
       console.log("error: "+error);
       
      }else{ 
       console.log('saved to firebase');
      }
    });
  
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
                <p><b>Video Name:</b> {video.snippet.title}</p>
                <p><b>Video description:</b> {video.snippet.description}</p>
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
