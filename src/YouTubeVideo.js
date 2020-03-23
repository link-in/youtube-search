import React from 'react';
import YouTube from 'react-youtube';
 
class YouTubeVideo extends React.Component {
    constructor(props){
        super(props);
        window.ytvideo = this;
    }

    render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: true,
        playing:true,
        frameBorder: 0 ,
        allowFullScreen: 1,
        origin: 'http://localhost:3000'
      }
    };

    return (
      <YouTube
        videoId={this.props.ytid}
        opts={opts}
        onReady={this._onReady}
        onPause={this._onPause}
        onPlay={this._onPlay}
        onEnd={this._onEnd}
      />
    );
  }
 
  _onReady(event) {
    event.target.pauseVideo();
  }
  
  _onPlay(event) {
    window.ytvideo.props.getUserAction('_onPlay');
  }

  _onPause(event) {
    window.ytvideo.props.getUserAction('_onPause');
  }

  _onEnd(event) {
    window.ytvideo.props.getUserAction('_onEnd');
  }
}

export default YouTubeVideo;
