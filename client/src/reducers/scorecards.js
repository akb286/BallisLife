import { ADD_SCORECARD, COACHVIEW, DELETE_SCORECARD, MYSCORECARDS, SCORECARDS, UPDATE_SCORECARD } from '../actions/scorecards';
// const points = [
//   { section: 'upper', name: 'One Pointer', score: null, value: 1 },
//   { section: 'upper', name: 'Two Pointer', score: null, value: 2 },
//   { section: 'upper', name: 'Three Pointer', score: null, value: 3 }, 
// ]

// const currentGame = {

// }



const scorecards = ( state = [], action ) => {
  switch (action.type) {
    case SCORECARDS:
      return action.scorecards
    case COACHVIEW:
      return action.coachview
    case MYSCORECARDS:
      return action.scorecards
    case UPDATE_SCORECARD:
      return state.map( s => {
        if (s.id === action.scorecard.id)
          return action.scorecard
        return s
      })
    case ADD_SCORECARD:
      return[...state, action.scorecard]
    case DELETE_SCORECARD:
      return state.filter( s => s.id !== action.id )
    default: 
      return state;
  }
}

export default scorecards;
