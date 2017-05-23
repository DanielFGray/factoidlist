import React, { Component, PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { connect } from 'react-redux'
import * as actions from '../actions/factoids'
import HeaderNav from '../components/HeaderNav'
import FactTable from '../components/FactTable'

injectTapEventPlugin()

class App extends Component {
  static propTypes = {
    clearFactoids: PropTypes.func.isRequired,
    factoids: PropTypes.arrayOf(PropTypes.shape({
      fact: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nick: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      aliases: PropTypes.arrayOf(PropTypes.string),
    })),
    factdb: PropTypes.string.isRequired,
    fetchFactoids: PropTypes.func.isRequired,
    loadingFactoids: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    if (this.props.factdb) {
      this.props.fetchFactoids(this.props.factdb)
    } else {
      this.props.clearFactoids()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.factdb !== this.props.factdb) {
      if (nextProps.factdb) {
        this.props.fetchFactoids(nextProps.factdb)
      } else {
        this.props.clearFactoids()
      }
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <HeaderNav title={this.props.factdb} />
          <FactTable factoids={this.props.factoids} loadingFactoids={this.props.loadingFactoids} />
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  factoids: state.factoids.collection,
  factdb: ownProps.params.factdb,
  loadingFactoids: state.factoids.loading,
})

const mapDispatchToProps = dispatch => ({
  fetchFactoids: factdb => dispatch(actions.fetchFactoids(factdb)),
  clearFactoids: () => dispatch(actions.clearFactoids()),
})

const WiredApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default WiredApp
