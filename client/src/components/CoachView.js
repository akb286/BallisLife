import React from 'react';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Image, Segment, Divider, Icon } from 'semantic-ui-react';
import { getPosts } from '../actions/posts';
import { getCoachData } from '../actions/scorecards';
import TopBar from '../images/topbar.png';
import CoachPostCard from './CoachPostCard';
import CoachViewForm from './CoachViewForm';
import Background2 from '../images/background2.png';
import styled from 'styled-components';

//TIPS FOR READING THIS PAGE!
//Almost everything is conditionally rendered so pay close attention to local state and how its influencing the "If or Else statements" and the turinary functions.
//This page needs to be refactored so it doesnt use an If, Else If. and instead just uses turinaries like the "CoachPostcard" component.

export class CoachView extends React.Component {
  state = { games: '', scorecards: '', toggleForm: true } 

  componentDidMount() {
    const { posts } = this.props;
    this.props.dispatch(getCoachData())
    this.props.dispatch(getPosts())

    //This block dispatches an action upon request from a button "onClick or Inline rendered component below "(EX)<CoachPostCard />".
  }

  toggleForm = (state) => {
    const { toggleForm } = this.state;
    if (toggleForm === false) {
      this.setState( state => {
        return { toggleForm: true }
      })
    } else { (toggleForm === true )
      this.setState( state => {
        return { toggleForm: false }
      })
    }

    //This block sets the state of "toggleForm" based on weather or not the local state of "toggleForm" is already true or false. This block is called 
    //in lines of code in the coach/ league_manager views of the If, Else If statemnet.
  }

