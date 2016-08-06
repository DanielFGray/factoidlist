import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/factoids';
import HeaderNav from './HeaderNav';
import FactTable from './FactTable';

class App extends Component {
  static propTypes = {
    params: PropTypes.object
  , clearFactoids: PropTypes.func
  , factoids: PropTypes.array
  , factdb: PropTypes.string
  , fetchFactoids: PropTypes.func
  , loadingFactoids: PropTypes.bool
  }

  componentDidMount() {
    if (this.props.factdb) {
      this.props.fetchFactoids(this.props.factdb);
    } else {
      this.props.clearFactoids();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.factdb !== this.props.factdb) {
      if (nextProps.factdb) {
        this.props.fetchFactoids(nextProps.factdb);
      } else {
        this.props.clearFactoids();
      }
    }
  }

  render() {
    return (
      <div>
        <HeaderNav title={this.props.factdb} />
        <FactTable factoids={this.props.factoids} loadingFactoids={this.props.loadingFactoids} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => (
  { factoids: state.factoids.collection
  , factdb: ownProps.params.factdb
  , loadingFactoids: state.factoids.loading
  }
);

const mapDispatchToProps = (dispatch) => (
  { fetchFactoids: (factdb) => dispatch(actions.fetchFactoids(factdb))
  , clearFactoids: () => dispatch(actions.clearFactoids())
  }
);

const WiredApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default WiredApp;
