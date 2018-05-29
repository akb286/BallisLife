import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header, Image, Segment, Container } from 'semantic-ui-react';
import { registerUser } from '../actions/auth';
import { setFlash } from '../actions/flash';
import Ball from '../images/ball.png';

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '' };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, passwordConfirmation } = this.state;
    const { dispatch, history } = this.props;
    if (password === passwordConfirmation) {
      dispatch(registerUser(email, password, passwordConfirmation, history));
    } 
    else dispatch(setFlash('Passwords do not match!, please try again', 'red'));
  }

  handleChange = event => {
    // use e to grab the id off the element also the value and set state
    // const { id, value } = event.target;
    const id = event.target.id;
    const value = event.target.value;
    this.setState({ [id]: value });
  }

  render() {
    const { email, password, passwordConfirmation } = this.state;

    return (
      <Container style={styles.container}>
      <Segment basic>
        <div><Image src={Ball} size='medium' centered/></div>
        <Header as='h1' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              placeholder='Email'
              required
              value={email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              placeholder='Password'
              type='password'
              required
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='passwordConfirmation'>Password Confirmation</label>
            <input
              id='passwordConfirmation'
              placeholder='Password Confirmation'
              type='password'
              required
              value={passwordConfirmation}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Segment basic textAlign='center'>
            <Button color='yellow' size='large'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    </Container>
    );
  }
}

const styles = {
  container: {
    width: '70%',
  }
}

export default connect()(Register);
