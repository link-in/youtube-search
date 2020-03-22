import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header>
        <div className="container header-box">
          <h1>{this.props.headerText}</h1>
        </div>
      </header>
    );
  }
}
export default Header
