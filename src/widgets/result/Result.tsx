import React from 'react';
import * as Styled from './Result.styled';

interface ResultProps {
  isEmpty?: boolean;
  playAgain?: () => void;
  children?: React.ReactNode;
}

export const Result: React.FC<ResultProps> = ({
  isEmpty,
  playAgain,
  children,
}) => {
  const handleBack = () => {
    if (window.Telegram) {
      window.Telegram.WebApp.close();
    }
  };

  const openLink = () => {
    window.Telegram.WebApp.openLink(
      'https://samokat.go.link/promocategory/2c80b0ec-0728-485d-80fb-2da57f222b4a?showcaseType=MINIMARKET&adj_t=10oehtvh&adj_campaign=leto_samokat_bot&adj_adgroup=frov_meat',
    );
  };

  return (
    <Styled.Container>
      <Styled.Content>
        {isEmpty ? (
          <Styled.Image src="/no-attemts.png" />
        ) : (
          <Styled.Image src="/win.png" />
        )}

        <Styled.Title>Игра завершена!</Styled.Title>
        {children && <Styled.SubTitle>Твой счет: {children}</Styled.SubTitle>}
      </Styled.Content>
      <Styled.Actions>
        {isEmpty ? (
          <Styled.Btn typeBtn="white" onClick={openLink}>
            Получить еще попытки
          </Styled.Btn>
        ) : (
          <Styled.Btn typeBtn="white" onClick={playAgain}>
            Играть еще раз
          </Styled.Btn>
        )}

        <Styled.Btn typeBtn="red" onClick={handleBack}>
          Вернуться в бот
        </Styled.Btn>
      </Styled.Actions>
    </Styled.Container>
  );
};
