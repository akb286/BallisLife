//TODO this needs to be done so we can see a single game or all the games correct?
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getGames } from '../actions/games';
import GameView from './GameView';
import Games from './Games';

class FetchGames extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getGames())
  }

  render() {
    return (
      <div>
        <Route exact path="/games" component={Games} />
        <Route exact path="/games/:id" component={GameView} />
      </div>
    )
  }
}

export default connect()(FetchGames);