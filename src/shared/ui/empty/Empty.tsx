import React, { ReactElement } from 'react';
import * as Styled from './Empty.styled';

type EmptyProps = {
  children: React.ReactNode;
};

export const Empty: React.FC<EmptyProps> = ({ children }) => {
  return <Styled.Container>{children}</Styled.Container>;
};
