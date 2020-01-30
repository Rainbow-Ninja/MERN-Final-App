import React from "react";
import { Menu } from "semantic-ui-react";

export default function LogoutMenu (props) {
  return <Menu.Item
  as="a" href="/auth/logout"
  name={"Logout"}
  active={props.activeItem === "Logout"}
> 
</ Menu.Item>
  }