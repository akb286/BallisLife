import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Icon, Label, Loader, Segment } from 'semantic-ui-react';
import { deletePost, getPosts, updatePost } from '../actions/posts';
import CoachViewForm from './CoachViewForm';

//TIPS FOR READING THIS PAGE!
//Almost everything is conditionally rendered so pay close attention to local state and how its influencing the "If or Else statements" and the turinary functions.

export class CoachPostCard extends React.Component {
  state = { showPostForm: false, editing: false, likePost: 0, liked: false, isACoach: false, post: null }
  
  togglePostForm = (id) => {  
    const { dispatch } = this.props;
    const { showPostForm } = this.state;
    this.setState({ showPostForm: !showPostForm, post: this.props.posts.filter(i => i.id === id) })

    //This block of code takes in two consts, one from our local state "this.state" and one from redux state "this.props". It says when the function togglePostForm is 
    //called, set the local state of "showPostForm" to the opposite of what is now. And set the local state of "post" to this.props.posts.i where i is equal to the id 
    //being passed in as a parameter.
  }

  testToggle = () => {
    const { showPostForm } = this.state;
    this.setState({ showPostForm: !showPostForm })

    //This block just changes the local state back to false after the testToggle is called by "<CoachViewForm />" tag inside the "editPost" function. 
    //It will run based on the users role.
  }

  deletePost = (id, posts)  => {
    const { dispatch } = this.props
    const { likePost } = this.state
    dispatch(deletePost(id))
    this.setState( state => {
      return { likePost: 0 }
    })
    this.getMore()

    //This is a function that dispatches to the deletePost action with an id passed through as a param. It then fires the "this.getMore()". The reason for this is 
    //because we had a bug where the code would get all of our posts faster than it would delete it and it would look like we did nothing to the posts even though 
    //the post was deleted from props. So we made the code wait basically.
  }

  getMore = () => {
    const { dispatch } = this.props
    setTimeout(function() {
      dispatch(getPosts())
    }, 500)

    //This block delays the getPosts.
  }

  editPost = () => {
    return(
      <CoachViewForm testToggle={this.testToggle} onePost={this.state.post[0]} /> //This one line is passing props of testToggle and onePost into the CoachViewForm Component. This line is very, very important.
    )

    //This block of code calls the form from CoachViewForm which is conditionally renderd, but also passes functions down into the form for use in that component.
    //"onePost" is a param which is equal to the object "this.state.post" in position "0" because there is only one object in the state. Look at the "togglePostForm" function.
  }

  liked = () => {  
    const { liked, likePost } = this.state;
    const { user } = this.props;
    if (liked === true) {
      return{ user }
    } else if ( liked === false) {
      return 
    }

    //This block of code ("liked") was my attempt in trying to find a way to track weather or not a user had liked a post, if i had more time it would be finished. 
    //But what I had in mind was when a the user of "this" session cicks the like button it changes the state of "liked" to true and disables the like button? 
    //or if state is true then when the button is pressed again it will "likePost -= 1". The user can only do this once each way so the data can persit, also so 
    //a user can't like a post more than once. 
  }

  likePost = () => {
    const { likePost } = this.state;
    let x = 0  
    if (likePost === 0) {
      return(
        this.setState( state => {
          return { likePost: x += 1, liked: true}
        })
      )
    } else if (likePost === 1) {
      return( 
        this.setState( state => {
          return { likePost: x, liked: false }
        })
      )
    }

    //This comment is for ("likePost"). If you change the "0" to "likePost" the counter will just add "1" to the local state each time. The data does not 
    //persit so you'll have to run a migration on one of tables to add the data to the database.
  }

  coachButtons = () => {
    const { id, user } = this.props
    if (user.role === "coach" || user.role === "league_manager") {
      return(
        <div>
          <Button style={styles.textColor} onClick={() => this.togglePostForm(id)}><Icon name='setting'/> Edit</Button>
          <Button color='red' onClick={() => this.deletePost(id)}><Icon name='remove circle'/> Delete</Button> 
        </div>
      )
    } else if (user.role === "player") {
      return(
      <div>
      </div>
      )
    }

    //This comment  is for ("coachButtons"). This block of code is used to conditionally render a delete & edit button based on weather or not the current user "user" is 
    //equal to the role of player, coach, or league_manager. Look in our database through sequelectron and type "SELECT * FROM users". Inside the buttons are calls to 
    //functions that do what you'd expect them to.
  }

  render() {
    const { name, subject, description, id, user, posts } = this.props;
    const { showPostForm, likePost, isACoach } = this.state;
      return(
        <div>   
          { showPostForm ?
            <div>
              <Segment> 
                <Segment>
                  { showPostForm ? this.editPost() : null }
                </Segment>
              </Segment>
              <Divider hidden/>
            </div>
            :
            <div>
              <Segment key={id}>
                  <h1>{name}</h1>
                <Segment>
                  <h3>{subject}</h3>
                  <Divider hidden/>
                  <p>{description}</p>
                  <Label>
                  <a style={styles.likeColor} onClick={this.likePost}><Icon name='heart'/></a> {/* I dont know why this line works, but it does so winner winner chicken dinner */}
                  </Label>
                    <Label>
                    {likePost}
                    </Label>
                </Segment>
                {this.coachButtons()}
              </Segment> 
              <Divider hidden/>
            </div>
          }
        </div>
      )

    //THe render function will conditionally render content based on weather or not the local state of showPostForm is true or false.
  }
}

const styles = {
  textColor: {
    color: 'white',
    backgroundColor: '#669270'
  },
  
  likeColor: {
    color: '#DD4590',
  },

  // labelColor: {
  //   color: 'white',
  //   backgroundColor: 'yellow'
  // }
}

const mapStateToProps = (state) => {
  return { user: state.user, posts: state.posts}

  //This block sets variables of redux state or "props" inside a function which is called in the export inside the connect()
}

export default connect(mapStateToProps)(CoachPostCard);
