import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import FoulBall from '../images/Foul_Ball.jpg';

class NoMatch extends Component {
  render() {
    return (
        <div><Image style={styles.NavBar} src={FoulBall} alt='Error 404'/></div>
    );
  }
};

const styles = {
  NavBar: {
    paddingLeft: '15%',
    position: 'absolute',
    height: '100%'
  }
};

export default NoMatch;
