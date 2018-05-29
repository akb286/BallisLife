import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Image, Header, Divider, Container } from 'semantic-ui-react';
import { getCoachPlayers } from '../actions/players';
import { addScorecard } from '../actions/scorecards';
import TopBar from '../images/topbar.png';
import Background2 from '../images/background2.png';

class CreatePlayerCard extends Component {
  state = { jersey_num: '', player: ''}

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCoachPlayers())
  }

  handleChange = (e, { name, value }) => {
     this.setState({ [name]: value })
  }

  postScorecard = (e) => {
    e.preventDefault()
    const { dispatch } = this.props;
    let game_id = this.props.match.params.id;
    const {jersey_num, player} = this.state
    let scorecard = {jersey_num, player, game_id}
    dispatch(addScorecard(scorecard))
      this.props.history.push("/games")
    }
  

  render() {
    return (
      <div style={styles.backgroundImage}>
        <div style={styles.pageStyle}>
          <Header textAlign="center" style={styles.white}>
            <Divider hidden />
            <h1>Add Player Jersey Number</h1>
            <Divider hidden />
          </Header>
        <Divider hidden/>
        <Container style={styles.backgroundColor}>
          <Form center onSubmit={this.postScorecard} style={styles.yellowBorder}>
            <Form.Group widths='equal'>
              <Form.Input 
                icon='id badge' 
                iconPosition='left' 
                label='Enter Jersey #' 
                placeholder='Jersey#' 
                name='jersey_num' 
                value={this.state.jersey_num}
                onChange={this.handleChange}
                />
              <Form.Select 
                label='Player' 
                options={this.props.players} 
                placeholder='Player ID'
                name='player'
                value={this.state.player}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Button style={styles.buttonStyle} type='submit'>Save</Form.Button>
          </Form>
        </Container>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { players: state.players }
};

const styles = {
  formStyle: {
    paddingTop: '2%',
    paddingLeft: '16%',
    paddingRight:'1%'
  },
  buttonStyle: {
    backgroundColor: '#FFA300',
    color: 'white',
  },
  yellowBorder: {
    border: '5px solid #FFA300',
    borderRadius: '10px',
    padding: '2%'
  },
  backgroundImage: {
    backgroundImage: `url(${Background2})`,
    backgroundrepeat: 'no-repeat',
    height: '100vh'
  },
  padding: {
    margin: '3%'
  },
  white: {
    color: 'white'
  },
  pageStyle: {
    paddingLeft: '17%',
    paddingTop: '2%',
    color: '#2C5234'
  },
  backgroundColor: {
    backgroundColor: "white",
    borderRadius: '10px'
  },
};

export default connect(mapStateToProps)(CreatePlayerCard);