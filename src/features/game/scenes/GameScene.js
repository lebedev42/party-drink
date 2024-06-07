import Phaser, { Scene } from 'phaser';
import options from '../constants/options';
import { EventBus } from '../EventBus';
import sample from 'lodash.sample';

const items = [
  {
    id: 1,
    target: 'item-1',
  },
  {
    id: 2,
    target: 'item-2',
  },
  {
    id: 3,
    target: 'item-3',
  },
  {
    id: 4,
    target: 'item-4',
  },
  {
    id: 5,
    target: 'item-5',
  },
  {
    id: 6,
    target: 'item-6',
  },
];

const getNextItem = (level, previousItemId) => {
  const randomItem = sample(items);

  if (previousItemId && randomItem.id === previousItemId) {
    return getNextItem(level, previousItemId);
  }

  const config = {
    id: randomItem.id,
    target: randomItem.target,
  };

  return config;
};

class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
    this.item = null;

    this.lastCrate = null;
  }

  create(params) {
    this.item = getNextItem(this.level, 1);

    this.matter.world.update30Hz();
    this.canDrop = true;
    this.timer = 0;
    this.timerEvent = null;
    this.addSky();
    this.addGround();
    this.addMovingCrate(params);

    this.crateGroup = this.add.group();
    this.matter.world.on('collisionstart', this.checkCollision, this);
    this.setCameras();
    this.input.on('pointerdown', this.dropCrate, this);
  }

  addSky() {
    this.sky = this.add.sprite(0, 0, 'sky');
    this.sky.displayWidth = this.sys.game.config.width;
    this.sky.displayOriginX = 0;
  }

  setCameras() {
    this.actionCamera = this.cameras.add(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
    );

    this.cameras.main.setBounds(0, 0, this.sys.game.config.width, 0);
    this.cameras.main.startFollow(this.actionCamera, true);
    this.cameras.main.ignore([this.ground, this.movingCrate]);
  }

  addGround() {
    this.ground = this.matter.add.sprite(
      this.game.config.width / 2,
      this.game.config.height,
      'table',
    );
    this.ground.setBody({
      type: 'rectangle',
      width: this.ground.displayWidth,
      height: this.ground.displayHeight * 2,
    });
    this.ground.setOrigin(0.5, 1);
    this.ground.setStatic(true);
  }

  addMovingCrate(params) {
    this.movingCrate = this.add.sprite(
      this.game.config.width / 2 - options.crateRange[0],
      this.ground.y - this.game.config.height,
      this.item.target,
    );
    this.movingCrate.setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: this.movingCrate,
      x: this.game.config.width / 2 - options.crateRange[1],
      duration: options.crateSpeed,
      yoyo: true,
      repeat: -1,
    });
  }

  checkCollision(e, b1, b2) {
    if (b1.isCrate && !b1.hit) {
      b1.hit = true;
      b1.isStatic = true;

      if (b1.gameObject.texture.key === this.lastCrate?.texture?.key) {
        this.nextCrate();
      } else {
        this.crateGroup.getChildren().forEach((item) => {
          item.body.isStatic = false;
        });
      }
    }
    if (b2.isCrate && !b2.hit) {
      b2.hit = true;
      b2.isStatic = true;

      if (
        !this.lastCrate?.texture?.key ||
        b1.gameObject.texture.key === this.lastCrate?.texture?.key
      ) {
        this.nextCrate();
      } else {
        this.crateGroup.getChildren().forEach((item) => {
          item.body.isStatic = false;

          this.actionCamera.centerOn(
            this.game.config.width / 2,
            this.game.config.height / 2,
          );
        });
      }
    }
  }

  dropCrate() {
    if (this.canDrop) {
      this.addTimer();
      this.canDrop = false;
      this.movingCrate.visible = false;

      this.addFallingCrate();
    }
  }
  update() {
    this.crateGroup.getChildren().forEach(function (crate) {
      if (crate.y > this.game.config.height + crate.displayHeight) {
        if (!crate.body.hit) {
          this.nextCrate();
        }
        crate.destroy();
      }
    }, this);
  }
  addTimer() {
    if (this.timerEvent == null) {
      this.timerEvent = this.time.addEvent({
        delay: 1000,
        callback: this.tick,
        callbackScope: this,
        loop: true,
      });
    }
  }
  addFallingCrate() {
    let fallingCrate = this.matter.add.sprite(
      this.movingCrate.x,
      this.movingCrate.y,
      this.item.target,
    );

    fallingCrate.body.isCrate = true;
    fallingCrate.body.hit = false;
    this.crateGroup.add(fallingCrate);
    this.cameras.main.ignore(fallingCrate);
  }
  nextCrate() {
    this.zoomCamera();
    this.canDrop = true;
    this.movingCrate.visible = true;

    const lastCrate =
      this.crateGroup.getChildren()[this.crateGroup.getChildren().length - 1];

    this.item = getNextItem(this.level, this.item.id);
    this.movingCrate.setTexture(this.item.target);
    this.movingCrate.y = lastCrate.y - this.game.config.height / 2;
  }
  zoomCamera() {
    const lastCrate =
      this.crateGroup.getChildren()[this.crateGroup.getChildren().length - 1];

    this.lastCrate = lastCrate;

    if (lastCrate.y < this.game.config.height / 2) {
      this.actionCamera.centerOn(this.game.config.width / 2, lastCrate.y);
    }
  }

  tick() {
    this.timer++;
  }

  removeCrate() {
    if (this.crateGroup.getChildren().length > 0) {
      this.crateGroup.getFirstAlive().destroy();
    } else {
      this.removeEvent.remove();
      this.scene.start('game');
    }
  }
}

export default GameScene;
