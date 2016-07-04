import React, { Component, PropTypes } from 'react';
import request from 'superagent';
import HeaderNav from './HeaderNav';
import FactTable from './FactTable';

export default class App extends Component {
  static propTypes = { params: PropTypes.object }

  constructor(props) {
    super(props);
    this.state =
      { factoids: []
      };
    this.getFactoids(this.props.params.factdb);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ factoids: [] });
    this.getFactoids(nextProps.params.factdb);
  }

  getFactoids = (factdb) => {
    request
      .get('http://dan.soupwhale.com/facts/factoids.php')
      .query({ json: factdb })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        } else if (res.body.response.filter) {
          this.setState({ factoids: res.body.response });
        } else if (res.body.response.error) {
          this.setState({ factoids: [ { name: '', fact: res.body.response.error } ] })
        }
      });
  }

  render() {
    return (
      <div>
        <HeaderNav title={this.props.params.factdb} />
        <FactTable factoids={this.state.factoids} />
      </div>
    );
  }
}
