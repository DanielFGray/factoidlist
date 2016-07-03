import React, { Component, PropTypes } from 'react';
import { Table
       , TableBody
       , TableHeader
       , TableHeaderColumn
       , TableRow
       , TableRowColumn
       } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import { sortBy } from 'lodash/collection';
import FactTableSettings from './FactTableSettings';
import Factoid from './Factoid';

const printFactoids = (propLength, facts) => {
  if (facts.length === 0) {
    return (
      <TableRowColumn style={{ textAlign: 'center' }} colSpan="3">
        {propLength === 0 ?
          (<div><CircularProgress /><br />Fetching...</div>)
          : 'No matches found'}
      </TableRowColumn>
    );
  } else {
    return facts.map(row => <Factoid key={row.name} {...row} />);
  }
};

export default class FactTable extends Component {
  static propTypes = { factoids: PropTypes.array }

  constructor(props) {
    super(props);
    this.state =
      { showSettings: false
      , sortKey: 'Time'
      , reverseSort: true
      , filterText: ''
      };
  }

  onSortingChange = (event, index, value) => {
    this.setState({ sortKey: value });
  }

  onFilterChange = (e) => {
    this.setState({ filterText: e.target.value });
  }

  render() {
    const re = new RegExp(this.state.filterText, 'i');
    let facts = this.props.factoids
      .filter(f => re.test(f.name) || re.test(f.fact));

    facts = sortBy(facts, this.state.sortKey.toLowerCase());

    if (this.state.reverseSort) {
      facts = facts.reverse();
    }

    return (
      <div>
        <FactTableSettings
          filterChange={this.onFilterChange}
          filterText={this.state.filterText}
          sortKey={this.state.sortKey}
          sortChange={this.onSortingChange}
        />
        <Table selectable={false} style={{ maxWidth: '768px', margin: '0 auto' }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Factoid</TableHeaderColumn>
              <TableHeaderColumn
                colSpan="2"
                style={{ textAlign: 'center' }}
              >
                Response
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows={true}>
            {printFactoids(this.props.factoids.length, facts)}
          </TableBody>
        </Table>
      </div>
    );
  }
}
