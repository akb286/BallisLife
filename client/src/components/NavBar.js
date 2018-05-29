import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { handleLogout } from '../actions/auth';
import Ball from '../images/ball.png';

const Wrap = styled(Menu.Item)`
  &:hover {
   background-color: #F9A01B !important;
   color: green !important
  }
`;

class NavBar extends Component {
  state = { activeItem: 'Home' }

  handleItemClick = (e, { name }) => {
   const { history, user } = this.props
    const path =  name === 'Home' ? '/' : `/${name.toLowerCase()}`
    history.push(path)
    this.setState({ activeItem: name })
  }

  render() {
    const { user, dispatch, history } = this.props;
    const { activeItem } = this.state;
      if (user.role === "player") {
        return(
          <div>
            <Menu fixed="left" size='huge' style={styles.NavBar} inverted vertical>
              <div><Image src={Ball} size='medium'/></div>
                <Wrap name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                <Wrap name='Calendar' active={activeItem === 'Calendar'} onClick={this.handleItemClick} />
                <Wrap name='MyScorecards' active={activeItem === 'MyScorecards'} onClick={this.handleItemClick} />
                <Wrap name='Games' active={activeItem === 'Games'} onClick={this.handleItemClick} />
                <Wrap name='Logout' onClick={() => dispatch(handleLogout(history))} />
            </Menu>
          </div>
        )
      }
      else if (user.role === "coach") {
        return(
          <div>
            <Menu fixed="left" size='huge' style={styles.NavBar} inverted vertical>
              <div><Image src={Ball} size='medium'/></div>
                <Wrap name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                <Wrap name='Calendar' active={activeItem === 'Calendar'} onClick={this.handleItemClick} />
                <Wrap name='Games' active={activeItem === 'Games'} onClick={this.handleItemClick} />
                <Wrap name='Team' active={activeItem === 'MyPlayers'} onClick={this.handleItemClick} />
                <Wrap name='Logout' onClick={() => dispatch(handleLogout(history))} />
            </Menu>
          </div>
        )
      }
      else if (user.role === "league_manager") {
        return(
          <div>
            <Menu fixed="left" size='huge' style={styles.NavBar} inverted vertical>
              <div><Image src={Ball} size='medium'/></div>
                <Wrap name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
                <Wrap name='Calendar' active={activeItem === 'Calendar'} onClick={this.handleItemClick} />
                <Wrap name='Games' active={activeItem === 'Games'} onClick={this.handleItemClick} />
                <Wrap name='BuildTeam' active={activeItem === 'BuildTeam'} onClick={this.handleItemClick} />
                <Wrap name='Logout' onClick={() => dispatch(handleLogout(history))} />
            </Menu>
          </div>
        )
      }
      else {
        return(
          <div>
            <Menu fixed="left" size='huge' style={styles.NavBar} inverted vertical>
              <div><Image src={Ball} size='medium'/></div>
                <Wrap name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
            </Menu>
          </div>
        )
      }
  }
}

const styles = {
  NavBar: {
    backgroundColor: '#0C2340',
    width: '15%'
  }
};

const mapStateToProps = (state) => {
  return { user: state.user }
};

export default withRouter(connect(mapStateToProps)(NavBar));
