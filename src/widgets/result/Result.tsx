import React from 'react';
import * as Styled from './Result.styled';

interface ResultProps {
  isWin?: boolean;
  playAgain?: () => void;
  children?: React.ReactNode;
}

export const Result: React.FC<ResultProps> = ({
  isWin,
  playAgain,
  children,
}) => {
  const handleBack = () => {
    if (window.Telegram) {
      window.Telegram.WebApp.close();
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Content>
          {isWin ? (
            <Styled.Image src="/win.png" />
          ) : (
            <Styled.Image src="/loose.png" />
          )}

          {children && <Styled.SubTitle>{children}</Styled.SubTitle>}
        </Styled.Content>
        <Styled.Actions>
          <Styled.Btn typeBtn="red" onClick={playAgain}>
            Играть еще раз
          </Styled.Btn>

          <Styled.Btn typeBtn="white" onClick={handleBack}>
            Вернуться в бот
          </Styled.Btn>
        </Styled.Actions>
      </Styled.Container>
    </Styled.Wrapper>
  );
};
