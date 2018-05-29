import { ADD_GAME, DELETE_GAME, GAMES, SHOW_GAME, UPDATE_GAME } from '../actions/games';

const games = (state = [], action ) => {
  switch(action.type) {
    case GAMES:
      return action.games;
    case SHOW_GAME:
      return action.game;
    case ADD_GAME:
      return [action.game, ...state];
    case UPDATE_GAME:
      return state.map( g => {
        if (g.id === action.game.id)
          return action.game
        return g;
      })
    case DELETE_GAME:
      return state.filter( g => g.id !== action.id )
    default:
      return state;
  }
}

export default games;