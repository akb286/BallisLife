import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Table, Container, Divider } from 'semantic-ui-react';
import { deleteScorecard } from '../actions/scorecards';
import TopBar from '../images/topbar.png';
import ScorecardForm from './ScorecardForm';
import Background2 from '../images/background2.png';

class ScorecardView extends React.Component {
  state = { showScorecardForm: false, scorecard: {} }

  componentDidMount() {
    const { scorecards } = this.props;
    this.setState({scorecard: scorecards.find( s => s.id === parseInt(this.props.match.params.id, 10 ) ) })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scorecards.length !== this.props.scorecards.length)
      this.setState({scorecard: this.props.scorecards.find( s => s.id === parseInt(this.props.match.params.id, 10 ) ) })
  }

  toggleShowScorecardForm = () => {
    this.setState( state => {
      return { showScorecardForm: !state.showScorecardForm }
    })
  }

// TODO: We are going to want to make this something only the coach can do/see and soemthing that has a "are you sure you want to delete this" flash message.
  removeScorecard = (scorecard) => {
    const { scorecard: {id, game_id } } = this.state
    const { dispatch, history } = this.props
    dispatch(deleteScorecard(id, game_id))
    history.push(`/games/${game_id}`)
  }

  render() {
    const { showScorecardForm, scorecard = {} } = this.state;
    return (
      <div style={styles.backgroundImage}>
        <div style={styles.pageStyle}>
          <Header textAlign="center" style={styles.white}>
            <Divider hidden />
            <h1>Scorecard: {scorecard.id}</h1>
            <Divider hidden />
          </Header>
        <Divider hidden/>
        <Container style={styles.backgroundColor}>
        {/* <Header textAlign="centered" as='h2'>Scorecard: {scorecard.id}</Header> */}

        {/* <Button onClick={this.toggleShowScorecardForm}>{ showScorecardForm ? 'Cancel' : 'Edit' }</Button> */}
        {/* <Button color='red' onClick={this.removeScorecard}>Delete</Button> */}
        {/* <Container> */}
          { showScorecardForm ? 
            <ScorecardForm {...scorecard} 
              closeForm={this.toggleShowScorecardForm} 
              history={this.props.history} 
            />
            : 
            <div>
              <Table style={styles.yellowBorder}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width='one'>Description</Table.HeaderCell>
                    <Table.HeaderCell width='one'>Stat</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>One Pointers</Table.Cell>
                    <Table.Cell>{scorecard.one_pointer}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Two Pointers</Table.Cell>
                    <Table.Cell>{scorecard.two_pointer}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Three Pointers</Table.Cell>
                    <Table.Cell>{scorecard.three_pointer}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Total Fouls</Table.Cell>
                    <Table.Cell>{scorecard.fouls}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Total Assists</Table.Cell>
                    <Table.Cell>{scorecard.assists}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Total Rebounds</Table.Cell>
                    <Table.Cell>{scorecard.rebounds}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Total Steals</Table.Cell>
                    <Table.Cell>{scorecard.steals}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Active Time?</Table.Cell>
                    <Table.Cell>{`${scorecard.active}`}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Player ID</Table.Cell>
                    <Table.Cell>{scorecard.user_id}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Game ID</Table.Cell>
                    <Table.Cell>{scorecard.game_id}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          }
        </Container>
      </div>
      </div>
    )
  }
}

const styles = {
  NavBar: {
    paddingLeft: '15%'
  },
  tableStyle: {
    margin: '2%',
    border: '5px solid #FFA300',
    borderRadius: '10px'
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
  yellowBorder: {
    border: '5px solid #FFA300',
    borderRadius: '10px',
    // padding: '2%'
  },
};

const mapStateToProps = (state) => {
  return { scorecards: state.scorecards }
};

export default connect(mapStateToProps)(ScorecardView);