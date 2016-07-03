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
      , route: this.props.params.factdb
      };
  }

  componentDidMount() {
    this.getFactoids();
  }

  getFactoids = () => {
    request
      .get('http://dan.soupwhale.com/facts/factoids.php')
      .query({ json: this.state.route })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw new Error(err);
        else this.setState({ factoids: res.body.response });
      });
  }

  render() {
    return (
      <div>
        <HeaderNav title={this.state.route} />
        <FactTable factoids={this.state.factoids} />
      </div>
    );
  }
}
