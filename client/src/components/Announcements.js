import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import TopBar from '../images/topbar.png';

class Announcements extends Component {
  render() {
    return (
      <div>
        <div><Image src={TopBar} fluid/></div>
        <div style={styles.NavBar}>
      </div>
    </div>
    );
  }
};

const styles = {
  NavBar: {
    paddingLeft: '15%'
  }
};

export default Announcements;
