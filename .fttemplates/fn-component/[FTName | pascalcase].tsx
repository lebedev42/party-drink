import React, { useEffect } from 'react';
import * as Styled from './<FTName | pascalcase>.styled';

type <FTName | pascalcase>Props = {}

export const <FTName | pascalcase>: React.FC<<FTName | pascalcase>Props> = (props) => {
  useEffect(() => {
    console.error('<FTName | pascalcase>');
  }, []);

  return (
    <Styled.Container {...props}>
      <FTName | pascalcase>
    </Styled.Container>
  );
};
