import React from 'react';
import { Button, Input, Segment } from 'semantic-ui-react';

class Counter extends React.Component {
  state = { one: 0, two: 0, three: 0, foul: 0, assist: 0, rebound: 0, steal: 0, total: 0, check: false}

  inc1 = async () => {
    await this.setState( state => {
      return { one: state.one + 1, check: true }
    });
  }

  inc2 = async () => {
    await this.setState( state => {
      return { two: state.two + 1 }
    });
      this.setState({ totaltwo: this.state.two * 2, check: true })
  }

  inc3 = async () => {
    await this.setState( state => {
      return { three: state.three + 1 }
    });
      this.setState({ totalthree: this.state.three * 3, check: true })
  }

  incFouls = async () => {
    await this.setState( state => {
      return { foul: state.foul + 1 }
    });
  }

  incAssists = async () => {
    await this.setState( state => {
      return { assist: state.assist + 1 }
    });
  }

  incRebounds = async () => {
    await this.setState( state => {
      return { rebound: state.rebound + 1 }
    });
  }

  incSteals = async () => {
    await this.setState( state => {
      return { steal: state.steal + 1 }
    });
  }

  dec1 = async () => {
    await this.setState( state => {
      return { one: state.one - 1 }
    });
  }

  dec2 = async () => {
    await this.setState( state => {
      return { two: state.two - 1 }
    });
      this.setState({ totaltwo: this.state.two * 2 })
  }

  dec3 = async () => {
    await this.setState( state => {
      return { three: state.three - 1 }
    });
      this.setState({ totalthree: this.state.three * 3 })
  }

  decFouls = async () => {
    await this.setState( state => {
      return { foul: state.foul - 1 }
    });
  }

  decAssists = async () => {
    await this.setState( state => {
      return { assist: state.assist - 1 }
    });
  }

  decRebounds = async () => {
    await this.setState( state => {
      return { rebound: state.rebound - 1 }
    });
  }

  decSteals = async () => {
    await this.setState( state => {
      return { steal: state.steal - 1 }
    });
  }

  score = ({total}) => {
    if ( this.state.check === true ) {
        this.setState( state => {
          return { total: this.state.total + this.state.one + this.state.totaltwo + this.state.totalthree, check: false }
        })
    }
  }

  render() {
    return (
      <div>
        <Segment.Group size='huge'style={styles.navyBorder} >
          <Segment>
          <Input icon='id badge' iconPosition='left' placeholder='Player#' style={styles.playerMargin}/>

            <p>One Pointer 
              <button onClick={this.inc1} style={styles.textMarginL}>+</button>
              <button onClick={this.dec1} style={styles.textMarginR}>-</button>
              {this.state.one}
            </p>

            <p>Two Pointer 
              <button onClick={this.inc2} style={styles.textMarginL}>+</button>
              <button onClick={this.dec2} style={styles.textMarginR}>-</button>
              {this.state.two}
            </p>

            <p>Three Pointer 
              <button onClick={this.inc3} style={styles.textMarginL}>+</button>
              <button onClick={this.dec3} style={styles.textMarginR}>-</button>
              {this.state.three}
            </p>

            <p> 
              <Button onClick={this.score} style={styles.navyLabel}>Add Points</Button>
              {this.state.total}
            </p>
          </Segment>

          <Segment>
            <p>Foul 
              <button onClick={this.incFouls} style={styles.textMarginL}>+</button>
              <button onClick={this.decFouls} style={styles.textMarginR}>-</button>
              {this.state.foul}
            </p>

            <p>Assist 
              <button onClick={this.incAssists} style={styles.textMarginL}>+</button>
              <button onClick={this.decAssists} style={styles.textMarginR}>-</button>
              {this.state.assist}
            </p>

            <p>Rebound 
              <button onClick={this.incRebounds} style={styles.textMarginL}>+</button>
              <button onClick={this.decRebounds} style={styles.textMarginR}>-</button>
              {this.state.rebound}
            </p>

            <p>Steal 
              <button onClick={this.incSteals} style={styles.textMarginL}>+</button>
              <button onClick={this.decSteals} style={styles.textMarginR}>-</button>
              {this.state.steal}
            </p>
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}

const styles = {
  greenLabel: {
    backgroundColor: '#2C5234', 
    color: 'white'
  },
  yellowLabel: {
    backgroundColor: '#0C2340',
    color: 'white'
  },
  navyLabel: {
    backgroundColor: '#0C2340',
    color: 'white'
  },
  navyBorder: {
    border: '5px solid #0C2340',
    borderRadius: '10px'
  },
  playerMargin: {
    marginBottom: '10%'
  },
  textMarginL: {
    marginLeft: '3%'
  },
  textMarginR: {
    marginLeft: '3%',
    marginRight: '3%'
  }
};

export default Counter;