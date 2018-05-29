import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Header, Image, Table } from 'semantic-ui-react';
import { deleteGame } from '../actions/games';
import TopBar from '../images/topbar.png';
import GameForm from './GameForm';
import GameScorecards from './GameScorecards';

class GameView extends React.Component {
  state = { showGameForm: false, game: {} }
  
  componentDidMount() {
    const { games } = this.props;
    const game = games.find( g => g.id === parseInt(this.props.match.params.id, 10 ) ) || {}
    this.setState({ game })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.games.length !== this.props.games.length)
      this.setState({game: this.props.games.find( g => g.id === parseInt(this.props.match.params.id, 10 ) ) })
  }

  toggleGameForm = () => {
    this.setState( state => {
      return { showGameForm: !state.showGameForm }
    })
  }

  removeGame = (game) => {
    const { game: {id} } = this.state
    const { dispatch, history } = this.props
    dispatch(deleteGame(id))
    history.push('/games')
  }

  render() {
    const { showGameForm, game } = this.state;
    return (
      <div style={styles.NavBar}>
        <div><Image src={TopBar} fluid/></div>
        <Container>
          <Header>GameView</Header>
          <Button onClick={this.toggleGameForm}>{ showGameForm ? 'Cancel' : 'Edit' }</Button>
          <Button color='red' onClick={this.removeGame}>Delete</Button>

          { showGameForm ?
            <GameForm {...game} closeForm={this.toggleGameForm} history={this.props.history} />
            :
          <div>
            <Table definition>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
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
                  <Table.Cell>{game.total_fouls}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Guest Points</Table.Cell>
                  <Table.Cell>{game.total_fouls}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          }
        { this.state.game.id ? <GameScorecards game={this.state.game} /> : null }
        </Container>
      </div>
    )
  }
}

const styles = {
  NavBar: {
    paddingLeft: '15%'
  }
};

const mapStateToProps = (state) => {
  return { games: state.games }
};

export default connect(mapStateToProps)(GameView);
