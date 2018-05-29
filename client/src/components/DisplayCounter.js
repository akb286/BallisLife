import React from 'react';
import { Label, Table } from 'semantic-ui-react';
import Counter from './Counter';

const DisplayCounter = () => (
  <div>
    <Table celled style={styles.borderStyle} >
      <Table.Header>
        <Table.Row>
          <Table.Cell textAlign='center'>
            <Label style={styles.greenLabel} size='huge'>Home</Label>
          </Table.Cell>
          <Table.Cell width='3'></Table.Cell>
          <Table.Cell textAlign='center'>
            <Label style={styles.greenLabel} size='huge'>Guest</Label>
          </Table.Cell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell><Counter/></Table.Cell>
          <Table.Cell width='3'></Table.Cell>
          <Table.Cell><Counter/></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
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

  borderStyle: {
    border: '5px solid #FFA300',
    borderRadius: '10px',
    margin: '2%'
  }
};

export default DisplayCounter;

//#FFA300 Jazz Yellow
//#2C5234 Jazz Green
//#0C2340 Jazz Navy


// onChange(data: object) //passes in prop & proposed value