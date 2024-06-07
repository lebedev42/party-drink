import { Scene } from 'phaser';

class BootScene extends Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.json('assets', './assets/assets.json');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('crate', 'assets/crate.png');
    this.load.image('table', 'assets/table.png');
    this.load.image('item-1', 'assets/item-1.png');
    this.load.image('item-2', 'assets/item-2.png');
    this.load.image('item-3', 'assets/item-3.png');
    this.load.image('item-4', 'assets/item-4.png');
    this.load.image('item-5', 'assets/item-5.png');
    this.load.image('item-6', 'assets/item-6.png');
  }

  create() {
    this.scene.start('loading');
  }
}

export default BootScene;
