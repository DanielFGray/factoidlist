// @flow
import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import {
  filter,
  pipe,
  prop,
  reverse,
  sortBy,
} from 'ramda'
import FactTableSettings from './FactTableSettings'
import Factoid from './Factoid'

const printFactoids = (propLength, facts, loadingFactoids) => {
  if (facts.length === 0) {
    return (
      <TableRowColumn style={{ textAlign: 'center' }} colSpan="3">
        {(propLength === 0 && loadingFactoids) ?
          (<div>
            <CircularProgress size={0.5} />
            <br />Fetching...
          </div>)
          : 'No matches found'}
      </TableRowColumn>
    )
  }
  return facts.map(row => <Factoid key={row.name} {...row} />)
}

class FactTable extends Component {
  props: {
    factoids: Array<Object>,
    loadingFactoids: boolean,
  }

  state = {
    showSettings: false,
    sortKey: 'Time',
    reverseSort: true,
    filterText: '',
  };

  onSortingChange = (event: SyntheticEvent, index: number, value: string) =>
    this.setState({ sortKey: value });

  onFilterChange = (e: SyntheticInputEvent) =>
    this.setState({ filterText: e.target.value });

  toggleReverse = () =>
    this.setState({ reverseSort: ! this.state.reverseSort });

  render() {
    const re = new RegExp(this.state.filterText.replace(' ', '.*'), 'i')
    const facts = pipe(
      filter(f => re.test(f.name) || re.test(f.fact)),
      sortBy(prop(this.state.sortKey.toLowerCase())),
      f => (this.state.reverseSort ? reverse(f) : f),
    )(this.props.factoids)

    return (
      <div>
        <FactTableSettings
          filterChange={this.onFilterChange}
          sortKey={this.state.sortKey}
          sortChange={this.onSortingChange}
          toggleReverse={this.toggleReverse}
        />
        <Table selectable={false} style={{ width: '95%', margin: '0 auto' }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: '12em' }}>Factoid</TableHeaderColumn>
              <TableHeaderColumn colSpan="2">
                Response
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true}>
            {printFactoids(this.props.factoids.length, facts, this.props.loadingFactoids)}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default FactTable
