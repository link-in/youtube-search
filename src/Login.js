import React, { Component } from 'react';
var firebase = require('firebase');


  class Login extends Component {

    login(event){
      const email = this.refs.email.value;
      this.setState({userEmail: email});
      const password = this.refs.password.value;
      // console.log(email, password);
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email, password);
  
      promise.then(user => {
        this.props.getUserData(user);
        var element = document.getElementById('logout');
        element.classList.remove('hide');
        var element = document.getElementById('welcome');
        element.classList.remove('hide');        
        var x = document.getElementById('notlogin');
        x.style.display = "none";
      });
  
      promise.catch(e => {
        var err = e.message;
        console.log(err);
        this.setState({err: err});
      });
    }
  
    signup(){
      const email = this.refs.email.value;
      this.setState({userEmail: email});
      const password = this.refs.password.value;
      console.log(email, password);
    
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise
      .then(user => { 
        firebase.database().ref('users/'+user.uid).set({
          email: email
        });
        this.props.getUserData(user);
        var element = document.getElementById('welcome');
        element.classList.remove('hide');
      });
      promise
      .catch(e => {
        var err = e.message;
        console.log(err);
        this.setState(({err: err}));
      });
    
    }
  
    logout(){
      firebase.auth().signOut();
      var lout = document.getElementById('logout');
      alert('logout');
      lout.classList.add('hide');
      var x = document.getElementById('notlogin');
      x.style.display = "inline-flex";

    }
  
    constructor(props){
      super(props);
  
      this.state = {
        err: '',
        userEmail: null
      };
  
      this.login = this.login.bind(this);
      this.signup = this.signup.bind(this);
      this.logout = this.logout.bind(this);
      // this.alert = this.alert.bind(this);
    }
  
    render(){
      return(
        <div className="login-box">
            <div className="login-inner form-group">
              <div className="row">
                <div id="notlogin">
                  <div className="col">
                    <input  className="form-control" id="email" ref="email" type="email" defaultValue="zurbracha@gmail.com" placeholder="Enter your email" />
                  </div>
                  <div className="col">
                    <input className="form-control"  id="pass" ref="password" type="password" defaultValue="zurbracha@gmail.com" placeholder="Enter your password"  />
                  </div>
                  <button className="btn btn-primary" onClick={this.login}>Log In</button>
                  <button className="btn btn-primary" onClick={this.signup}>Sign Up</button>
                </div>
                <p id="welcome" className="welcome hide"><b>welcome:</b> {this.state.userEmail}</p>
              <button className="btn btn-secondary hide" onClick={this.logout} id="logout">Log out</button>
              <p className="error">{this.state.err}</p>
              </div>
            </div>
        </div>
      );
    }
  }
  
  
  export default Login;