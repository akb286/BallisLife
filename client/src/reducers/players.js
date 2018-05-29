import { COACH_PLAYERS, MY_PLAYERS, PLAYER_LIST, RESET_COACH_ID, SET_COACH_ID } from '../actions/players';

const players = (state = [], action) => {
  switch (action.type) {
    case PLAYER_LIST:
      return action.players;
    case MY_PLAYERS:
      return action.players;
    case COACH_PLAYERS:
      return action.players;
    case RESET_COACH_ID:
      return state.map( p => {
        if (p.id === action.player.id)
          return action.player
        return p;
      })
    case SET_COACH_ID:
      return state.map( p => {
        if (p.id === action.player.id)
          return action.player
        return p;
      })
    default:
      return state;
  }
};

export default players;

