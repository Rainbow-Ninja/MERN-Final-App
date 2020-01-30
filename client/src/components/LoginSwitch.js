import React from "react";
import LogoutMenu from "./LogoutMenu"
import LoginMenu from "./LoginMenu"

export default function LoginSwitch (props) {
    if (props.loggedIn){
      return <LogoutMenu 
        loggedIn={props.loggedIn} 
        activeItem={props.activeItem} 
        setLoggedIn={props.setLoggedIn}
        />;
    }
    return <LoginMenu 
        loggedIn={props.loggedIn} 
        activeItem={props.activeItem} 
        setLoggedIn={props.setLoggedIn}
        />
  }