// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { forwardRef, useLayoutEffect, useRef, useEffect } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';
import {
  useLivesMutation,
  useScoreMutation,
  useLevelMutation,
} from '../../entities/game/api';

import * as Styled from './PhaserGame.styled';

type PhaserGameProps = {
  width: any;
  height: any;
  userid?: string;
  uuid?: string | null;
  isTest?: boolean;
  lives: number;
  onGameOver: (points: number, uuid: string | null) => void;
};

export const PhaserGame = forwardRef(function PhaserGame<
  TValue extends object,
  Multiple extends boolean,
>(props: PhaserGameProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const game = useRef();

  const { useSendLives } = useLivesMutation();
  const { useSendScore, data: scoreData } = useScoreMutation();
  const { useSendLevel, data: levelData } = useLevelMutation();

  const resize = (config: any) => {
    const canvas = document.querySelector('canvas');

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = config.width / config.height;

    if (windowRatio < gameRatio) {
      canvas.style.width = `${windowWidth}px`;
      canvas.style.height = `${windowWidth / gameRatio}px`;
    } else {
      canvas.style.width = `${windowHeight * gameRatio}px`;
      canvas.style.height = `${windowHeight}px`;
    }
  };

  useLayoutEffect(() => {
    if (game.current === undefined) {
      game.current = StartGame('game-container', {
        width: props.width,
        height: props.height,
      });

      game.current.lives = props.lives;

      if (ref !== null) {
        ref.current = { game: game.current, scene: null };
      }

      resize(game.current.config);
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        game.current = undefined;
      }
    };
  }, [ref]);

  const handleSendScore = async (game) => {
    return await useSendScore({
      userid: props.userid,
      level: game.level,
      score: props.isTest ? 0 : game.points,
    });
  };

  useEffect(() => {
    EventBus.on('game-over', (game) => {
      if (props.userid) {
        handleSendScore(game).then((res) => {
          props.onGameOver(game.points, res.uuid);
        });
      }
    });

    EventBus.on('life-lost', (leftLives: number) => {
      if (props.uuid) {
        useSendLives({ uuid: props.uuid, lives: leftLives });
      }
    });

    EventBus.on('level-passed', (level: number, time: number, item: string) => {
      if (props.uuid) {
        useSendLevel({
          uuid: props.uuid,
          passLevel: level,
          passTime: time,
          userid: props.userid,
          item: item,
        });
      }
    });

    EventBus.on('game-started', (game) => {
      const extension = document.querySelector('.tp-dfwv');

      if (extension) {
        extension.remove();
      }
    });

    return () => {
      EventBus.removeListener('game-over');
      EventBus.removeListener('life-lost');
      EventBus.removeListener('level-passed');
      EventBus.removeListener('game-started');
    };
  }, [ref]);

  return <Styled.Container id="game-container"></Styled.Container>;
});
