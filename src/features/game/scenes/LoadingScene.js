import { Scene } from 'phaser';

class LoadingScene extends Scene {
  constructor() {
    super('loading');
  }

  preload() {
    this.loadAssets(this.cache.json.get('assets'));

    this.load.once('complete', () => {
      this.scene.start('game');
    });
  }

  loadAssets(json) {
    Object.keys(json).forEach((key) => {
      this.load.image(key, `./assets/${json[key]}`);
    });
  }
}

export default LoadingScene;
