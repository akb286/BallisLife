import axios from 'axios';

export const PLAYER_LIST = 'PLAYER_LIST';
export const RESET_COACH_ID = 'RESET_COACH_ID';
export const SET_COACH_ID = 'SET_COACH_ID';
export const MY_PLAYERS = 'MY_PLAYERS';
export const COACH_PLAYERS = 'COACH_PLAYERS';

export const getPlayerList = () => {
  return (dispatch) => {
    axios.get('/api/player_list')
      .then( res => dispatch({ type: PLAYER_LIST, players: res.data, headers: res.headers }) )
  }
}

export const getMyPlayers = () => {
  return (dispatch) => {
    axios.get('/api/my_players')
      .then( res => dispatch({ type: MY_PLAYERS, players: res.data, headers: res.headers }) )
  }
}

export const getCoachPlayers = () => {
  return (dispatch) => {
    axios.get('/api/coach_players')
      .then( res => dispatch({ type: COACH_PLAYERS, players: res.data, headers: res.headers }) )
  }
}

export const resetCoachId = (player) => {
  return (dispatch) => {
    axios.put(`/api/users/${player.id}`, { coach_id: null } )
      .then( res => dispatch({ type: RESET_COACH_ID, player: res.data, headers: res.headers }) )
  }
  //if isChecked is TRUE resetCoachId to null
}

export const setCoachId = (player, coach_id) => {
  return (dispatch) => {
    axios.put(`/api/users/${player.id}`, { coach_id } )
      .then( res => dispatch({ type: SET_COACH_ID, player: res.data, headers: res.headers }) )
  }
  // if isChecked is FALSE setCoachId to coach_id
  // the logic here seems backwards, but it works becuase we are setting the coach id before we are toggling the isChecked
}