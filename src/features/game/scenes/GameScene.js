import Phaser, { Scene } from 'phaser';
import options from '../constants/options';
import { EventBus } from '../EventBus';
import sample from 'lodash.sample';

const levels = [
  {
    id: 1,
    target: 'wing',
    rotationSpeed: 3,
  },
  {
    id: 2,
    target: 'leg',
    rotationSpeed: 3,
  },
  {
    id: 3,
    target: 'onion',
    rotationSpeed: 3,
  },
  {
    id: 4,
    target: 'tomato',
    rotationSpeed: 3,
  },
  {
    id: 5,
    target: 'zucchini',
    rotationSpeed: 3,
  },
  {
    id: 6,
    target: 'steak',
    rotationSpeed: 3,
  },
  {
    id: 7,
    target: 'tofu',
    rotationSpeed: 3,
  },
  {
    id: 8,
    target: 'mushroom',
    rotationSpeed: 3,
  },
];

const getLevelConfig = (level, previousLevelId) => {
  const randomLevel = sample(levels);

  if (previousLevelId && randomLevel.id === previousLevelId) {
    return getLevelConfig(level, previousLevelId);
  }

  const config = {
    id: randomLevel.id,
    target: randomLevel.target,
    rotationSpeed: randomLevel.rotationSpeed,
  };

  if (level <= 2) {
    // 1-2 уровень — 6 шампура
    config.attemts = 6;
  } else if (level > 2 && level <= 4) {
    // 3-4 уровень — 8 шампуров
    config.attemts = 8;
  } else if (level > 4 && level <= 7) {
    // 5-7 уровень — 10 шампуров (уже сложно)
    config.attemts = 10;
  } else if (level > 7 && level <= 9) {
    // 8-9 — 12 шампуров
    config.attemts = 12;
  } else {
    // 10-11 — 14 шампуров. максимальное далее на всех уровнях только 14
    config.attemts = 14;
  }

  return config;
};

class GameScene extends Scene {
  constructor() {
    super('game');

    this.points = 0;
    this.startTime = 0;
  }

  create(params) {
    this.canThrow = true;

    this.knifeGroup = this.add.group();
    this.knife = this.add.sprite(
      this.sys.game.config.width / 2,
      (this.sys.game.config.height / 5) * 4,
      'knife',
    );
    this.knife.depth = 1;

    this.hit = 0;

    this.level = params.level || 1;
    this.levelConfig = getLevelConfig(this.level, params.levelId);

    this.rotationSpeed = this.levelConfig.rotationSpeed;

    this.target = this.add.sprite(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 3,
      this.levelConfig.target,
    );
    this.target.depth = 1;

    this.input.on('pointerdown', this.throwKnife, this);

    this.attemtsGroup = this.add.group();

    for (let i = 0; i < this.levelConfig.attemts; i++) {
      const attemt = this.add.sprite(0, 0, 'attemt').setOrigin(1, 1);

      this.attemtsGroup.add(attemt);
    }

    this.lifesGroup = this.add.group();

    for (let i = 0; i < this.sys.game.lives; i++) {
      const life = this.add.sprite(0, 0, 'life');

      this.lifesGroup.add(life);
    }

    this.zone = this.add.zone(
      0,
      0,
      this.sys.game.config.width,
      this.sys.game.config.height,
    );
    this.zone.setOrigin(0, 0);

    const childrenAttemts = this.attemtsGroup.getChildren();

    for (let i = 0; i < childrenAttemts.length; i++) {
      let baseOffset = -20;
      let offsetX = 0;

      if (i === 0) {
        offsetX = baseOffset;
      } else {
        offsetX = -i * 20 + baseOffset;
      }

      Phaser.Display.Align.In.TopRight(
        childrenAttemts[i],
        this.zone,
        offsetX,
        -20,
      );
    }

    const childrenLifes = this.lifesGroup.getChildren();

    for (let i = 0; i < childrenLifes.length; i++) {
      let baseOffset = -20;
      let offsetX = 0;

      if (i === 0) {
        offsetX = baseOffset;
      } else {
        offsetX = -i * 50 + baseOffset;
      }

      Phaser.Display.Align.In.TopLeft(
        childrenLifes[i],
        this.zone,
        offsetX,
        -20,
      );
    }

    this.pointsText = this.add.text(100, 100, this.points, {
      fontFamily: 'Euclid',
      fontSize: '40px',
      fill: '#000',
    });

    Phaser.Display.Align.In.TopCenter(this.pointsText, this.zone, 0, -20);

    this.anims.create({
      key: 'fire',
      frames: [
        { key: 'flame1' },
        { key: 'flame2' },
        { key: 'flame3' },
        { key: 'flame4' },
      ],
      frameRate: 8,
      repeat: -1,
    });

    this.flame = this.add.sprite(0, 0, 'flame1');
    this.flame.depth = 0;
    this.flame.setOrigin(0.5, 1);
    this.flame.scale = 0.5;

    Phaser.Display.Align.In.BottomCenter(this.flame, this.zone);

    this.flame.play('fire');

    this.anims.create({
      key: 'bright',
      frames: [
        { key: 'star1' },
        { key: 'star2' },
        { key: 'star3' },
        { key: 'star4' },
        { key: 'star5' },
        { key: 'star6' },
        { key: 'star7' },
        { key: 'star8' },
      ],
      frameRate: 12,
      repeat: -1,
    });

    this.star = this.add.sprite(0, 0, 'star1');
    this.star.depth = 2;
    this.star.setOrigin(0.5, 1);

    Phaser.Display.Align.In.TopRight(this.star, this.knife, 35, 0);

    this.star.play('bright');

    this.startTime = this.scene.scene.time.now;
    EventBus.emit('game-started');
  }

