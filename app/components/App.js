import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/factoids';
import HeaderNav from './HeaderNav';
import FactTable from './FactTable';

class App extends Component {
  static propTypes = {
    params: PropTypes.object
  , factoids: PropTypes.array
  , factdb: PropTypes.string
  , fetchFactoids: PropTypes.func
  }

  componentDidMount() {
    if (this.props.factdb) {
      this.props.fetchFactoids(this.props.factdb);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.factdb !== this.props.factdb) {
      this.props.fetchFactoids(nextProps.factdb);
    }
  }

  render() {
    return (
      <div>
        <HeaderNav title={this.props.factdb} />
        <FactTable factoids={this.props.factoids} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => (
  { factoids: state.factoids.collection
  , factdb: ownProps.params.factdb
  }
);

const mapDispatchToProps = (dispatch) => (
  { fetchFactoids: (factdb) => dispatch(actions.fetchFactoids(factdb))
  }
);

const WiredApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default WiredApp;
