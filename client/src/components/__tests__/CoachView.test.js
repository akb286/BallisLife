import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CoachView from '../CoachView';
import store from '../../store';

it('renders without crashing', () => {
  shallow(<CoachView store={store}/>);
});

describe(<CoachView />, () => {
  
  describe(<CoachView />, () => {
    let component;
    beforeEach( () => {
      component = shallow(<CoachView store={store}/>);
    });

    it('matches snapshot', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

  });
});