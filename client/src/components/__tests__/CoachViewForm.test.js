import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { CoachViewForm } from '../CoachViewForm';

it('renders without crashing', () => {
  shallow(<CoachViewForm />);
});

describe('functionality', () => {
  let component;

  it('Dispatches to ADD_POST', () => {
    let test = { dispatch: jest.fn() }
    let component = mount(<CoachViewForm dispatch={test.dispatch} />)
    component.setState({ subject: 'foo', name: 'foo', description: 'foo'})
    let output = component.find('form')
    output.simulate('submit');
    expect(test.dispatch).toHaveBeenCalledTimes(1)
  });

});