import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Container, Form, Button, Icon, Segment, Divider } from 'semantic-ui-react';
import { addEvent } from '../actions/events';


class EventForm extends React.Component {
  state = { title: '', startDate: '', endDate: '', location: '', allday: false, showForm: true }

  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value })
  }

  toggleCheck = () => {
    this.setState({ allday: !this.state.allday })
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props;
    const { title, startDate, endDate, location, allday } = this.state;
    dispatch(addEvent({ title, startDate, endDate, location, allday }))
    this.setState({ title: '', startDate: '', endDate: '', location: '', showForm: false })
  }

  render() {
    const { title, startDate, endDate, location, allday } = this.props
    return (
      this.state.showForm ?
      <Container>
        <Form onSubmit={this.handleSubmit.bind(this)}> 
          <Form.Input
            name="title"
            required
            value={title}
            onChange={this.handleChange}
            label="Title"
            placeholder="Event Title" 
          />
          <Form.Input
            name="startDate"
            required
            value={startDate}
            onChange={this.handleChange}
            label="Start Date/Time"
            placeholder="20XX-MO-DAY 24HR"
          />
          <Form.Input
            name="endDate"
            required
            value={endDate}
            onChange={this.handleChange}
            label="End Date/Time"
            placeholder="20XX-MO-DAY 24HR"
          />
            <Form.Input
            name="location"
            value={location}
            onChange={this.handleChange}
            label="Location"
            placeholder="Enter Location Here"
          />
          <Checkbox
            name="allday"
            value={allday}
            label="All Day Event?"
            onClick={() => this.toggleCheck()}
          >
          All day?
          </Checkbox>
          <Divider hidden />
          <Form.Button type='submit'>Save Post</Form.Button>
        </Form>
      </Container>
      :
      <Segment textAlign="center">
        <Button color='green' onClick={this.toggleForm}><Icon name='add'/>Add Event</Button> 
      </Segment>
    )
  }
}

export default connect()(EventForm);