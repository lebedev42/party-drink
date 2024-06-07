import React, { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';

import { Welcome } from '../../widgets/welcome';
import { Result } from '../../widgets/result';

import { PhaserGame } from '../../features/game/PhaserGame';
import { useWindowSize } from 'usehooks-ts';

import * as Styled from './Home.styled';

const Home = () => {
  const { width, height } = useWindowSize();
  const phaserRef = useRef<HTMLDivElement>(null);

  const [uuid, setUuid] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isTest, setIsTest] = useState(false);

  const [isStartGame, setStartGame] = useState(false);

  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    window.Telegram.WebApp.expand();

    const parsed = queryString.parse(location.search);

    if (parsed?.user) {
      const user = Array.isArray(parsed.user) ? parsed.user[0] : parsed.user;

      if (user) {
        setUser(user);
      }
    }
  }, []);

  const [finished, setFinished] = useState(false);

  const handleStart = () => {
    setStartGame(true);
  };

  const handleGameOver = (isWin: boolean) => {
    setFinished(true);
    setIsWin(isWin);
  };

  const handlePlayAgain = () => {
    setFinished(false);
  };

  return (
    <Styled.Wrapper>
      {isStartGame ? (
        finished ? (
          <Result isWin={isWin} playAgain={handlePlayAgain}>
            {isWin
              ? 'Супер! Вы построили отличную вечериночную башню. Вернитесь в бот, чтобы узнать о том, как получить приз'
              : 'Было близко! Попробуйте собрать до 15-ти напитков в башню, чтобы получить бесплатный шот на баре'}
          </Result>
        ) : (
          <PhaserGame
            ref={phaserRef}
            width={width}
            height={height}
            userid={user}
            onGameOver={handleGameOver}
          />
        )
      ) : (
        <Welcome handleStart={handleStart} />
      )}
    </Styled.Wrapper>
  );
};

export default Home;
