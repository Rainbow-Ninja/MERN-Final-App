import React, {Component} from "react";
import { Grid, Header, Container, Image, Divider, List } from 'semantic-ui-react';
import {connect} from "react-redux";
import {setUser} from "../actions/userAction"
import axios from "axios"


class MyProfileView extends Component {
    constructor(props){
      super(props)
      this.state = {
          firstName: "",
          lastName: "",
          email: "",
          user: {}
      }
    }
    // getting user data from backend route then saving that to global state //
    getUserData = async () => {
      if (document.cookie.includes("jwt="))  {
       await axios
          .get('/api/listing/getuser') 
          .then(user => {
            this.props.setUser(user.data)
            console.log('user has been set to state')
            this.setState({ user: user.data });
          })
          .catch(err => console.log(err))
          }}
          // mounting func //
        componentWillMount() {
          this.getUserData();
        }
  

    render(){
      const {user} = this.props
        return(
          <div>
          <Container textAlign='justified'>
            <Header as='h2'>
              <Image circular verticalAlign='middle' size='medium' src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' /> 
              {user.firstName} {user.lastName}
            </Header>
            <Divider />
          </Container>
           <Container textAlign='justified'>
            <Grid celled divided>
              <Grid.Row>
                <Grid.Column verticalAlign='middle' width={4}>
                <List animated>
                  <List.Item icon='idea' content='My Listings' />
                  <List.Item icon='mail outline' content='Messages' />
                  <List.Item icon='talk' content='Notifications'/>
                  <List.Item icon='cog' content='Settings'/>
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
    }
}
// mapping for redux state management //

const mapStateToProps = (state) => ({
  user: state.user
})
const mapDispatchToProps = (dispatch) => ({
  setUser: user => dispatch(setUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfileView)


