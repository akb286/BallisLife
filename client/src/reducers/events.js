import { ADD_EVENT, DELETE_EVENT, EVENTS, SHOW_EVENT, UPDATE_EVENT } from '../actions/events';

const events = (state = [], action ) => {
  switch(action.type) {
    case EVENTS:
      return action.events;
    case SHOW_EVENT:
      return action.event;
    case ADD_EVENT:
      return [action.event, ...state];
    case UPDATE_EVENT:
      return state.map( e => {
        if (e.id === action.event.id)
          return action.event
        return e;
      })
    case DELETE_EVENT:
      return state.filter( e => e.id !== action.id )
    default:
      return state;
  }
}

export default events;
