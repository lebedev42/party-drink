import Phaser, { Scene } from 'phaser';
import options from '../constants/options';
import { EventBus } from '../EventBus';
import sample from 'lodash.sample';

const items = [
  {
    id: 1,
    target: 'item-1',
    offset: 10,
  },
  {
    id: 2,
    target: 'item-2',
    offset: 20,
  },
  {
    id: 3,
    target: 'item-3',
    offset: 10,
  },
  {
    id: 4,
    target: 'item-4',
    offset: 10,
  },
  {
    id: 5,
    target: 'item-5',
    offset: 10,
  },
  {
    id: 6,
    target: 'item-6',
    offset: 20,
  },
  {
    id: 7,
    target: 'item-7',
    offset: 10,
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

    // this.pointsText = this.add.text(10, 10, '0', {
    //   fontFamily: 'Euclid',
    //   fontSize: '70px',
    //   fill: '#FFFFFF',
    // });

    // Phaser.Display.Align.To.TopCenter(
    //   this.pointsText,
    //   this.matter.world,
    //   0,
    //   20,
    // );
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
      height: this.ground.displayHeight + 50,
    });
    this.ground.setOrigin(0.5, 1);
    this.ground.setStatic(true);
  }

  addMovingCrate(params) {
    this.movingCrate = this.add.sprite(
      this.game.config.width / 2 - options.crateRange[0],
      this.ground.y - this.game.config.height + 200,
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

  updatePoints() {
    const cratesCount = this.crateGroup.getChildren().length;

    // this.pointsText.text = cratesCount;

    if (cratesCount >= 15) {
      setTimeout(() => {
        EventBus.emit('game-over', true);
      }, 800);
    }
  }

  checkCollision(e, b1, b2) {
    if (b1.isCrate && !b1.hit) {
      b1.hit = true;
      b1.isStatic = true;

      if (b1.gameObject.texture.key === this.lastCrate?.texture?.key) {
        this.nextCrate();
        this.updatePoints();
      } else {
        this.crateGroup.getChildren().forEach((item) => {
          // item.body.isStatic = false;
        });

        this.actionCamera.centerOn(
          this.game.config.width / 2,
          this.game.config.height / 2,
        );

        setTimeout(() => {
          EventBus.emit('game-over', false);
        }, 1500);
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
        this.updatePoints();
      } else {
        this.crateGroup.getChildren().forEach((item) => {
          // item.body.isStatic = false;
        });

        this.actionCamera.centerOn(
          this.game.config.width / 2,
          this.game.config.height / 2,
        );

        setTimeout(() => {
          EventBus.emit('game-over', false);
        }, 1500);
      }
    }
  }

  dropCrate() {
    if (this.canDrop) {
      this.canDrop = false;
      this.movingCrate.visible = false;

      this.addFallingCrate();
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
    this.movingCrate.y =
      lastCrate.y -
      this.game.config.height / 2 +
      this.movingCrate.displayHeight;
  }

  zoomCamera() {
    const lastCrate =
      this.crateGroup.getChildren()[this.crateGroup.getChildren().length - 1];

    this.lastCrate = lastCrate;

    if (lastCrate.y < this.game.config.height / 2) {
      this.actionCamera.centerOn(this.game.config.width / 2, lastCrate.y);
    }
  }
}

export default GameScene;
