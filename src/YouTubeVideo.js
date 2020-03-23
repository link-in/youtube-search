import React from 'react';
import YouTube from 'react-youtube';
 
class YouTubeVideo extends React.Component {
    constructor(props){
        super(props);
        window.ytvideo = this;
        this.state = {
            start_time: null,
            end_time: null,
            total_time: null,
            save_total: null,
            id_to_save: null
        };
    }
      

    render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
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
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  
  _onPlay(event) {
    console.log('start');
    if(window.ytvideo.state.id_to_save !== null){
        alert(window.ytvideo.state.id_to_save+" : "+window.ytvideo.state.save_total);
    }
    window.ytvideo.setState({start_time: new Date()}); 
    window.ytvideo.setState({id_to_save: window.ytvideo.props.ytid}); 
  }

  _onPause(event) {
    window.ytvideo._save();
  }

  _onEnd(event) {
    window.ytvideo._save();
    alert('store to db');
  }

  _save(){
    var total = new Date() - window.ytvideo.state.start_time;
    if(window.ytvideo.state.total_time === null){
        window.ytvideo.setState({total_time: total});
        window.ytvideo.setState({save_total: total / 1000});
    }else{
        var new_total = total + window.ytvideo.state.total_time;
        window.ytvideo.setState({total_time: new_total});
        window.ytvideo.setState({save_total: new_total / 1000});
    } 
    console.log(window.ytvideo.state.save_total);
    
  }
}

export default YouTubeVideo;