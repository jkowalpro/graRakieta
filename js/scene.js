import Phaser from "phaser";

export default class Scene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.spritesheet("rakietas1", "assets/rakietas1.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.image("bg", "assets/bg.png");
    this.load.image("ship", "assets/ship.png");
    this.load.image("rakietap1", "assets/rakietap1.png");
  }

  create() {
    this.kDownShip2 = 1;
    this.kDownShip3 = 1;
    this.background = this.add.image(256 / 2, 272 / 2, "bg");
    this.ship = this.physics.add.image(100, 200, "ship");
    this.rakietap1 = this.physics.add.image(200, 150, "rakietap1");
    this.rakietap2 = this.physics.add.image(200, 100, "rakietap1");
    this.rakietas1 = this.physics.add.sprite(150, 100, "rakietas1");

    this.anims.create({
      key: "ship_anim",
      frames: this.anims.generateFrameNumbers("rakietas1"),
      frameRate: 20,
      repeat: -1
    });
    this.rakietas1.play("ship_anim");

    this.keys = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(
      this.ship,
      this.rakietap1,
      this.zderzenie,
      null,
      this
    );
  }

  update() {
    let speed = 1.5;

    if (this.keys.left.isDown) {
      this.ship.x = this.ship.x - speed;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    }
    if (this.keys.right.isDown) {
      this.ship.x = this.ship.x + speed;
      if (this.ship.x > 256) {
        this.ship.x = 256;
      }
    }
    if (this.keys.up.isDown) {
      this.ship.y = this.ship.y - speed;
      this.ship.flipY = false;
      if (this.ship.y < 0) {
        this.ship.y = 0;
      }
    }
    if (this.keys.down.isDown) {
      this.ship.y = this.ship.y + speed;
      this.ship.flipY = true;
      if (this.ship.y > 272) {
        this.ship.y = 272;
      }
    }

    if (this.kDownShip2 === 1) {
      this.rakietap1.y = this.rakietap1.y + 1.4;
    } else {
      this.rakietap1.y = this.rakietap1.y - 1.4;
    }

    if (this.rakietap1.y > 272) {
      this.kDownShip2 = 0;
      this.rakietap1.flipY = false;
    } else if (this.rakietap1.y < 0) {
      this.kDownShip2 = 1;
      this.rakietap1.flipY = true;
      this.rakietap1.x = Math.random() * 256;
    }

    if (this.kDownShip3 === 1) {
      this.rakietap2.y = this.rakietap2.y + 0.5;
    } else {
      this.rakietap2.y = this.rakietap2.y - 0.5;
    }

    if (this.rakietap2.y > 272) {
      this.kDownShip3 = 0;
      this.rakietap2.flipY = false;
    } else if (this.rakietap2.y < 0) {
      this.kDownShip3 = 1;
      this.rakietap2.flipY = true;
      this.rakietap2.x = Math.random() * 256;
    }
  }

  zderzenie() {
    this.scene.start("Koniecgry");
  }
}