  update() {
    this.target.angle += this.rotationSpeed;

    const children = this.knifeGroup.getChildren();

    for (let i = 0; i < children.length; i++) {
      children[i].angle += this.rotationSpeed;

      const radians = Phaser.Math.DegToRad(children[i].angle + 90);

      children[i].x =
        this.target.x + (this.target.width / 2) * Math.cos(radians);
      children[i].y =
        this.target.y + (this.target.width / 2) * Math.sin(radians);
    }
  }

  throwKnife() {
    if (!this.canThrow) {
      return;
    }

    this.star.stop('bright');
    this.star.setVisible(false);

    this.canThrow = false;
    this.tweens.add({
      targets: [this.knife],
      y: this.target.y + this.target.width / 2,
      duration: options.throwSpeed,
      callbackScope: this,
      onComplete: this.onCompleteThrowKnife,
    });
  }

  updateRotationSpeed() {
    const childrenAttemts = this.attemtsGroup.getChildren();

    if (
      this.levelConfig.target === 'wing' ||
      this.levelConfig.target === 'leg'
    ) {
      // единая скорость, средняя, объект двигается в одну сторону

      this.rotationSpeed = 3;
    }

    if (
      this.levelConfig.target === 'onion' ||
      this.levelConfig.target === 'zucchini'
    ) {
      // скорость меняется один раз от средней к быстрой при половине воткнутых шампуров.
      // объект двигается в одну сторону

      if (this.levelConfig.attemts / 2 > childrenAttemts.length) {
        this.rotationSpeed = 4;
      } else {
        this.rotationSpeed = 3;
      }
    }

    if (
      this.levelConfig.target === 'steak' ||
      this.levelConfig.target === 'tofu'
    ) {
      // единая скорость средняя объект меняет сторону движения при половине воткнутых шампурах

      this.rotationSpeed = 3;

      if (this.levelConfig.attemts / 2 > childrenAttemts.length) {
        this.rotationSpeed = this.rotationSpeed * -1;
      }
    }

    if (
      this.levelConfig.target === 'mushroom' ||
      this.levelConfig.target === 'tomato'
    ) {
      // скорость чередуется: средняя — быстрая — средняя с каждым воткнутым шампуром.
      // Меняет направление вращения при половине воткнутых шампурах

      const currentSpeed =
        this.rotationSpeed < 0 ? this.rotationSpeed * -1 : this.rotationSpeed;

      if (currentSpeed === 3) {
        this.rotationSpeed = 4;
      } else {
        this.rotationSpeed = 3;
      }

      if (this.levelConfig.attemts / 2 > childrenAttemts.length) {
        this.rotationSpeed = this.rotationSpeed * -1;
      }
    }
  }

  onCompleteThrowKnife() {
    let legalHit = true;
    const children = this.knifeGroup.getChildren();

    for (let i = 0; i < children.length; i++) {
      const isSameAngle =
        Math.abs(
          Phaser.Math.Angle.ShortestBetween(
            this.target.angle,
            children[i].impactAngle,
          ),
        ) < options.minAngle;

      if (isSameAngle) {
        legalHit = false;
        break;
      }
    }

    const childrenAttemts = this.attemtsGroup.getChildren();

    this.attemtsGroup.remove(
      childrenAttemts[childrenAttemts.length - 1],
      true,
      true,
    );

    this.updateRotationSpeed();

    if (legalHit) {
      this.canThrow = true;

      const knife = this.add.sprite(this.knife.x, this.knife.y, 'knife');

      this.star.setVisible(true);
      this.star.play('bright');

      knife.impactAngle = this.target.angle;

      this.knifeGroup.add(knife);
      this.knife.y = (this.sys.game.config.height / 5) * 4;

      this.hit += 1;

      this.points += this.level * 2;

      this.pointsText.text = this.points;

      if (this.hit === this.levelConfig.attemts) {
        this.scene.start('game', {
          level: this.level + 1,
          levelId: this.levelConfig.id,
        });

        const endTime = this.scene.scene.time.now;
        const levelTime = endTime - this.startTime;

        EventBus.emit('level-passed', this.level, levelTime.toFixed(0));
      }
    } else {
      this.tweens.add({
        targets: [this.knife],
        y: this.sys.game.config.height + this.knife.height,
        rotation: 5,
        duration: options.throwSpeed * 4,
        callbackScope: this,
        onComplete: () => {
          this.scene.start('game', {
            level: this.level,
            levelId: this.levelConfig.id,
          });
          this.sys.game.lives -= 1;

          EventBus.emit('life-lost', this.sys.game.lives);

          if (this.sys.game.lives <= 0) {
            EventBus.emit('game-over', this);
          }
        },
      });
    }
  }
}

export default GameScene;
