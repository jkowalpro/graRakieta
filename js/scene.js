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
    this.background = this.add.image(256 / 2, 272 / 2, "bg");
    this.ship = this.add.image(100, 200, "ship");
    this.rakietap1 = this.add.image(200, 150, "rakietap1");
    this.rakietap2 = this.add.image(200, 100, "rakietap1");
    this.rakietas1 = this.add.sprite(150, 100, "rakietas1");

    this.anims.create({
      key: "ship_anim",
      frames: this.anims.generateFrameNumbers("rakietas1"),
      frameRate: 20,
      repeat: -1
    });
    this.rakietas1.play("ship_anim");

    this.keys = this.input.keyboard.createCursorKeys();
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
  }
}
