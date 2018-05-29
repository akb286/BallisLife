import axios from 'axios';

export const SCORECARDS = 'SCORECARDS';
export const COACHVIEW = 'COACHVIEW';
export const MYSCORECARDS = 'MYSCORECARDS';
export const UPDATE_SCORECARD = 'UPDATE_SCORECARD';
export const ADD_SCORECARD = 'ADD_SCORECARD';
export const DELETE_SCORECARD = 'DELETE_SCORECARD';

export const deleteScorecard = (id, game_id) => {
  return (dispatch) => {
    axios.delete(`/api/games/${game_id}/scorecards/${id}`)
      .then( res => dispatch({ type: DELETE_SCORECARD, id, headers: res.headers }) )
  }
}

export const getScorecards = (id) => {
  return (dispatch) => {
    axios.get(`/api/games/${id}/scorecards`)
      .then( res => dispatch({ type: SCORECARDS, scorecards: res.data, headers: res.headers }) )
  }
}

export const getMyScorecards = (id) => {
  return (dispatch) => {
    axios.get('api/my_scorecards')
      .then( res => dispatch({ type: MYSCORECARDS, scorecards: res.data, headers: res.headers}) )
  }
}

export const getCoachData = () => {
  return (dispatch) => {
    axios.get('/api/coach_view')
      .then( res => dispatch({ type: COACHVIEW, coachview: res.data, headers: res.headers}) ) 
  }
}

export const updateScorecard = (scorecard) => {
  return (dispatch) => {
    axios.put(`/api/games/${scorecard.game_id}/scorecards/${scorecard.id}`, { scorecard } )
      .then( res => dispatch({ type: UPDATE_SCORECARD, scorecard: res.data, headers: res.headers  }) )
  }
}

export const addScorecard = (scorecard) => {
  return (dispatch) => {
    axios.post(`/api/games/${scorecard.game_id}/scorecards`, { scorecard })
      .then( res => dispatch({ type: ADD_SCORECARD, scorecard: res.data, headers: res.headers }) )
  }
}