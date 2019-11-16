import Phaser from "phaser";

export default class Endgame extends Phaser.Scene {
  constructor() {
    super("Koniecgry");
  }
  create() {
    this.textLabel = this.add.text(75, 140, "koniec gry");
  }
}
