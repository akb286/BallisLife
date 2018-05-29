import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Grid, Image, Header, Divider } from 'semantic-ui-react';
import BBall from '../images/bball.png';
import bball2 from '../images/bball2.jpeg';
import TopBar from '../images/topbar.png';
import Background2 from '../images/background2.png';

//TODO - Do we want to only show coach#3 the games they are actually playing in? Or all games
class Games extends React.Component {

  listGames = () => {
    const { user } = this.props;
    return this.props.games.map( g => {
      return(
        <Grid.Column key={g.id}>
        <Card>
          <Image src={bball2} size='medium'/>
          <Card.Content>
            <Card.Header>
              <Link style={styles.textStyle} to={`/games/${g.id}`}>
                <Button compact style={styles.greenLabel} size='large'>
                Game {g.id} 
                </Button>
              </Link>
            </Card.Header>
            
            { (user.role === "coach") ?
            
            <div>
            <br />
            <Link to='/startscoreboard'>
              <Button compact color='yellow' size='large'>
                Start Scoreboard
              </Button>
            </Link>
            </div>
            :
            null
            }
          </Card.Content>
        </Card>
      </Grid.Column>
      )
    })
  }

  render() {
    const { user } = this.props;
    return (
      <div style={styles.backgroundImage}>
        <div style={styles.pageStyle}>
          <Header textAlign="center" style={styles.white}>
            <Divider hidden />
            <h1>Games Index</h1>
            <Divider hidden />
          </Header>
        <Divider hidden/>
          <div>
            { (user.role == "league_manager") ? 
          
            <Link to='/create_game'>
              <Button size='large' style={styles.buttonStyle}>
                Add Game
              </Button>
            </Link>
            :
            null
            }
            <Grid divided='vertically' centered columns={2} padded>
              <Grid.Row columns={4}>
                {this.listGames()}
              </Grid.Row>
            </Grid>
          </div>
        </div>
     </div>
    )
  }
}

const styles = {
  NavBar: {
    paddingLeft: '15%'
  },
  buttonStyle: {
    marginTop: '2%',
    marginBottom: '2%',
    backgroundColor: '#2C5234',
    color: 'white'
  },
  textStyle: {
    color: '#2C5234'
  },
  greenLabel: {
    backgroundColor: '#2C5234', 
    color: 'white'
  },
  navyLabel: {
    backgroundColor: '#0C2340',
    color: 'white'
  },
  borderStyle: {
    border: '5px solid #FFA300',
    borderRadius: '10px',
    margin: '2%'
  },
  backgroundImage: {
    backgroundImage: `url(${Background2})`,
    backgroundrepeat: 'no-repeat'
  },
  pageStyle: {
    paddingLeft: '17%',
    paddingTop: '2%',
    color: '#2C5234'
  },
  white: {
    color: 'white'
  },
};

const mapStateToProps = (state) => {
  return { games: state.games, user: state.user }
};

export default connect(mapStateToProps)(Games);