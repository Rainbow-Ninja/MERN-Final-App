import {SET_USER} from './types'

//setting user action with a value of user
export const setUser = (user) => {
    return {type: SET_USER,  val: user}};
