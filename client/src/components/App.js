import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Announcements from './Announcements';
import AuthRoute from './AuthRoute';
import Calendar from './Calendar';
import CoachView from './CoachView';
import CreatePlayerCard from './CreatePlayerCard';
import FetchGames from './FetchGames';
import FetchScorecards from './FetchScorecards';
import FetchUser from './FetchUser';
import Flash from './Flash';
import GameForm from './GameForm';
import GameInterface from './GameInterface';
import BuildTeam from './LMBuildTeams';
import Login from './Login';
import MyPlayers from './MyPlayers';
import MyScorecards from './MyScorecards';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import ScorecardForm from './ScorecardForm';
import UserView from './UserView';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <ProtectedRoute exact path='/' component={CoachView} />
            <ProtectedRoute exact path='/announcements' component={Announcements} />
            <ProtectedRoute exact path='/myscorecards' component={MyScorecards} />
            <ProtectedRoute exact path='/team' component={MyPlayers} />
            <ProtectedRoute exact path='/startscoreboard' component={GameInterface} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <ProtectedRoute path='/games/:game_id/scorecards' component={FetchScorecards} />
            <ProtectedRoute path='/games' component={FetchGames} />
            <ProtectedRoute path='/create_game' component={GameForm} />
            <ProtectedRoute path='/:id/create_player_card' component={CreatePlayerCard} />
            <ProtectedRoute path='/calendar' component={Calendar} />
            <ProtectedRoute path='/create_scorecard' component={ScorecardForm} />
            <ProtectedRoute path='/buildteam' component={BuildTeam} />
            <ProtectedRoute path='/users/:id' component={UserView} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;
