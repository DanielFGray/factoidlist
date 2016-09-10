import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

export default class HeaderNav extends Component {
  constructor(props) {
    super(props);
    this.state =
      { drawerOpen: ! this.props.title
      , dialogOpen: false
      };
  }

  drawerToggle = () => this.setState({ drawerOpen: ! this.state.drawerOpen })

  drawerClose = () => this.setState({ drawerOpen: false })

  dialogOpen = () => this.setState({ dialogOpen: true })

  dialogClose = () => this.setState({ dialogOpen: false })

  render() {
    return (
      <div id="content">
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={this.drawerToggle}
        />
        <Dialog
          actions={[
            <FlatButton
              label="you're a nerd"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.dialogClose}
            />
          ]}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleClose}
        >
          <p>
            I made an IRC chat bot that responds to certain keywords in some IRC
            channels on rizon.net. This means that if you say a defined trigger word,
            the bot will automatically respond with the appropriate factoid.
            <br />It's hard to remember all of the factoids it has, so I made
            a website to list all of them for each channel.
          </p>
          <p>It's also been a fun excuse to play with the
            {' '}<a href="http://github.com/facebook/react" target="_blank" rel="noopener noreferrer">React</a>
            {' and '}
            <a href="https://github.com/callemall/material-ui" target="_blank" rel="noopener noreferrer">Material-UI</a> libraries.
          </p>
        </Dialog>
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen || ! this.props.title}
          onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
        >
          <MenuItem onTouchTap={this.drawerClose} containerElement={<Link to="/rice" />}>
            #rice
          </MenuItem>
          <MenuItem onTouchTap={this.drawerClose} containerElement={<Link to="/code" />}>
            #code
          </MenuItem>
          <MenuItem onTouchTap={this.drawerClose} containerElement={<Link to="/wdg" />}>
            #/g/wdg
          </MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.drawerClose} containerElement={<a href="https://gitlab.com/DanielFGray/factoidlist" target="_blank" rel="noopener noreferrer" />}>
            source
          </MenuItem>
          <MenuItem onTouchTap={this.dialogOpen}>
            what is this?
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

HeaderNav.propTypes =
  { title: PropTypes.string
  };
