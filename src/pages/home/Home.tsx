import React, { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import clsx from 'clsx';

import { Welcome } from '../../widgets/welcome';
import { Result } from '../../widgets/result';

import { PhaserGame } from '../../features/game/PhaserGame';
import { useWindowSize } from 'usehooks-ts';

import { useUuidMutation } from '../../entities/game/api';

import * as Styled from './Home.styled';

const Home = () => {
  const { width, height } = useWindowSize();
  const phaserRef = useRef<HTMLDivElement>(null);

  const { useSendUuid, data: uuidData, isLoading, isError } = useUuidMutation();

  const [uuid, setUuid] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isTest, setIsTest] = useState(false);

  const [isStartGame, setStartGame] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    window.Telegram.WebApp.expand();

    const parsed = queryString.parse(location.search);

    if (parsed?.user) {
      const user = Array.isArray(parsed.user) ? parsed.user[0] : parsed.user;

      if (user) {
        setUser(user);
      }
    }

    if (parsed?.uuid) {
      const uuid = Array.isArray(parsed.uuid) ? parsed.uuid[0] : parsed.uuid;

      if (uuid) {
        setUuid(uuid);
        useSendUuid({ uuid });
      }
    }

    if (parsed?.test) {
      const test = Array.isArray(parsed.test) ? parsed.test[0] : parsed.test;

      if (test) {
        setIsTest(true);
      } else {
        setIsTest(false);
      }
    }
  }, []);

  const [finished, setFinished] = useState(false);

  const handleStart = () => {
    setStartGame(true);
  };

  const handleGameOver = (points: number, uuid: string | null) => {
    setPoints(points);
    setFinished(true);

    setUuid(uuid);

    if (uuid) {
      useSendUuid({ uuid });
    }
  };

  const handlePlayAgain = () => {
    setFinished(false);
  };

  if (isLoading) {
    return (
      <Styled.Wrapper>
        <Styled.LoaderWrapper>
          <Styled.Loader></Styled.Loader>
        </Styled.LoaderWrapper>
      </Styled.Wrapper>
    );
  }

  if (isError) {
    return (
      <Styled.Wrapper>
        <Result isEmpty={true}></Result>
      </Styled.Wrapper>
    );
  }

  if (uuidData?.lives === 0) {
    return (
      <Styled.Wrapper>
        <Result isEmpty={true}></Result>
      </Styled.Wrapper>
    );
  }

  return (
    <Styled.Wrapper>
      {isStartGame ? (
        finished ? (
          <Result isEmpty={uuid === null} playAgain={handlePlayAgain}>
            {points}
          </Result>
        ) : (
          <PhaserGame
            ref={phaserRef}
            width={width}
            height={height}
            lives={999}
            userid={user}
            uuid={uuid}
            isTest={isTest}
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
