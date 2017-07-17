import React, { Component } from 'react';
import {
  Row,
  Column,
  TopBar,
  TopBarTitle,
  TopBarRight,
  Menu,
  MenuItem
} from 'react-foundation';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="yale-header">
        <Row className="topper-logo">
            <Column>
              <Link to="/" className="y-icons y-yale y-univ">EliCal</Link>
            </Column>
        </Row>
        <TopBar className="navbar">
          <Row>
            <Column>
              <TopBarTitle><Link to="/">Home</Link></TopBarTitle>
              <TopBarRight className="navbar__right">
                <Menu>
                  <MenuItem>
                    <Link to="/login">Log in</Link>
                  </MenuItem>
                </Menu>
              </TopBarRight>
            </Column>
          </Row>
        </TopBar>
      </header>
    );
  }
}

export default Header;
