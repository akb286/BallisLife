import axios from 'axios';

export const EVENTS = 'EVENTS';
export const SHOW_EVENT = 'SHOW_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

export const getEvents = () => {
  return (dispatch) => {
    axios.get('/api/events')
      .then( res => dispatch({ type: EVENTS, events: res.data, headers: res.headers }) )
  }
}

export const addEvent = (event) => {
  return (dispatch) => {
    axios.post('/api/events', { event } )
      .then( res => dispatch({ type: ADD_EVENT, event: res.data, headers: res.headers}) )
  }
}

export const updateEvent = (event) => {
  return (dispatch) => {
    axios.put(`/api/events/${event.id}`, { event } )
      .then( res => dispatch({ type: UPDATE_EVENT, event: res.data, headers: res.headers }) )
  }
}

export const deleteEvent = (id) => {
  return (dispatch) => {
    axios.delete(`/api/events/${id}`)
      .then( res => dispatch({ type: DELETE_EVENT, id, headers: res.headers }) )
  }
}
