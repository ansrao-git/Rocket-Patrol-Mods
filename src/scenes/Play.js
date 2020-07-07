class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // loading images and tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritsheet
        this.load.spritesheet('explosion' , './assets/explosion.png' ,
        {frameWidth: 64 , frameHeight: 32 , startFrame: 0 , endFrame: 9});
        
    }

    create() {
       
        // Parallax Scrolling
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        this.starfieldMed = this.add.tileSprite(0 , 160 , 640 , 480 , 'starfield').setScale(1 , .43).setOrigin(0,0);
        this.starfieldSmall = this.add.tileSprite(0 , 110 , 640 , 480 , 'starfield').setScale(1 , .25).setOrigin(0,0);

        // white rectangle border
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);
        
        // Add Player 1 Rocket
        this.p1Rocket = new Rocket(this , game.config.width / 3, 431 ,'rocket' , 0 , 1).setScale(.5 , .5).setOrigin(0 , 0);
        
       
        // Add Player 2 Rcoket  
        if(game.settings.mode == 1) {
            this.p2Rocket = new Rocket(this , game.config.width / 1.5 , 431 ,
                'rocket' , 0 , 2 , rocketControl). setScale(.5 , .5).setOrigin(0,0);
        }
        
        // Add Spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);
        
        //Define Keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        

        //animation config
        this.anims.create({
            key: 'explode' ,
            frames: this.anims.generateFrameNumbers('explosion' , {
                start: 0 , end: 9 , first: 0
            }),
            frameRate: 30
        });

        // scores
        this.p1Score = 0;
        this.p2Score = 0;

        // highScore 
        highScore = highScore;

        // timer 
        this.timeLeft = game.settings.gameTimer / 1000;
        scoreConfig.fixedWidth = 100;

        //fire
        this.fire = this.add.text(370 , 54 , 'Fire' , scoreConfig);
        // Player 1 Score Text
        this.scoreLeft = this.add.text(69 , 54 , this.p1Score , scoreConfig);

        // High Score Text
        
        this.hScore = this.add.text(game.config.width / 2 , 54 , highScore , scoreConfig).setOrigin(.5);
        this.hScoreText = this.add.text(game.config.width / 2 - 40 , 54 , 'High', scoreConfig).setOrigin(.5);

        // Player 2 Score Text
        this.scoreRight = this.add.text(476 , 54 , this.p2Score , scoreConfig);

        // set up how to draw timer
        this.timerCenter = this.add.text(game.config.width / 2 , 88 , this.timeLeft , scoreConfig).setOrigin(.5);
        this.timerLeftText = this.add.text(game.config.width / 2 - 40, 88 , 'Time' , scoreConfig).setOrigin(.5);

        // game over flag
        this.gameOver = false;

        // 30-second speed boost
       
        this.clock = this.time.delayedCall(30000 , () => {
            this.game.settings.spaceshipSpeed *= 2;
        }, null , this);

        
        scoreConfig.fixedWidth = 0;
        let countDown = this.time.addEvent({ delay: 1000, callback: decrementTimer, callbackScope: this, loop: true });
    }

    update() {
        if(this.timeLeft <= 0) {
            this.add.text(game.config.width / 2 , game.config.height / 2 , 'GAME OVER' , scoreConfig).setOrigin(.5);
            this.add.text(game.config.width / 2 , game.config.height / 2 + 64 , 'W to Restart or A for Menu' , scoreConfig).setOrigin(.5);
            this.gameOver = true;
        }

        // Update Highscore
        if(this.p1Score > highScore) {
            highScore = this.p1Score;
            this.hScore.text = highScore;
        }

        if(this.p2Score > highScore) {
            highScore = this.p2Score;
            this.hScore.text = highScore;
        }

        // Checking Key input for restart

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyW)) {
            this.game.settings.spaceshipSpeed /= 2;
            this.scene.restart(this.p1Score);
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("menuScene");
        }

        // scroll starfield for Parallax

        this.starfield.tilePositionX -= 4;
        this.starfieldMed.tilePositionX -= 2;
        this.starfieldSmall.tilePositionX -= 1;
        

        if(!this.gameOver) {
            this.p1Rocket.update();  // update rocket (x2)
            if(game.settings.mode == 1) {
                this.p2Rocket.update();
            }
            this.ship01.update();  // update ship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // Player 1 collision checking

        if(this.checkCollision(this.p1Rocket , this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03 , this.p1Rocket);
            
        }
        if(this.checkCollision(this.p1Rocket , this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02 , this.p1Rocket);
            
        }
        if(this.checkCollision(this.p1Rocket , this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01 , this.p1Rocket);
            
        }
   
        
        // player 2 collision checking
        if(game.settings.mode == 1) {
            if(this.checkCollision(this.p2Rocket , this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03 , this.p2Rocket);
                
            }
            if(this.checkCollision(this.p2Rocket , this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02 , this.p2Rocket);
                
            }
            if(this.checkCollision(this.p2Rocket , this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01 , this.p2Rocket);
                
            }
            
        }
    }

    checkCollision(rocket , ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
        
    }

    shipExplode(ship , rocket) {
        ship.alpha = 0;  // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x , ship.y , 'explosion').setOrigin(0,0);
        boom.anims.play('explode');  // play explode animation
        boom.on('animationcomplete' , () => {  // callback after animation completes
            ship.reset();  // reset ship position
            ship.alpha = 1;  // make ship visible again
            boom.destroy();  // remove explosion sprite
        });
        // score increment and repaint
        
        if(rocket.player == 1) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
            this.timeLeft += ship.points / 10;
            this.sound.play('sfx_explosion');
        }
        if(game.settings.mode == 1 && rocket.player == 2) {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
            this.timeLeft += ship.points / 10;
            this.sound.play('sfx_explosion');
        }
    }
}

function decrementTimer() {
    if(this.timeLeft > 0) {
        --this.timeLeft;
        this.timerCenter.text = this.timeLeft;
    }
}