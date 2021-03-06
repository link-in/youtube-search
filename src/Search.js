import React, { Component } from 'react'
import axios from 'axios';
var firebase = require('firebase');

const api ='AIzaSyAie6bUz7eaix7F0xKbkowIlgahHsimPts';
const maxResults = 10;
var apiUrl  = `https://www.googleapis.com/youtube/v3/search?key=${api}&part=snippet,id&maxResults=${maxResults}&type=video&q=`;

class Search extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ComponentQ: null,
      ComponentSearchQoury: null
    }
    this.searchFun = this.searchFun.bind(this);
    this.getData = this.getData.bind(this);
    this.toSave = this.toSave.bind(this);
  }

  searchFun(event){
    this.props.SearchQoury(this.refs.searchQoury.value);
    this.props.q(this.refs.searchQoury.value);
    this.setState({ComponentSearchQoury: this.refs.searchQoury.value});
    this.setState({ComponentQ: apiUrl+this.refs.searchQoury.value});
    if(this.refs.searchQoury.value !== null){
      this.toSave(this.refs.searchQoury.value);
      this.getData(apiUrl+this.refs.searchQoury.value);
    }
    event.preventDefault();
  }

  getData(urlToSearch){
    axios.get(urlToSearch)
    .then((response) => {
      const result = response.data.items;
      // console.log(result);
      this.props.searchRessults(result); 
    })
    .catch((error) => {
      console.log(error);
    })
  }  

  toSave = (q) => {
    if(this.props.userData === null){
      return false;
    }

    firebase.database().ref('users_query/'+this.props.uuid).set({
        query:q,
        userEmail:this.props.userData.email
    }, function(error) {
      if (error) {
       console.log("error: "+error);
      }else{ 
       console.log('saved to firebase: users_query');
      }
    });
  
  }

  render() {
    return (
      <div className="search-box">
        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="click-m">Click to search <i className="fa fa-arrow-right"></i></div>
            <div className="searchbar">
              <form onSubmit={this.searchFun}>
                <input className="search_input" ref="searchQoury"  type="text" name="" defaultValue="" placeholder="Search..." />
                <button href="#" className="search_icon">
                <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Search

