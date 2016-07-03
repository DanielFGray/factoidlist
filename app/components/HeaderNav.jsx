import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

export default class HeaderNav extends Component {
  static propTypes = { title: PropTypes.string }

  constructor(props) {
    super(props);
    this.state =
      { drawerOpen: false
      };
  }

  handleToggle = () => this.setState({ drawerOpen: ! this.state.drawerOpen })

  handleClose = () => this.setState({ drawerOpen: false })

  handleClick = (event, index, value) => {
    console.log(arguments);
    browserHistory.push(`/${value}`);
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
          <MenuItem valueLink={"rice"} onTouchTap={this.handleClick}>#rice</MenuItem>
          <MenuItem valueLink={"code"} onTouchTap={this.handleClick}>#code</MenuItem>
          <MenuItem valueLink={"wdg"} onTouchTap={this.handleClick}>#/g/wdg</MenuItem>
        </Drawer>
      </div>
    );
  }
}
