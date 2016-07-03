import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
// import IconMenu from 'material-ui/IconMenu';
// import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
// import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

export default function FactTableSettings(props) {
  return (
    <Toolbar style={{ maxWidth: '768px', margin: '0 auto' }}>
      <ToolbarGroup>
        <TextField
          hintText="Type something..."
          value={props.filterText}
          onChange={props.filterChange}
        />
      </ToolbarGroup>
      <ToolbarGroup>
        <DropDownMenu value={props.sortKey} onChange={props.sortChange}>
          <MenuItem value={"Time"} primaryText="Time" />
          <MenuItem value={"Name"} primaryText="Name" />
          <MenuItem value={"Nick"} primaryText="Nick" />
        </DropDownMenu>
        <FontIcon className="muidocs-icon-custom-sort" />
      </ToolbarGroup>
    </Toolbar>
  );
}

FactTableSettings.propTypes =
  { filterText: PropTypes.string
  , filterChange: PropTypes.func
  , sortKey: PropTypes.string
  , sortChange: PropTypes.func
  };
