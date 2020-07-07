// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene , x , y , texture , frame, player) {
        super(scene , x , y , texture , frame);
        scene.add.existing(this);
        
        // add an object to existing scene
        this.isFiring = false;  
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.player = player;
       
    }

    update() {
        //player 1 movement
        if(!this.isFiring && this.player == 1){
            if(keyA.isDown && this.x >= 47){
                this.x -= 2;
            } else if (keyD.isDown && this.x <= 578){
                this.x +=2;
            }

        }
        // player 2 movement
        if(!this.isFiring && this.player == 2){
            if(keyLEFT.isDown && this.x >= 47){
                this.x -= 2;
            } else if (keyRIGHT.isDown && this.x <= 578){
                this.x +=2;
            }

        }
        

        // player1 fire
        if (Phaser.Input.Keyboard.JustDown(keyW) && this.player==1) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        //player 2 fire
        if(keyUP.isDown && this.player == 2) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        // if fired, move up
        if(this.isFiring && this.y >= 108){
            this.y -= 2;
        }
        //reset on miss
        if(this.y <= 108){
            this.isFiring = false;
            this.y = 431;
        }
    }
    // reset the rocket to ground
    reset(){
        this.isFiring = false;
        this.y = 431;
    }
  }