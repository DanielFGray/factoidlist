import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';

export default class HeaderNav extends Component {
  static propTypes = { title: PropTypes.string }

  constructor(props) {
    super(props);
    this.state =
      { drawerOpen: ! this.props.title
      };
  }

  handleToggle = () => this.setState({ drawerOpen: ! this.state.drawerOpen })

  handleClose = () => this.setState({ drawerOpen: false })

  handleClick = () => {
    this.handleClose();
  }

  render() {
    return (
      <div id="content">
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
        >
          <MenuItem onTouchTap={this.handleClick} containerElement={<Link to="/rice" />}>
            #rice
          </MenuItem>
          <MenuItem onTouchTap={this.handleClick} containerElement={<Link to="/code" />}>
            #code
          </MenuItem>
          <MenuItem onTouchTap={this.handleClick} containerElement={<Link to="/wdg" />}>
            #/g/wdg
          </MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleClick} containerElement={<a href="https://gitlab.com/DanielFGray/factoidlist" target="_blank" />}>
            source
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
