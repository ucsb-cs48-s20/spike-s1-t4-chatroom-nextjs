import Phaser from 'phaser';
import GameScene from '/static/gameScene.js';

let gameScene = new GameScene();

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: updaate
    }
};

let game = new Phaser.Game(config);

game.scene.add('gameScene', gameScene);
game.scene.start('gameScene');
