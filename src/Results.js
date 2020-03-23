import React, { Component } from 'react'
import YouTubeVideo from './YouTubeVideo';

class Results extends Component {
  constructor(props){
    super(props);

    this.state = {
      iframToPlay: null,
      videoTitle: null,
      ytid: null
    };
    this.play = this.play.bind(this);
  }

  play(video){ 
    var link = `https://www.youtube.com/embed/${video.id.videoId}`;
    var iframe =<iframe width="590" height="340" title="myFrame" src={link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
    var videoTitle = <h3 className="videotitle">{video.snippet.title}</h3>;
    this.setState({iframToPlay: iframe});
    this.setState({ytid: video.id.videoId});
    this.setState({videoTitle});
    this.props.uuid();
    if(this.props.userData !== null){
      this.props.toSave(video);
    }
    
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
                  ? <YouTubeVideo ytid={this.state.ytid} />
                  : ''
                }
                {/*iframtoplay*/}
                
                
              </div>
            </div>
          </div>
        </main>
      );
    }
}
export default Results
