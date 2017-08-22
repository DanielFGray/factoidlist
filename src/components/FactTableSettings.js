// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import ContentSort from 'material-ui/svg-icons/content/sort'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

const FactTableSettings = ({ filterChange, sortKey, sortChange, toggleReverse }: {
  filterChange: Function,
  sortKey: string,
  sortChange: Function,
  toggleReverse: Function,
}) => (
  <Toolbar>
    <ToolbarGroup>
      <TextField
        hintText="Type something..."
        onChange={filterChange}
      />
    </ToolbarGroup>
    <ToolbarGroup>
      <DropDownMenu value={sortKey} onChange={sortChange}>
        <MenuItem value={'Time'} primaryText="Time" />
        <MenuItem value={'Name'} primaryText="Name" />
        <MenuItem value={'Nick'} primaryText="Nick" />
      </DropDownMenu>
      <IconButton
        touch={true}
        tooltip="Reverse"
        tooltipPosition="bottom-left"
        onTouchTap={toggleReverse}
      >
        <ContentSort />
      </IconButton>
    </ToolbarGroup>
  </Toolbar>
)

export default FactTableSettings
