import React from 'react';
import { connect } from 'react-redux';
import { Header, List } from 'semantic-ui-react';
import { resetCoachId, setCoachId } from '../actions/players';

class LMPlayerRow extends React.Component {
  state = { isChecked: false }

  setCoach = (id, coach_id) => {
    const { isChecked } = this.state;
    const { dispatch } = this.props;
    { isChecked ? 
      dispatch(resetCoachId(id)) 
      : 
      dispatch(setCoachId(id, coach_id))
    }
  }

  togglePlayer = (player, coach_id) => {
    const { dispatch } = this.props;
    this.setState( state => {
      dispatch(this.setCoach(player, coach_id))
      return { isChecked: !this.state.isChecked };
    })
  }

  render() {
    const { isChecked } = this.state;
    const { player, coach_id } = this.props;
    return (
      <List.Item key={player} style={styles.pointer}>
        {
          isChecked ?
            <List.Icon onClick={() => this.togglePlayer(player, coach_id)} color="green" name="check" />
          :
            <List.Icon onClick={() => this.togglePlayer(player, coach_id)} color="orange" name="circle outline" />
        }
        <List.Content>
          <Header as="p" floated="right">
            {player.name} - {player.coach_id}
          </Header>
        </List.Content>
      </List.Item>
    )
  }
}

const styles = {
  pointer: {
    cursor: 'pointer'
  }
};

export default connect()(LMPlayerRow);