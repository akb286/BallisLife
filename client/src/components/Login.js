import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Header, Image, Segment } from 'semantic-ui-react';
import { handleLogin } from '../actions/auth';
import logo2 from '../images/logo2.png';


class Login extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin(email, password, history));
  }

  render() {
    const { email, password } = this.state;
    return (
      <Container style={styles.container}>
        <Segment basic>
          <div><Image src={logo2} size='medium' centered/></div>
          <Header as='h1' textAlign='center'>Login</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label htmlFor='email'>Email</label>
              <input
                required
                id='email'
                value={email}
                placeholder='Email'
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor='password'>Password</label>
              <input
                required
                id='password'
                value={password}
                placeholder='Password'
                type='password'
                onChange={this.handleChange}
              />
            </Form.Field>
            <Segment textAlign='center' basic>
              <Button color='yellow' size='large'>Login</Button>
                <Link to="/register">
                <Button size='large'>Register</Button>
                </Link>
            </Segment>
          </Form>
        </Segment>
      </Container>
    );
  }
}

const styles = {
  container: {
    width: '70%'
  }
};

export default connect()(Login);
