import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { getCoachList } from '../actions/coaches';

const SelectTeam = () => (
  <span>
    Coach
    {' '}
    <Dropdown inline options={getCoachList}/>
  </span>
)

export default SelectTeam;
