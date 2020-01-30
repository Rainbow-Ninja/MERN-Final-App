import React, {Component} from "react";
import axios from "axios"
import {connect} from "react-redux";
import { Route, Link } from "react-router-dom";
import {deletedListingHandler, listingHandler} from "../actions/listingAction" 
import {setUser} from "../actions/userAction"
import { Card, Image, Button, Modal, Form, Container, Responsive } from 'semantic-ui-react'
import SellerProfile from "./SellerProfile"

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            _id: "",
            title: "",
            description: "",
            image: "",
            modalOpen: false,
            productOwner: "",
            price: ""
         }
   }
   // fetches user data and updates global state
  getUserData = async () => {
    if (document.cookie.includes("jwt="))  {
     await axios
        .get('/api/listing/getuser') 
        .then(user => {
          this.props.setUser(user.data)
          this.setState({ user: user.data });
        })
        .catch(err => console.log(err))
        }
      }


    handleOpen = listing => {this.setState({ 
        modalOpen: true,
        _id: listing._id,
        title: listing.title,
        description: listing.description,
        blurb: listing.blurb,
        price: listing.price,
        productOwner: listing.productOwner
     });
    };
    // handling close by setting state to false //
    handleClose = () => this.setState({ modalOpen: false })

    // change logger //
    logChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("Logging change function console log ");
    };
    // Fetching the listings from backend //
    grabListings = async () => {
        let res = await axios.get('/api/listing/show')
        let listings = res.data
        this.props.listingHandler(listings)
    }

    // editing function to edit the state and the backend //
    editHandler = (e) => {
        e.preventDefault();
        var listing = {
            _id: this.state._id,
            title: this.state.title,
            description: this.state.description,
            blurb: this.state.blurb,
            price: this.state.price
        };
        axios
            .put("/api/listing/update", listing)
            .then(res => {
                const updateListings = this.props.listings.map(listing => {
                    if (listing._id === res.data._id) {
                        return res.data;
                    }
                    console.log('listing has been edited')
                    return listing
                });
                    this.handleClose();
                    this.props.listingHandler(updateListings)
            })
                    .catch(err => console.log("this is an updated error " + err));
    };

    // deleting function handling delete on state and for the backend //
    deletion = (listing) => {
        axios
            .delete("/api/listing/delete", { data: listing })
            .then(() => {this.props.deletedListingHandler(listing._id)})
            .then(() => {this.handleClose()})
            .catch(err => console.log("this is the deletion function err " + err));
    };

    showEditDelete = (listing) =>{
        if(this.props.user._id === this.state.productOwner){
            return (
            <div>
                <Button basic className="button" floated='left' onClick={this.editHandler}> 
                    Edit
                </Button>
                <Button className="button" floated='left' onClick={() => this.deletion(listing)}>
                    Delete
                </Button>
            </div>
            )} else {
                return null
            }
        }

    // mounting the listings and user //
    componentDidMount() {
        this.grabListings();
        this.getUserData();
}

    render() { 
       // setting variables // 
        const {listings} = this.props
        return ( 
            <div>
                <div className="card">
                <Container className="container">
                    <Card.Group centered>
                    {listings.map(listing => (
                        <Responsive as={Card} minWidth={300} className="listingCard">
                            <Card.Content>
                            <Image className="cardPic" src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg'/>
                            <Card.Content className="cardPrice">{listing.price}</Card.Content>
                            <Card.Header>{listing.title}</Card.Header>
                            <Card.Description>{listing.blurb}</Card.Description>
                                <Modal
                                    trigger={<Button className="button" basic fluid onClick={() => this.handleOpen(listing)}>Take a closer look</Button>}
                                    open={this.state.modalOpen}
                                    onClose={this.handleClose}
                                    dimmer='blurring'
                                    size='small'>
                                    <Modal.Header>Edit information</Modal.Header>
                                    <Modal.Content image>
                                        <Image
                                            wrapped
                                            size="small"
                                            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                                        />
                                     <Modal.Description>
                                        <Form method="POST">
                                            <Modal.Header>Product Title</Modal.Header>
                                            <Form.Input
                                                fluid
                                                placeholder="Product title"
                                                name="title"
                                                value={this.state.title}
                                                onChange={this.logChange}
                                            />
                                            <Modal.Header>Product Blurb</Modal.Header>
                                            <Form.Input
                                                fluid
                                                placeholder="Product blurb"
                                                name="blurb"
                                                maxLength={30}
                                                value={this.state.blurb}
                                                onChange={this.logChange}
                                            />
                                            <Modal.Header>Product Description</Modal.Header>
                                            <Form.TextArea
                                                placeholder="Product description"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.logChange}
                                            />
                                            <Modal.Header>Price</Modal.Header>
                                            <Form.Input
                                                fluid
                                                placeholder="Price"
                                                name="price"
                                                value={this.state.price}
                                                onChange={this.logChange}
                                            />
                                        </Form>
                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        {this.showEditDelete(listing)}
                                        <Button className="button" as={Link} to='/seller'> 
                                            Meet the Seller 
                                        </Button>  
                                        <Button className="button" onClick={() => this.handleClose()}>
                                            Close
                                        </Button> 
                                    </Modal.Actions>
                                </Modal>
                            </Card.Content>
                        </Responsive>
                        ))}
                    </Card.Group>
                </Container>
                <Route exact path="/seller" component={SellerProfile} />
            </div>
        </div>
        );
    }
}
 
// mapping for redux state management //
const mapStateToProps = (state) => ({
    listings: state.listings,
    user: state.user
})
// dispatching to store state changes //
const mapDispatchToProps = (dispatch) => ({
    listingHandler: listings => dispatch(listingHandler(listings)),
    deletedListingHandler: id => dispatch(deletedListingHandler(id)),
    setUser: user => dispatch(setUser(user))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Listing)