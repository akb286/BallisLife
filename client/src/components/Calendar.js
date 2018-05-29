import moment from 'moment';
import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { Grid, Table } from 'semantic-ui-react';
import { getEvents } from '../actions/events';
import EventForm from './EventForm';

BigCalendar.momentLocalizer(moment);

class eventCalendar extends React.Component {
  state = {}
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getEvents(this.props.match.params.event_id))
  }

  render() {
    const { user } = this.props;
    return (
    <div>
      <Grid style={styles.navBarSpacing}>
        <Grid.Row>
          <Grid.Column width={16}>
            <BigCalendar
            events={this.props.events}
            views={ ['month'] }
            step={60}
            showMultiDayTimes
            defaultDate={new Date()}
            startAccessor='startDate'//these are used to call events
            endAccessor='endDate'
            style={{height: '100%'}}//the calendar needs to be sized in order to work.
          />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <hr />
        <Table style={styles.table} celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Event</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.props.events.map( e =>
                <Table.Row key={e.id}>
                  <Table.Cell>{e.title}</Table.Cell>
                  <Table.Cell>{e.startDate}</Table.Cell>
                  <Table.Cell>{e.endDate}</Table.Cell>
                  <Table.Cell>{e.location}</Table.Cell>
                </Table.Row> 
                // react-big-calendar is very finicky about what datatypes you use. 
                // endDate is used inside of the controller(unforutnately)/camelCase is used for startDate/endDate globally
              )
            }
          </Table.Body>
        </Table>
        <hr />
        { user.role == "player" ?
        null
        :
        <Grid style={styles.navBarSpacing} >
        <Grid.Row>
            <Grid.Column>
              <EventForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
      }
    </div>
    )
  }
}

const styles = {
  navBarSpacing: {
    flex: 1,
    height: '83vh',
    paddingLeft: '15%'
  },
  table: {
    flex: 2,
    paddingLeft: '15%'
  }
};

const mapStateToProps = (state) => {
  return { events: state.events, user: state.user }
};

export default connect(mapStateToProps)(eventCalendar);
