import React from 'react';
import { connect } from 'react-redux';
import { addPost, updatePost } from '../actions/posts';
import { Header, Container, Button, Form, Icon } from 'semantic-ui-react';

//TODO when I save it comes back as a 404 error and a uninitialized constant Api

export class CoachViewForm extends React.Component {
  state = { subject: '', name: '', description: '' }

  componentDidMount() {
    if (this.props.id) { 
      this.setState({ ...this.props })
    }
    if (this.props.onePost) {
      this.setState({ id: this.props.onePost.id, subject: this.props.onePost.subject, name: this.props.onePost.name, description: this.props.onePost.description })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props;
    const { id, subject, name, description } = this.state;
    const func = this.props.onePost ? updatePost : addPost
    dispatch(func({ id, subject, name, description }))
    if ( this.props.onePost ) {
        this.props.testToggle()
      } else {
        this.props.closeForm()
      }
    this.setState({ id: '', subject: '', name: '', description: '' })
  }

  render() {
    const { user } = this.props;
    const { subject, name, description } = this.state;
    if (user.role === "player") {
      return(
        null
      )
    } 
    else if (user.role === "coach" || user.role === "league_manager") {
      return (
        <Container>
          <Form onSubmit={this.handleSubmit}> {/*It would be cool if we could eliminate the "name" input all together and just post with the coaches name already next to the post. */}
            <Form.Input
              name="name"
              required
              value={name}
              onChange={this.handleChange}
              label="Name"
              placeholder="Name..." 
            /> {/* Instead of having a placeholder for name it would be cool if the form already knew who the user was. If completed this would make the "name" param obsolete */}
            <Form.Input
              name="subject"
              required
              value={subject}
              onChange={this.handleChange}
              label="Subject"
              placeholder="Subject..."
            />
            <Form.TextArea
              name="description"
              required
              value={description}
              onChange={this.handleChange}
              label="Description"
              placeholder="Write Something..."
            />
          <Form.Button style={styles.buttonColor}><Icon name='check circle'/>Save</Form.Button>
          </Form>
        </Container>
      )
    }
  }
}

const styles = {
  buttonColor: {
    color: 'white',
    backgroundColor: '#669270'
  }
}

const mapStateToProps = (state) => {
  return { post: state.posts, user: state.user }
};

export default connect(mapStateToProps)(CoachViewForm);
