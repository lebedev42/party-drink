import React from 'react';

import * as Styled from './MainLayout.styled';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <Styled.Container>{children}</Styled.Container>
);
