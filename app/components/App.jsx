import React, { Component } from 'react';
import request from 'superagent';
import { Router, Route, hashHistory } from 'react-router';
import HeaderNav from './HeaderNav';
import FactTable from './FactTable';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      { factoids: []
      , route: 'rice'
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
        this.setState({ factoids: res.body.response });
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
