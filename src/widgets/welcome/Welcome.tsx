import React from 'react';

import * as Styled from './Welcome.styled';

interface WelcomeProps {
  handleStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ handleStart }) => {
  return (
    <Styled.Container>
      <Styled.Actions>
        <Styled.Btn typeBtn="white" onClick={() => handleStart()}>
          Начать игру
        </Styled.Btn>
      </Styled.Actions>
    </Styled.Container>
  );
};
