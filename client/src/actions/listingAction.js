import {NEW_LISTING, SET_LISTINGS, DELETE_LISTING} from './types'; 

// new listings action
export const newListingHandler = (listing) => {
    return {type: NEW_LISTING, val: listing}};

// set listings action
export const listingHandler = (listings) => {
    return {type: SET_LISTINGS, val: listings}};
// delete listings action
export const deletedListingHandler = (id) => {
    return {type: DELETE_LISTING, val: id}};

