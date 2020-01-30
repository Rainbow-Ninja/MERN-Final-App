import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function LoginMenu (props) {
return <Menu.Item
    as={Link} to={"/login"}
    name={"Login"}
    active={props.activeItem === "Login"}
  > 
  </ Menu.Item>
  }