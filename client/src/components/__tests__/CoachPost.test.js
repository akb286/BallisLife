import React from 'react';
import { shallow } from 'enzyme';
import { CoachPost } from '../CoachPost';

it('Renders Without Crashing', () => {
  shallow(<CoachPost />);
});

// describe('functionality', () => {
//   let component;

//   describe('Dispatches to DELETE_POST', () => {

//   });

// });