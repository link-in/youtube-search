import React, { Component } from 'react';
import axios from 'axios';
var firebase = require('firebase');

class Users_activity extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users_activity: null
         };
        this.getData = this.getData.bind(this);
    }
    
    getData(){
        firebase.database().ref(
            '/users_activity/'
        ).on("value", snapshot => {
          if (snapshot && snapshot.exists()) {
              this.setState({users_activity: snapshot.val()});
            //   console.log(snapshot.val());
          }});
    }  

    render() {

        this.getData();

        {
          if(this.props.searchRessults === null && this.state.users_activity !== null){
            var results =         
            <div className="row">
              <h3>Results: Popular youtube searches</h3>
            </div>
            

    
          }  
        }

        return (
          <main className="container">
            <div className="row">
              <div className="col-md-12">
                {results}
              </div>
            </div>
          </main>
        );
    }

}
 
export default Users_activity;