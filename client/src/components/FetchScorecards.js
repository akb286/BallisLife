//TODO this needs to be done so we can see a single game or all the games correct?
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getScorecards } from '../actions/scorecards';
import ScorecardView from './ScorecardView';

class FetchScorecards extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getScorecards(this.props.match.params.game_id))
  }

  render() {
    return (
      <div>
        <Route exact path='/games/:game_id/scorecards/:id' component={ScorecardView} /> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { scorecards: state.scorecards }
};

export default connect(mapStateToProps)(FetchScorecards);