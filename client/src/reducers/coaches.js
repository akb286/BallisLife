import { COACH_LIST } from '../actions/coaches';

const coaches = (state = [], action) => {
  switch (action.type) {
    case COACH_LIST:
      return action.coaches;
    default:
      return state;
  }
};

export default coaches;

