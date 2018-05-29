import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Header } from 'semantic-ui-react';
import { getScorecards } from '../actions/scorecards';

class GameScorecards extends React.Component {
  state = { scorecards_home: [], scorecards_away: [] }

  componentDidMount() {
    const { dispatch, game } = this.props;
    dispatch(getScorecards(game.id))
    setTimeout(() => {
    const { scorecards } = this.props;
      this.setState({ scorecards_home: scorecards.filter( s => s.coach_id === game.coach_home ) })
      this.setState({ scorecards_away: scorecards.filter( s => s.coach_id === game.coach_away ) })
    }, 500)
  }


  calcTotal = (s) => {
    let total = s.one_pointer + (s.two_pointer * 2) + (s.three_pointer * 3)
    return (
      <span>{total}</span>
    )
  }

  // calcPoints = () => {
  //   let points = 
  // }

  render() {
    const { scorecards_home, scorecards_away } = this.state;
    return (
      <Container>
        <Header>Home Total: </Header>
          { scorecards_home.map( home =>
            <Link key={home.id} to={`/games/${home.game_id}/scorecards/${home.id}`}>{home.name} - Total Points: {this.calcTotal(home)}<br /></Link>
            )
          }
        <Header>Guest Total: </Header>
          { scorecards_away.map( away =>
            <Link key={away.id} to={`/games/${away.game_id}/scorecards/${away.id}`}>{away.name} - Total Points: {this.calcTotal(away)}<br /></Link>
            )
          }
        <Link to={`/${this.props.id}/create_player_card`}>
          <Button color='yellow' size='large'>
            Create New Scorecard
          </Button>
        </Link>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { scorecards: state.scorecards }
};

export default connect(mapStateToProps)(GameScorecards);


