var gamePrefs=
{
    PLAYER_ACCELERATION:7, // 7
    PLAYER_MAX_SPEED:65, // 65
    PLAYER_MAXRUN_SPEED:150,
    PLAYER_JUMP_FORCE:-200, // -200
    BULLET_SPEED:-100,
    ENEMY_SPEED:20,
    ENEMY_MAXHP:2,
    PLAYER_MAXHP:5,
    yoshiJump:-150,
    yoshiJumpTime:300,

    level1Width: 320*16,
    level1Height: 27*16
}

var config = 
{
    type: Phaser.AUTO,
    width: 256,
    height: 256,
    scene:[ menu, gameState, uiScene  ], //array con las escenas
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            debug:true,
            gravity:{y:9.81 * 75}
        },
    }
};

var juego = new Phaser.Game(config);