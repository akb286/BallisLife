import axios from 'axios';

export const GAMES = 'GAMES';
export const SHOW_GAME = 'SHOW_GAME';
export const ADD_GAME = 'ADD_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';

export const getGames = () => {
  return (dispatch) => {
    axios.get('/api/games')
      .then( res => dispatch({ type: GAMES, games: res.data, headers: res.headers }) )
  }
}

export const addGame = (game) => {
  return (dispatch) => {
    axios.post('/api/games', { game } )
      .then( res => dispatch({ type: ADD_GAME, game: res.data, headers: res.headers}) )
  }
}

export const updateGame = (game) => {
  return (dispatch) => {
    axios.put(`/api/games/${game.id}`, { game } )
      .then( res => dispatch({ type: UPDATE_GAME, game: res.data, headers: res.headers }) )
  }
}

export const deleteGame = (id) => {
  return (dispatch) => {
    axios.delete(`/api/games/${id}`)
      .then( res => dispatch({ type: DELETE_GAME, id, headers: res.headers }) )
  }
}