import React from 'react';
import { connect } from 'react-redux';
import { Form, Header, Image } from 'semantic-ui-react';
import { addScorecard, updateScorecard } from '../actions/scorecards';
import TopBar from '../images/topbar.png';

class ScorecardForm extends React.Component {
  initialScorecardState = {
    one_pointer: '',
    two_pointer: '',
    three_pointer: '',
    fouls: '',
    assists: '',
    rebounds: '',
    steals: '',
    active: '',
    game_id: '',
    user_id: '',
  }

  state = {...this.initialScorecardState}

  componentDidMount() {
    if (this.props.id)
      this.setState({ ...this.props })
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const scorecard = {...this.state}
    const { dispatch } = this.props
    const func = this.props.id ? updateScorecard : addScorecard
    dispatch(func(scorecard))
    this.props.history.push(`/games/${scorecard.game_id}`)
  }

  render() {
    const { one_pointer, two_pointer, three_pointer, fouls, assists, rebounds, steals, active, game_id, user_id } = this.props
    return (
      //Need to make a turnary for if "create_new" then display styles.NaveBar and TopBar image, if not don't display them
      <div style={styles.NavBar}>
        <div><Image src={TopBar} fluid/></div>
        <br />
        <Header as='h2'>ScorecardForm</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="one_pointer"
            required
            defaultValue={one_pointer}
            onChange={this.handleChange}
            label="One Pointer"
          />
          <Form.Input
            name="two_pointer"
            defaultValue={two_pointer}
            onChange={this.handleChange}
            label="Two Pointer"
          />
          <Form.Input
            name="three_pointer"
            defaultValue={three_pointer}
            onChange={this.handleChange}
            label="Three Pointer"
          />
          <Form.Input
            name="fouls"
            defaultValue={fouls}
            onChange={this.handleChange}
            label="Fouls"
          />
          <Form.Input
            name="assists"
            defaultValue={assists}
            onChange={this.handleChange}
            label="Assists"
          />
          <Form.Input
            name="rebounds"
            defaultValue={rebounds}
            onChange={this.handleChange}
            label="Rebounds"
          />
          <Form.Input
            name="steals"
            defaultValue={steals}
            onChange={this.handleChange}
            label="Steals"
          />
          <Form.Input
            name="active"
            defaultValue={active}
            onChange={this.handleChange}
            label="Active"
          />
          <Form.Input
            name="game_id"
            defaultValue={game_id}
            onChange={this.handleChange}
            label="Game Id"
          />
          <Form.Input
            name="user_id"
            defaultValue={user_id}
            onChange={this.handleChange}
            label="User Id"
          />
          <Form.Button color="yellow" >Save</Form.Button>
        </Form>
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
  return { scorecard: state.scorecard }
};

export default connect(mapStateToProps)(ScorecardForm);
