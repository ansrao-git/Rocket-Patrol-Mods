// Anish Rao

// Implement the 'FIRE' UI text from the original game (10)
// Track a high score that persists across scenes and display it in the UI (10)
// Implement a simultaneous two-player mode (25)
// Implement the speed increase that happens after 30 seconds in the original game (10)
// Display the time remaining (in seconds) on the screen (15)
// Implement parallax scrolling (15)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (25)




let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
    // loads the menu and then play
};


let scoreConfig = {
    fontFamily: 'Courier' ,
    fontSize: '28px' ,
    backgroundColor: '#F3B141' ,
    color: '#843605' ,
    align: 'right' ,
    padding: {
        top: 5 ,
        botom: 5 ,
    },
    fixedWidth: 100
}

let game = new Phaser.Game(config);

// to persist across scenes

let keyLEFT, keyRIGHT, keyA , keyD, keyW , keyUP;
let highScore = 0;
let rocketControl = false;

// default game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
    mode: 0
}