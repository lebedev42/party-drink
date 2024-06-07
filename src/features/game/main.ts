import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import LoadingScene from './scenes/LoadingScene';
import GameScene from './scenes/GameScene';
import options from './constants/options';

const config = {
  type: Phaser.CANVAS,
  parent: 'game-container',
  // width: 1170,
  // height: 2532,
  width: 750,
  height: 1334,
  // backgroundColor: '#FFC46C',
  // transparent: true,
  scene: [BootScene, LoadingScene, GameScene],
};

const StartGame = (parent: any, size: any) => {
  const gameConfig = {
    ...config,
    width: size.width * 2,
    height: size.height * 2,
    roundPixels: false,
    antialias: true,
    parent,
    mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    physics: {
      default: 'matter',
      matter: {
        // gravity: {
        //   y: options.gravity,
        //   x: 0,
        // },
      },
    },
  };

  return new Phaser.Game(gameConfig);
};

export default StartGame;
