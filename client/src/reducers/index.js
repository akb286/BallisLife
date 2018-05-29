import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import events from './events'
import scorecards from './scorecards';
import games from './games';
import coaches from './coaches';
import posts from './posts';
import players from './players';

const rootReducer = combineReducers({
  user,
  flash,
  events,
  scorecards,
  games,
  coaches,
  posts,
  players,
});

export default rootReducer;
