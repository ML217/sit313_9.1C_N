import React from 'react';
import { Menu,Input, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const Header = () => (
  <Menu secondary>
    <Menu.Item header>DEV@Deakin</Menu.Item>
    <Menu.Item>
      <Input icon="search" placeholder="Search..." />
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item>
        <Button as={Link} to="/post" primary>
          Post
        </Button>
      </Menu.Item>
      <Menu.Item><Button>Login</Button></Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Header;