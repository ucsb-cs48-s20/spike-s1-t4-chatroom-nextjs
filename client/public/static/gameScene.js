import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "gameScene" });
    }

    preload() {
        console.log('check');
        this.load.image('background', '/assets/background.png');
    }
    
    create() {
        this.add.image(400, 300, 'background').setScale(5);
    }
}

export default GameScene;