import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Header, Image, Divider } from 'semantic-ui-react';
import { addGame, updateGame } from '../actions/games';
import TopBar from '../images/topbar.png';
import SelectTeam from './SelectTeam';
import Background2 from '../images/background2.png';

//TODO when I save it comes back as a 404 error and a uninitialized constant Api

class GameForm extends React.Component {
  // TODO do these need to be functions that add and subract?
  initialGameState ={
    time_clock: '',
    total_points: '',
    available_timeouts: '',
    total_fouls: '',
  }

  state = {...this.initialGameState}

  componentDidMount() {
    if (this.props.id)
      this.setState({ ...this.props })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  // TODO do we want a toggle form or just a page that they get sent to?
  handleSubmit = (e) => {
    e.preventDefault()
    const game = {...this.state}
    const { dispatch } = this.props
    const func = this.props.id ? updateGame : addGame
    dispatch(func(game))
    this.props.history.push('/games')
  }

  render() {
    const { time_clock, total_points, available_timeouts, total_fouls, coach_home, coach_away } = this.props
    return (
      //Need to make a turnary for if "create_new" then display styles.NaveBar and TopBar image, if not don't display them
      <div style={styles.backgroundImage}>
        <div style={styles.pageStyle}>
          <Header textAlign="center" style={styles.white}>
            <Divider hidden />
            <h1>Add Game Info</h1>
            <Divider hidden />
          </Header>
        <Divider hidden/>
        {/* <Container style={styles.formStyle}> */}
          {/* <Header>Add Game Info</Header> */}
          <Container style={styles.backgroundColor}>
          <Form center onSubmit={this.handleSubmit} style={styles.yellowBorder}>
            <div className="row"><SelectTeam/></div>
            <br />
            
          {/* <Form center onSubmit={this.postScorecard} > */}
            <Form.Input
              name="time_clock"
              required
              defaultValue={time_clock} //This should show game date
              onChange={this.handleChange}
              label="Date"//This was mislabeled as "Time Clock" 
              placeholder="20XX-MO-DAY 24HR"
            />
            <Form.Input
              name="coach_home"
              required
              defaultValue={coach_home}
              onChange={this.handleChange}
              label="Home Coach Id"
            />
            <Form.Input
              name="coach_away"
              required
              defaultValue={coach_away}
              onChange={this.handleChange}
              label="Guest Coach Id"
            />
            <Form.Input
              name="available_timeouts"
              required
              defaultValue={available_timeouts}
              onChange={this.handleChange}
              label="Available Timeouts"
            />
            <Form.Input
              name="total_fouls"
              required
              defaultValue={total_fouls}
              onChange={this.handleChange}
              label="Total Fouls"
            />
            <Form.Button color='yellow' size='large'>Save</Form.Button>
          </Form>
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
  formStyle: {
    marginTop: '2%'
  },
  backgroundImage: {
    backgroundImage: `url(${Background2})`,
    backgroundrepeat: 'no-repeat',
    flex: 1, 
    resizeMode: "cover",
    height: '100vh',
  },
  pageStyle: {
    paddingLeft: '17%',
    paddingTop: '2%',
    color: '#2C5234',
    paddingBottom: '2%',
  },
  white: {
    color: 'white'
  },
  backgroundColor: {
    backgroundColor: "white",
    borderRadius: '10px',
  },
  yellowBorder: {
    border: '5px solid #FFA300',
    borderRadius: '10px',
    padding: '2%'
  },
};

// TODO not sure if this is the right way to save 1 game as state to props
// what is does connect() do without the mapStateToProps
const mapStateToProps = (state) => {
  return { game: state.game }
};


export default connect(mapStateToProps)(GameForm);
