import React, {Component} from "react"
import Listing from './Listing'
import { Header, Container, Divider, Grid, Image } from 'semantic-ui-react';

export default class DashboardView extends Component {
    render(){
        return(
            <div>
                <Container textAlign='center' data-test="dashboard">
                    <Header as='h2' data-test="header">
                        Start-up Again
                    </Header>
                    <Divider />
                    <Grid columns={1} className="dashGrid">
                        <Image className="lightBulb" floated='right' src={require("../images/lightbulb.png")}/>
                        <Grid.Column className="dashText" data-test="dashText">
                            <h4>Are you an <span>entrepreneur</span> without an idea?</h4>
                            <h4>Do you have a business idea but <span>need a partner</span>?</h4>
                            <h4>Did you have a business idea that never quite got off the ground?</h4>
                            <h4>Are you hoping to <span>onsell your idea</span> to recoup your costs?</h4>
                            <h3 id="dashHeader1">Well <span>Start-up Again</span> is for you!!</h3> 
                            <h3 id="dashHeader2">We specialise in connecting people and ideas</h3>
                        </Grid.Column>
                    </Grid>
                    <Divider />
                </Container>
                <Listing data-test="listing"/>
            </div>
        )
    }
}