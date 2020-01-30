import React, { Component } from 'react';
import './App.css';
import { Menu } from "semantic-ui-react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {connect} from "react-redux";


import LoginView from "./components/LoginView"
import LoginSwitch from "./components/LoginSwitch"
import ProfileView from "./components/MyProfileView"
import DashboardView from './components/DashboardView'
import SellerProfile from './components/SellerProfile'
import NewProductForm from './components/NewProductForm'
import CreateUserView from './components/CreateUserView'

 export class App extends Component {
  state = {
    loggedIn: false,
    activeItem: 'Dashboard',
    userid: {}
  };
  // setting loggin in state if cookie includes jwt //
  setLoggedIn = (e, { name }) => {
    this.setState({activeItem: name})
    document.cookie.includes("jwt=") ? this.setState({loggedIn: true}) : this.setState({loggedIn: false})
    };
  

  componentDidMount(){
    if (document.cookie.includes("jwt=")){
      this.setState({loggedIn: true, activeItem: "Login"});
    }};


  render(){
    // Destructure activeItem and login status from state
    const { activeItem } = this.state
    return (
      <div className="App" data-test="component-app">
        <BrowserRouter>
        
          <Menu className="nav" inverted>
            <div>
            <Menu.Item
              as={Link} to='/dashboard' 
              name='Dashboard'
              active={activeItem === 'Dashboard'}
              onClick={this.setLoggedIn}
              float="right"
            >
            </Menu.Item>
            </div>

            <Menu.Item
              as={Link} to='/products'
              name='New product'
              active={activeItem === 'Products'}
              onClick={this.setLoggedIn}
            >
            </Menu.Item>

            <Menu.Item
              as={Link} to='/users'
              name='My Profile'
              active={activeItem === 'Profile'}
              onClick={this.setLoggedIn}
            >
            </Menu.Item>

            <LoginSwitch 
              loggedIn={this.state.loggedIn} 
              setLoggedIn={this.setLoggedIn}/>
          </Menu>

          <Route exact path="/dashboard" component={DashboardView} />
          <Route exact path="/products" component={NewProductForm} />
          <Route exact path="/seller" component={SellerProfile} />
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/users" component={ProfileView} />
          <Route exact path="/" component={DashboardView} />
          <Route exact path="/users/new" component={CreateUserView} />
        </BrowserRouter>
       
      </div>
    )
  }
}
// mapping for redux state management //

const mapStateToProps = (state) => ({
  listings: state.listings,
  user: state.user
})
// exporting, needs null because it expects a dispatch export but not using //
export default connect(
  mapStateToProps,
  null
)(App)