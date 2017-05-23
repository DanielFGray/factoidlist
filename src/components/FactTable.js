import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import { sortBy } from 'lodash/collection';
import FactTableSettings from './FactTableSettings';
import Factoid from './Factoid';

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
    );
  }
  return facts.map(row => <Factoid key={row.name} {...row} />);
};

export default class FactTable extends Component {
  static propTypes = {
    factoids: PropTypes.arrayOf(PropTypes.shape({
      fact: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nick: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      aliases: PropTypes.arrayOf(PropTypes.string),
    })),
    loadingFactoids: PropTypes.bool,
  }

  state = {
    showSettings: false,
    sortKey: 'Time',
    reverseSort: true,
    filterText: '',
  };

  onSortingChange = (event, index, value) =>
    this.setState({ sortKey: value });

  onFilterChange = e =>
    this.setState({ filterText: e.target.value });

  toggleReverse = () =>
    this.setState({ reverseSort: ! this.state.reverseSort });

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
    );
  }
}
