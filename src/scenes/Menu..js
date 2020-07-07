class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio / sfx
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Menu Texts
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        this.add.text(centerX , centerY - textSpacer , 'ROCKET PATROL' , menuConfig).setOrigin(.5);
        this.add.text(centerX , centerY , 'Use A & D keys to move & (W) to Fire', menuConfig).setOrigin(.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX , centerY + textSpacer , 'Press A for Easy or D for Hard' , menuConfig).setOrigin(.5);
        this.add.text(centerX , centerY + textSpacer*1.75 , 'Press LEFT Arrow for 2 Player Mode!' , menuConfig).setOrigin(.5);
       

        
       

        //console.log(this);
       
    
        //define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        

        if(Phaser.Input.Keyboard.JustDown(keyA)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene"); 
        }

        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene"); 
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // 2 player mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                mode: 1
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene"); 
        }
        
        
    }
}