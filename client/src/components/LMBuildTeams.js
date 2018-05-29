import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Divider, Dropdown, Header, Image, List } from 'semantic-ui-react';
import { getCoachList } from '../actions/coaches';
import { getPlayerList, resetCoachId, setCoachId } from '../actions/players';
import TopBar from '../images/topbar.png';
import LMPlayerRow from './LMPlayerRow';
import Background2 from '../images/background2.png';

class BuildTeam extends React.Component {
  state = { selectCoach: '', selectTeam: [] }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCoachList())
    dispatch(getPlayerList())
  }

  resetTeam = () => {
    this.setState({ selectCoach: '' })
  }

  seePlayerList = () => {
    let { player_list } = this.props;
    const { selectCoach } = this.state;
    return ( selectCoach ?
      <div>
        <Header>Select Players</Header>
        <List>
          { player_list.map( player => <LMPlayerRow key={player.id} player={player} coach_id={this.state.selectCoach} /> ) }
        </List>
        <Button color="yellow" onClick={() => this.resetTeam()}>Set New Team</Button>
      </div>
      :
      null
    )
  }

  seeCoachDropdown = () => {
    let { coach_list } = this.props;
    const { selectCoach } = this.state;
    return ( selectCoach ?
      <p>Selected Coach Id: {this.state.selectCoach}</p>
      :
      <div>
        <Dropdown 
          placeholder='Choose a Coach' 
          onChange={ (e, data) => this.setState({ selectCoach: data.value }) } 
          fluid 
          selection 
          options={coach_list}  
        />
      </div>
    )
  }

  setCoach = (id, coach_id) => {
    const { isChecked } = this.state;
    const { dispatch } = this.props;
    { isChecked ? 
      dispatch(setCoachId(id, coach_id)) 
      : 
      dispatch(resetCoachId(id))
    }
  }

  render() {
    return (
      <div style={styles.backgroundImage}>
        <div style={styles.pageStyle}>
          <Header textAlign="center" style={styles.white}>
            <Divider hidden />
            <h1>Build A Team</h1>
            <Divider hidden />
          </Header>
        <Divider hidden/>
        {/* <Container style={styles.formStyle}> */}
          {/* <Header>Add Game Info</Header> */}
          <Container style={styles.backgroundColor}>
          {/* <Form center onSubmit={this.handleSubmit} style={styles.yellowBorder}> */}


      {/* <Header textAlign="centered" as='h2'>Build A Team</Header> */}
      {/* <br /> */}
      {/* <Container> */}
        <div style={styles.yellowBorder}>
          { this.seeCoachDropdown() }
          <Divider hidden />
          { this.seePlayerList() }
        </div>
      </Container>
    </div>
    </div>
  )}
}

const styles = {
  pointer: {
   cursor: 'pointer'
  },
  NavBar: {
    paddingLeft: "15%"
  },
  backgroundImage: {
    backgroundImage: `url(${Background2})`,
    backgroundrepeat: 'no-repeat',
    height: '330vh',
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
  backgroundColor: {
    backgroundColor: "white",
    borderRadius: '10px'
  },
  yellowBorder: {
    // height: '800px',
    border: '5px solid #FFA300',
    borderRadius: '10px',
    padding: '2%',
  },
}

const mapStateToProps = (state) => {
  return { coach_list: state.coaches, player_list: state.players }
};

export default connect(mapStateToProps)(BuildTeam);