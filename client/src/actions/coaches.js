import axios from 'axios';

export const COACH_LIST = 'COACH_LIST';

export const getCoachList = () => {
  return (dispatch) => {
    axios.get('/api/coach_list')
      .then( res => dispatch({ type: COACH_LIST, coaches: res.data, headers: res.headers}) )
  }
}