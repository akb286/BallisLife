import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Image, Table, Header, Button, Grid, Divider } from 'semantic-ui-react';
import { getScorecards } from '../actions/scorecards';
import TopBar from '../images/topbar.png';
import Background2 from '../images/background2.png';
class GameView extends React.Component {
  state = { game: {}, scorecards_home: [], scorecards_away: [], total_home: [], total_away: [] }
  
  componentDidMount() {
    const { games, dispatch } = this.props;
    const game = games.find( g => g.id === parseInt(this.props.match.params.id, 10 ) ) || {}
    this.setState({ game })
    dispatch(getScorecards(game.id))
    setTimeout(() => {
    const { scorecards } = this.props;
      this.setState({ scorecards_home: scorecards.filter( s => s.coach_id === game.coach_home ) })
      this.setState({ scorecards_away: scorecards.filter( s => s.coach_id === game.coach_away ) })
    }, 500)
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.games.length !== this.props.games.length)
      this.setState({game: this.props.games.find( g => g.id === parseInt(this.props.match.params.id, 10 ) ) })
  }
  
  calcTotal = (s) => {
    let total = s.one_pointer + (s.two_pointer * 2) + (s.three_pointer * 3)
    // this.setState({ total_home: {...this.state.total_home, ...total} })
    return (
      <span>{total}</span>
    )
  }
  
  calcHomeTotal = (home) => {
    home.map( h => {
      // need to add all points (1p, 2p, 3p) for each card, then add together. Can we push to an array in state in the calcTotal function and then flaten the array to get the total. Maybe do 2 calcTotals to keep them separate.
    })
  }
  
  calcAwayTotal = (away) => {
    away.map( a => {
    })
  }
  render() {
    const { game, scorecards_home, scorecards_away } = this.state;
    const { user } = this.props;
    return (
      <div style={styles.backgroundImage}>
        <div style={styles.pageStyle}>
          <Grid>
            <Grid.Row>
            <Grid.Column width={16}>    {/*This is the middle column. This will house the games, scorecards, and team members. It will also show posts from the coach like game times, locations and what not. */}
              <Header textAlign="center" style={styles.white}>
                <Divider hidden />
                  <h1>Game {game.id}</h1>
                <Divider hidden />
              </Header>
              <Divider hidden/>
              <div>
                <Table cell fixed singleLine style={styles.tableStyle} size='large' collapsing>
                  <Table.Header size='huge'>
                    <Table.Row>
                      <Table.HeaderCell width='one'> Game Overview </Table.HeaderCell> 
                      <Table.HeaderCell width='one'> Totals </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header> 
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Time Clock</Table.Cell>
                      <Table.Cell>{game.time_clock}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Available Home Fouls</Table.Cell>
                      <Table.Cell>{game.fouls_home}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Available Guest Fouls</Table.Cell>
                      <Table.Cell>{game.fouls_away}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Home Points</Table.Cell>
                      <Table.Cell>
                        23
                      {/* {this.calcHomeTotal(scorecards_home)} */}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Guest Points</Table.Cell>
                      <Table.Cell>
                        21
                      {/* {this.calcAwayTotal(scorecards_away)} */}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
              <div>
              { this.state.game.id ? 
                <Table cell fixed singleLine style={styles.tableStyle} size='large' collapsing>
                  <Table.Header size='huge'>
                    <Table.Row>
                      <Table.HeaderCell width='one'> Home Player Totals </Table.HeaderCell> 
                      <Table.HeaderCell width='one'> Guest Player Totals </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Row>
                    <Table.Cell>
                      {scorecards_home.map( home =>
                        <Link key={home.id} to={`/games/${home.game_id}/scorecards/${home.id}`}>
                          {home.name} - {this.calcTotal(home)} 
                          <br />
                        </Link>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {scorecards_away.map( away =>
                        <Link key={away.id} to={`/games/${away.game_id}/scorecards/${away.id}`}>
                          {away.name} - {this.calcTotal(away)}
                          <br />
                        </Link>
                      )}
                    </Table.Cell>
                  </Table.Row> 
                </Table> 
              :
                null 
              }
              </div>
              { user.role == "coach" ?
              <Link to={`/${this.props.match.params.id}/create_player_card`}>
                <Button style={styles.buttonStyle}>Assign Jersey to Player</Button>
              </Link>
              :
              null
              }
              </Grid.Column>
                </Grid.Row>
                  
                  </Grid>
          </div>
          { user.role == "player" ?
          null
          :
          <Link to={`/${this.props.match.params.id}/create_player_card`}>
            <Button style={styles.buttonStyle}>Assign Jersey to Player</Button>
          </Link>
          }
        </div>      
    )
  }
}

const styles = {
  NavBar: {
    paddingLeft: '15%'
  },
  cellHeader: {
   color: 'white',
   backgroundColor: '#2C5234'
  },
  tableStyle: {
    margin: '2%',
    border: '5px solid #FFA300',
    borderRadius: '10px'
  },
  buttonStyle: {
    backgroundColor: '#FFA300',
    color: 'white',
    marginLeft: '2%'
  },
  backgroundImage: {
    backgroundImage: `url(${Background2})`,
    backgroundrepeat: 'no-repeat',
    height: '100vh'
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
  return { games: state.games, scorecards: state.scorecards, user: state.user }
};

export default connect(mapStateToProps)(GameView);