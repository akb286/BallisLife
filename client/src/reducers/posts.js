import { ADD_POST, DELETE_POST, POSTS, SHOW_POST, UPDATE_POST } from '../actions/posts';

const posts = (state = [], action ) => {
  switch(action.type) {
    case POSTS:
      return action.posts;
    case SHOW_POST:
      return action.post;
    case ADD_POST:
      return [action.post, ...state];
    case UPDATE_POST:
      return state.map( post => {
        if (post.id === action.post.id)
          return action.post
        return post;
      })
    case DELETE_POST:
      return state.filter( p => p.id !== action.id )
    default:
      return state; 
  }
}

export default posts;