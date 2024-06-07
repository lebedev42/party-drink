// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { forwardRef, useLayoutEffect, useRef, useEffect } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';
import { useScoreMutation } from '../../entities/game/api';

import * as Styled from './PhaserGame.styled';

type PhaserGameProps = {
  width: any;
  height: any;
  userid?: string;
  onGameOver: (isWin: boolean) => void;
};

export const PhaserGame = forwardRef(function PhaserGame<
  TValue extends object,
  Multiple extends boolean,
>(props: PhaserGameProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const game = useRef();

  const { useSendScore, data: scoreData } = useScoreMutation();

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

  const handleSendScore = async (isWin: boolean) => {
    return await useSendScore({
      userid: props.userid,
      win: isWin,
    });
  };

  useEffect(() => {
    EventBus.on('game-over', (isWin: boolean) => {
      props.onGameOver(isWin);

      if (props.userid) {
        handleSendScore(isWin).then((res) => {
          console.error('res', res);
        });
      }
    });

    return () => {
      EventBus.removeListener('game-over');
    };
  }, [ref]);

  return <Styled.Container id="game-container"></Styled.Container>;
});
