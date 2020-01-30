import React, {Component} from 'react';
import {connect} from "react-redux";

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import axios from "axios"
import {setUser} from "../actions/userAction"

  class LoginView extends Component {
  constructor(props){
    super(props)
    this.state = {
        email: "",
        password: "",
        user: {}
    }
  }

  // fetches user data and updates global state //
  getUserData = async () => {
    if (document.cookie.includes("jwt="))  {
     await axios
        .get('/api/listing/getuser') 
        .then(user => {
          this.props.setUser(user.data)
          console.log('User has been set to state')
          this.setState({ user: user.data });
        })
        .catch(err => console.log(err))
        }
      }

  // on submit function fetching from backend route ///
  onSubmit = e => {
    e.preventDefault();
    axios.get('/users/login', {
      email: this.state.email,
      password: this.state.password
    })
    console.log("You signed in!");
    
  }
  
  // mounting func //
  componentWillMount() {
    this.getUserData();
  }

    render(){
        return (
            <Grid centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center">
                  Login
                </Header>
                <Segment>
                  <Form size="large">
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Email address"
                      name="email"
                      onChange={this.onChange}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={this.onChange}
                    />
                    <Button 
                    color="blue"
                    fluid size="large"
                    onClick={this.onSubmit}
                    type='submit'>
                      Login
                    </Button>
                    <br></br>
                    <Button color="blue" fluid size="large"><a href="/auth/google" onClick={this.getUserData}>Login with Google</a></Button>
                  </Form>
                </Segment>
                <Message>
                  Not registered yet? <a href="users/new">Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
        )
    }
  }


// mapping user to props
const mapDispatchToProps = (dispatch) => ({
  setUser: user => dispatch(setUser(user))
})

export default connect(
  null,
  mapDispatchToProps
)(LoginView)