  render() {
    const { user, posts } = this.props;
    const { toggleForm } = this.state;
    if (user.role === "player") {  //This is the player view section.
      return(
        <div style={styles.backgroundImage}>
          <div style={styles.pageStyle}>
           <Grid>
             <Grid.Row>
              <Grid.Column width={12}>    {/*This is the middle column. This will house the games, scorecards, and team members. It will also show posts from the coach like game times, locations and what not. */}
                <Header textAlign="center" style={styles.white}>
                  <Divider hidden />
                    <h1>Blue Piranha Team</h1>
                    <h3>Welcome Teammate!</h3>
                  <Divider hidden />
                </Header>
                <Divider hidden/>
                <Grid columns='equal'>
                  <Grid.Column>
                    <Segment textAlign='center'>
                      <h3>Your Scorecard</h3>
                      <Link to='/myscorecards'>
                      <Button color='yellow' size='large'>
                          View
                      </Button>
                      </Link>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment textAlign='center'>
                      <h3>Games</h3>
                      <Link to='/games'>
                      <Button color='yellow' size='large'>
                        View
                      </Button>
                      </Link>
                    </Segment>
                  </Grid.Column>
                  {/* TODO - add a view to see a players teammates */}
                  {/* <Grid.Column>
                    <Segment textAlign='center'>
                      <h3>Teammates</h3>
                      <Link to='/myplayers'>
                      <Button color='yellow' size='large'>
                        View
                      </Button>
                      </Link>
                    </Segment>
                  </Grid.Column> */}
                </Grid>
                <Divider hidden/>
                <div> {/*This is the start of the coahes Posts */}
                  { posts.map( post =>
                      <CoachPostCard id={post.id} name={post.name} subject={post.subject} description={post.description} />
                    )
                  }
                </div>
              </Grid.Column>
              <Grid.Column width={4}>    {/*This is the right column. This has the live chat for the entire team. */}
                <Card>
                  <Link to="/calendar">
                    <Card.Content style={styles.padding}>
                      <Card.Header>
                        <h1 style={styles.textStyle}>Calendar</h1>
                      </Card.Header>
                      <Calendar />
                    </Card.Content>
                  </Link>
                </Card>
              </Grid.Column>
             </Grid.Row>
           </Grid>
        </div>
      </div>
      )
    }
    else if (user.role === "coach" ) {
      return(
        <div style={styles.backgroundImage}>
          <div style={styles.pageStyle}>
           <Grid>
             <Grid.Row>
              <Grid.Column width={12}>    {/*This is the middle column. This will house the games, scorecards, and team members. It will also show posts from the coach like game times, locations and what not. */}
                <Header textAlign="center" style={styles.white}>
                  <Divider hidden />
                    <h1>The Hot Shots Team</h1>
                    <h3>Welcome Coach!</h3>
                  <Divider hidden />
                </Header>
                <Divider hidden/>
                <Grid columns='equal'>
                  {/* <Grid.Column>
                    <Segment textAlign='center'>
                      <h3>Scorecards</h3>
                        <Link to='/myscorecards'>
                        <Button color='yellow' size='large'>
                          View
                        </Button>
                        </Link>
                    </Segment>
                  </Grid.Column> */}
                  <Grid.Column>
                    <Segment textAlign='center'>
                      <h3>Games</h3>
                        <Link to='/games'>
                        <Button color='yellow' size='large'>
                          View
                        </Button>
                        </Link>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment textAlign='center'>
                      <h3>Team</h3>
                        <Link to='/team'>
                        <Button color='yellow' size='large'>
                          View
                        </Button>
                        </Link>
                    </Segment>
                  </Grid.Column>
                </Grid>
                <Divider hidden />
                { toggleForm ?   
                 <div>
                  <Segment textAlign="center">
                    <Button color='yellow' onClick={this.toggleForm}><Icon name='add circle'/>Create A Post</Button>
                  </Segment>
                  <Divider hidden/>
                 </div>
                :
                  <div>
                  <Segment>
                    <Segment textAlign="center">
                      <Button color='red' onClick={this.toggleForm}><Icon name='hide'/>Hide</Button>
                    </Segment>
                    <CoachViewForm closeForm={this.toggleForm} /> {/*  Note that the param "closeForm" is being passed into the "CoachViewForm" component as a prop/ redux state attribute. */}
                  </Segment>
                  <Divider hidden/>
                  </div>

                  //This is rendering based on weather or not "toggleForm" is true or false. Which can only be changed inside this portion of the If else. 
                  //This turinary does not exist in the player view portion.
                }

                {/*This is the start of the coahes Posts */}
                <div>
                  { posts.map( post =>
                      <CoachPostCard id={post.id} name={post.name} subject={post.subject} description={post.description} /> 
                    )
                  }
                </div>
              </Grid.Column>
              <Grid.Column width={4}>    {/*This is the right column. This has the calender. */}
                <Card>
                  <Link to="/calendar">
                    <Card.Content style={styles.padding}>
                      <Card.Header>
                        <h1 style={styles.textStyle}>Calendar</h1>
                      </Card.Header>
                      <Calendar />
                    </Card.Content>
                  </Link>
                </Card>
              </Grid.Column>
             </Grid.Row>
           </Grid>
        </div>
      </div>
      )
    }
    else if (user.role === "league_manager") {
      return(
        <div style={styles.backgroundImage}>
          <div style={styles.pageStyle}>
           <Grid>
             <Grid.Row>
              <Grid.Column width={12}>    {/*This is the middle column. This will house the games, scorecards, and team members. It will also show posts from the coach like game times, locations and what not. */}
                <Header textAlign="center" style={styles.white}>
                  <Divider hidden />
                    <h1>Junior Jazz League</h1>
                    <h3>Welcome League Manager!</h3>
                  <Divider hidden />
                </Header>
                <Divider hidden/>
                  <Grid columns='equal'>
                    <Grid.Column>
                      <Segment textAlign='center'>
                        <h3>Games</h3>
                          <Link to='/games'>
                          <Button color='yellow' size='large'>
                            Add New
                          </Button>
                          </Link>
                      </Segment>
                    </Grid.Column>
                    <Grid.Column>
                      <Segment textAlign='center'>
                        <h3>Create A Team</h3>
                          <Link to='/buildteam'>
                          <Button color='yellow' size='large'>
                            Create
                          </Button>
                          </Link>
                      </Segment>
                    </Grid.Column>
                  </Grid>
                  { toggleForm ?
                  <Segment textAlign="center">
                    <Button color='yellow' onClick={this.toggleForm}><Icon name='add circle'/>Create A Post</Button>
                  </Segment>
                  :
                    <Segment>
                      <Segment textAlign="center">
                        <Button onClick={this.toggleForm}>Hide</Button>
                      </Segment>
                      <CoachViewForm closeForm={this.toggleForm} />
                    </Segment>
                  }

                  {/*This is the start of the coahes Posts */}
                  <div>
                    { posts.map( post =>
                        <CoachPostCard id={post.id} name={post.name} subject={post.subject} description={post.description} />
                      )
                    }
                  </div>
                </Grid.Column>
                <Grid.Column width={4}>    {/*This is the right column. This has the live chat for the entire team. */}
                  <Card>
                    <Link to="/calendar">
                      <Card.Content style={styles.padding}>
                        <Card.Header>
                          <h1 style={styles.textStyle}>Calendar</h1>
                        </Card.Header>
                        <Calendar />
                      </Card.Content>
                    </Link>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      )
    }
  }
}

const styles = {
  pageStyle: {
    paddingLeft: '17%',
    paddingTop: '2%',
    color: '#2C5234'
  },
  textStyle: {
    color: '#2C5234'
  },
  calendarStyle: {
    backgroundColor: '#2C5234',
    color: 'white'
  },
  backgroundImage: {
    backgroundImage: `url(${Background2})`,
    backgroundrepeat: 'no-repeat'
  },
  padding: {
    margin: '3%',
    backgroundrepeat: 'no-repeat' 
  },
  white: {
    color: 'white'
  },
};

const mapStateToProps = (state) => {
    return { scorecards: state.scorecards, posts: state.posts, user: state.user }
};

export default connect(mapStateToProps)(CoachView);
