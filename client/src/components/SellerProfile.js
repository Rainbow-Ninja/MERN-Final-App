import React, {Component} from "react";
import { Grid, Header, Container, Image, Divider, List } from 'semantic-ui-react';
import {connect} from "react-redux";
import {setUser} from "../actions/userAction"
import axios from "axios"



class SellerProfile extends Component {
    constructor(props){
      super(props)
      this.state = {
          firstName: "",
          lastName: "",
          email: "",
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

  
  // mounting func //
  componentWillMount() {
    this.getUserData();
  }

    render(){
        return(
          <div>
          <Container textAlign='justified'>
            <Header as='h2'>
              <Image circular verticalAlign='middle' size='medium' src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> 
              Patrick Starr
            </Header>
            <Divider />
          </Container>
           <Container textAlign='justified'>
            <Grid celled divided>
              <Grid.Row>
                <Grid.Column verticalAlign='middle' width={4}>
                <List>
                  <List.Item content="Contact Me" />
                  <Divider />
                  <List.Item icon='users' content='Start-up Again' />
                  <List.Item icon='marker' content='Sydney, AUS' />
                  <List.Item icon='call' content='0402 123 456' />
                </List>
                <List animated>
                  <List.Item
                    icon='mail'
                    content={<a href='mailto:pstarr@startupagain.com.au'>pstarr@startupagain.com.au</a>}
                  />
                  <List.Item
                    icon='linkify'
                    content={<a href='https://startupagain-mern.herokuapp.com/'>Start-up Again</a>}
                  />
                </List>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
           </Container>
          </div>
        )
    }}

    const mapStateToProps = (state) => ({
      user: state.user
    })
    const mapDispatchToProps = (dispatch) => ({
      setUser: user => dispatch(setUser(user))
    })
    
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(SellerProfile)
    