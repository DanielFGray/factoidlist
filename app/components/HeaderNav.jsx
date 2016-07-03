import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class HeaderNav extends Component {
  constructor(props) {
    super(props);
    this.state =
      { drawerOpen: false
      };
  }

  handleToggle = () => this.setState({ drawerOpen: ! this.state.drawerOpen });

  handleClose = () => this.setState({ drawerOpen: false });

  render() {
    return (
      <div id="content">
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
        >
          <MenuItem onTouchTap={this.handleClose}>#rice</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>#code</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>#/g/wdg</MenuItem>
        </Drawer>
      </div>
    );
  }
}
