import React from 'react';
import { Input, Label, Segment } from 'semantic-ui-react';

const DisplayScore = () => (
  <div>
    <Segment.Group horizontal size='massive' style={styles.yellowBorder}>
      <Segment>
        <Label style={styles.greenLabel} text='white' size='massive'>HOME</Label>
        <br />
        <br />
        <Input textAlign='center' size='massive'>20</Input>
      </Segment>

      <Segment textAlign='center'>
        <Label style={styles.navyLabel} size='large'>Period</Label>
        <br />
        <br 
        />
        <Input size='large'>3</Input>
      </Segment>

      <Segment >
        <Label style={styles.greenLabel} size='massive'>GUEST</Label>
        <br />
        <br />
        <Input textAlign='center' size='massive'>22</Input>
      </Segment>
    </Segment.Group>
  </div>
)

const styles = {
  greenLabel: {
    backgroundColor: '#2C5234', 
    color: 'white'
  },
  navyLabel: {
    backgroundColor: '#0C2340',
    color: 'white'
  },
  yellowBorder: {
    border: '5px solid #FFA300',
    borderRadius: '10px'
  }
};

export default DisplayScore;

//#FFA300 Jazz Yellow
//#2C5234 Jazz Green
//#0C2340 Jazz Navy


// onChange(data: object) //passes in prop & proposed value