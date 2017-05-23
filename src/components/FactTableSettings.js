import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import ContentSort from 'material-ui/svg-icons/content/sort';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

export default function FactTableSettings(props) {
  return (
    <Toolbar>
      <ToolbarGroup>
        <TextField
          hintText="Type something..."
          onChange={props.filterChange}
        />
      </ToolbarGroup>
      <ToolbarGroup>
        <DropDownMenu value={props.sortKey} onChange={props.sortChange}>
          <MenuItem value={'Time'} primaryText="Time" />
          <MenuItem value={'Name'} primaryText="Name" />
          <MenuItem value={'Nick'} primaryText="Nick" />
        </DropDownMenu>
        <IconButton
          touch={true}
          tooltip="Reverse"
          tooltipPosition="bottom-left"
          onTouchTap={props.toggleReverse}
        >
          <ContentSort />
        </IconButton>
      </ToolbarGroup>
    </Toolbar>
  );
}

FactTableSettings.propTypes = {
  filterChange: PropTypes.func,
  sortKey: PropTypes.string,
  sortChange: PropTypes.func,
  toggleReverse: PropTypes.func,
};
