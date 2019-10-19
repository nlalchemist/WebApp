// @flow

import React from 'react';
import styled from 'styled-components';

const StyledMenu = styled.div`
  width: 20%;
  display: inline-flex;
  align-items: center;
`;

function Menu() {
  return (
    <StyledMenu>
      <p>What do you want to put this area?</p>
    </StyledMenu>
  );
}

export default Menu;
