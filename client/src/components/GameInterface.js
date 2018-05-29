import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
import DisplayCounter from './DisplayCounter';
import DisplayScore from './DisplayScore';
import Background2 from '../images/background2.png';



class GameInterface extends React.Component {
  // state = { one_pointer: 0, 
  //           two_pointer: 0, 
  //           three_pointer: 0, 
  //           fouls: 0, 
  //           assists: 0, 
  //           rebounds: 0, 
  //           steals: 0,
  //           total_points: 0 
  // }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.dispatch(addScorecard())  //Want this to be updateScorecard?
  //   this.setState({ one_pointer: '', 
  //                   two_pointer: '',
  //                   three_pointer: '', 
  //                   fouls: '',
  //                   assists: '',
  //                   rebounds: '',
  //                   steals: '',
  //                   total_points: ''
  //                 })
  // }

  render() { 
    return(
      <div style={styles.backgroundImage}>
      <div style={styles.pageStyle}>
        <Container>
          <div className="ui equal width grid centered">
            <div><DisplayScore/></div>
          </div>
        </Container>

        <Container>
          <div className="ui equal width grid centered">
            <div className="row" centered><DisplayCounter/></div>
          </div>
        </Container>

        <Container>
          <div class="ui grid container centered">
          {/* this button puts score into the db & links back to all games */} 
            <Link to='/games'>
              <Button style={styles.buttonStyle} size='large'>
                End Game
              </Button>
            </Link>
          </div>
        </Container>
      </div>
      </div>
    )
  }
}

  const styles = {
    pageStyle: {
      paddingLeft: '17%',
      paddingTop: '2%',
      color: '#2C5234',
      paddingBottom: '2%'
    },
    jazzLogo: {
      padding: '1%'
    },
    buttonStyle: {
      backgroundColor: '#FFA300',
      color: 'white'
    },
    backgroundImage: {
      backgroundImage: `url(${Background2})`,
      backgroundrepeat: 'no-repeat',
      height: '100vh',
    },
  };

export default connect()(GameInterface);
