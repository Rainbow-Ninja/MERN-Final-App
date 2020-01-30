import React, {Component} from "react"
import { Button, Checkbox, Form, Segment, Grid, Header } from 'semantic-ui-react'
import axios from "axios";

export default class CreateUserView extends Component {
  constructor(props){
    super(props)
    this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: ""
    }
  }

  //---------------------------------------------------------------------------------
  // onsubmit function that posts users to the backend based on whats in the state
  onSubmit = e => {
    e.preventDefault();
    console.log("You hit submit", e);
  
  axios.post("/api/users", {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPW: this.state.confirmPW
    })
    .then((response) => {
      if(response.data.success){
        this.props.history.push('/')
      }
    })
  }

  // logs change 
  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
    
  
  handleSubmit = e => {
     e.preventDefault();
     console.log("form submitted successfully");
  };

//---------------------------------------------------------------------------------

    render(){
        return(
          <Grid centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register
            </Header>
            <Segment>
              <Form size="large">
                <Form.Input
                  placeholder="First Name"
                  fluid
                  allowclear
                  icon="user"
                  iconPosition="left"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.logChange}
                />
                <Form.Input
                  placeholder="Last Name"
                  fluid
                  allowclear
                  icon="user"
                  iconPosition="left"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.logChange}
                />
                <Form.Input
                  placeholder="Email"
                  fluid
                  allowclear
                  icon="mail"
                  iconPosition="left"
                  name="email"
                  value={this.state.email}
                  onChange={this.logChange}
                />
                <Form.Input
                  placeholder="Password"
                  fluid
                  allowclear
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  value={this.state.password}
                  onChange={this.logChange}
                  type="password"
                />
                <Form.Input
                  placeholder="Confirm Password"
                  fluid
                  allowclear
                  icon="lock"
                  iconPosition="left"
                  name="confirmPW"
                  type="password"
                  value={this.state.confirmPW}
                  onChange={this.logChange}
                />
                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button className="button" onClick={this.onSubmit} type='submit' fluid>
                      Submit
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
       )
    }
}