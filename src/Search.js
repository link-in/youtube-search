import React, { Component } from 'react'
import axios from 'axios';

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
  }

  searchFun(event){
    this.props.SearchQoury(this.refs.searchQoury.value);
    this.props.q(this.refs.searchQoury.value);
    this.setState({ComponentSearchQoury: this.refs.searchQoury.value});
    this.setState({ComponentQ: apiUrl+this.refs.searchQoury.value});
    if(this.state.q !== null){
      this.getData();
    }
    event.preventDefault();
  }

  getData(){
    axios.get(this.state.ComponentQ)
    .then((response) => {
      const result = response.data.items;
      // console.log(result);
      this.props.searchRessults(result); 
    })
    .catch((error) => {
      console.log(error);
    })

  }  

  render() {
    return (
      <div className="search-box">
        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="searchbar">
              <form onSubmit={this.searchFun}>
                <input className="search_input" ref="searchQoury"  type="text" name="" placeholder="Search..." />
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

