import axios from 'axios';
import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import TopBar from '../images/topbar.png';
import MyPlayers from './MyPlayers';

class UserView extends React.Component {
  state = { user: '' }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/users/${id}`)
      .then( res => {
        this.setState({ user: res.data })
      })
  }

  render() {
    const { user } = this.state;
    return (
      <div style={styles.NavBar}>
      <div><Image src={TopBar} fluid/></div>
        <Container> 
          <div>
            </div>
          <br />
          <div>
            User View

          </div>
        </Container>
      </div>
    )
  }
}

const styles = {
  NavBar: {
    paddingLeft: "15%",
  },
  greenStyle:{
    color: '#2C5234',
    
  },
};

export default UserView;