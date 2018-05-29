import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Image, Container, Card, Grid, Divider, Segment } from 'semantic-ui-react';
import { getMyScorecards } from '../actions/scorecards';
import TopBar from '../images/topbar.png';
import scorecard_image from '../images/scorecard.png';
import Background2 from '../images/background2.png';

class MyScorecards extends React.Component {
  
  componentDidMount() {
    const { dispatch, currentUser } = this.props;
    dispatch(getMyScorecards(currentUser.id))
  }

  calcTotal = (s) => {
    let total = s.one_pointer + (s.two_pointer * 2) + (s.three_pointer * 3)
    return (
      <span>{total}</span>
    )
  }

  render() {
    const { scorecards } = this.props;
    return (
      <div style={styles.backgroundImage}>
        <div style={styles.pageStyle}>
      {/* <div style={styles.NavBar}> */}
        {/* <div><Image src={TopBar} fluid/></div> */}
        {/* <Segment> */}
          <Header textAlign="center" style={styles.white}>

            <Divider hidden />
            <h1>My Scorecards</h1>
            <Divider hidden />
          </Header>
        {/* <Header textAlign="centered" as='h2'>My Scorecards</Header> */}
        {/* </Segment> */}
        <Divider hidden/>
        <Grid>
        {/* style={styles.padding} */}
          <Card.Group textAlign='center'>
          { scorecards.map( scorecard =>
            <Card color='yellow'>
              <Image centered size='medium' src={scorecard_image}/>
              <Card.Content>
                <Card.Description textAlign='center'>
                  <Grid.Column key={scorecard.id} mobile={16} tablet={16} computer={8}>
                    <Card.Header style={styles.bold}>
                      Total Points: {this.calcTotal(scorecard)}
                    </Card.Header>
                    <br />
                    <Card.Description>
                      Scorecard: {scorecard.id} for Game: {scorecard.game_id}
                    </Card.Description>
                  </Grid.Column>
                </Card.Description>
              </Card.Content>
            </Card>
            )
          }
          </Card.Group>
        </Grid>
      {/* </div> */}
      </div>
      </div>
    )
  }
}

const styles = {
  NavBar: {
    paddingLeft: '15%'
  },
  picture: {
    width: '500px'
  },
  padding: {
    paddingLeft: '5%'
  },
  bold: {
    fontSize: '22px',
    fontWeight: '600'
  },
  backgroundImage: {
    backgroundImage: `url(${Background2})`,
    backgroundrepeat: 'no-repeat',
    height: '100vh'
  },
  textStyle: {
    color: '#2C5234'
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
  return { currentUser: state.user, scorecards: state.scorecards }
};

export default connect(mapStateToProps)(MyScorecards);



