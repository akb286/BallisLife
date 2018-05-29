import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Divider, Grid, Header, Image } from 'semantic-ui-react';
import { getMyPlayers } from '../actions/players';
import Player from '../images/player.jpg';
import TopBar from '../images/topbar.png';
import Background2 from '../images/background2.png';

class MyPlayers extends React.Component {

  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    dispatch(getMyPlayers())
  }

  render() {
    const { players } = this.props;
    return (
      <div style={styles.backgroundImage}>
        <div style={styles.pageStyle}>
          <Header textAlign="center" style={styles.white}>
            <Divider hidden />
            <h1>My Team</h1>
            <Divider hidden />
          </Header>
        <Divider hidden/>
        <Grid>
          <Card.Group textAlign='center'>
            { players.map( player =>
            <Card color='yellow'>
              <Image centered size='small' src={Player}/>
              <Card.Content>
                <Card.Description textAlign='center'>
                  <Grid.Column key={player.id} mobile={16} tablet={16} computer={8}>
                    <Link style={styles.preventLink} onClick={e => e.preventDefault()} to={`/users/${player.id}`}>{player.name}<Divider hidden/></Link>
                  </Grid.Column>
                </Card.Description>
              </Card.Content>
            </Card>
            )
          }
          </Card.Group>
        </Grid>
      </div>
      </div>
    )
  }
}

const styles = {
  NavBar: {
    paddingLeft: '15%'
  },
  padding: {
    paddingLeft: '5%'
  },
  preventLink: {
    cursor: 'not-allowed'
  },
  backgroundImage: {
    backgroundImage: `url(${Background2})`,
    backgroundrepeat: 'no-repeat',
    height: '100vh',
  },
  pageStyle: {
    paddingLeft: '17%',
    paddingTop: '2%',
    color: '#2C5234',
    paddingBottom: '2%'
  },
  white: {
    color: 'white'
  },
};

const mapStateToProps = (state) => {
  return { currentUser: state.user, players: state.players }
};

export default connect(mapStateToProps)(MyPlayers);
