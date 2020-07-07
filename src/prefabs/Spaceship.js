// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene , x , y , texture , frame, pointValue) {
        super(scene , x , y , texture , frame);
        // add object to existing scene
        scene.add.existing(this); // add to xisiting, displayList, updateList
        this.points = pointValue; // stories pointValue
    }

    update() {
        this.x -= game.settings.spaceshipSpeed;
        // move spaceship left
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
       
    }

    reset() {
        this.x = game.config.width;
    }
}