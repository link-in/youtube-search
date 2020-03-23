import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

var firebase = require('firebase');

class Users_activity extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users_activity: [],
            users_query: []
         };
        // this.getData = this.getData.bind(this);
    }
    
    componentDidMount(){
      firebase.database().ref('/users_activity/').on('value', (snapshot) => {
        snapshot.forEach((child) => {
          // console.log(child.key, child.val()); 
          this.setState({users_activity : this.state.users_activity.concat(child.val()) });
          // arr_data.push(child.val());
          // console.log(arr_data);
          
          // console.log("intVal",this.intVal);
        });
      })

      firebase.database().ref('/users_query/').on('value', (snapshot) => {
        snapshot.forEach((child) => {
          // console.log(child.key, child.val()); 
          this.setState({users_query : this.state.users_query.concat(child.val()) });
          // arr_data.push(child.val());
          // console.log(arr_data);
          
          // console.log("intVal",this.intVal);
        });
      })


      
      
    }  

    render() {
      const data = this.state.users_activity;
      const columns = [{
        dataField: 'userEmail',
        text: 'userEmail'
      }, {
        dataField: 'videoID',
        text: 'videoID'
      }, {
        dataField: 'videoTitle',
        text: 'videoTitle'
      }, {
        dataField: 'watch_time',
        text: 'watch_time'
      }];

      const data_query = this.state.users_query;
      const columns_query = [{
        dataField: 'query',
        text: 'query'
      }, {
        dataField: 'userEmail',
        text: 'userEmail'
      }];

      {
        if(this.props.searchRessults === null && this.state.users_activity !== null){
          var results =         
          <div className="">
            <h3>Popular youtube searches</h3>
            <BootstrapTable keyField='id' data={ data } columns={ columns } />
          </div>
          
          var query_results = 
          <div className="">
            <h3>Popular youtube search query</h3>
            <BootstrapTable keyField='id' data={ data_query } columns={ columns_query } />
          </div>
        }  
      }

      return (
        <main className="container">
          <div className="row activities">
            <div className="col-md-6">
              {results}
            </div>              
            <div className="col-md-6">
              {query_results}
            </div>

            
          </div>
        </main>
      );
    }

}
 
export default Users_activity;