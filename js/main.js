var gamePrefs=
{
    PLAYER_ACCELERATION:20,
    PLAYER_MAX_SPEED:75,
    PLAYER_MAXRUN_SPEED:120,
    PLAYER_JUMP_FORCE:-250,
    BULLET_SPEED:-100,
    ENEMY_SPEED:20,
    ENEMY_MAXHP:2,
    PLAYER_MAXHP:5,

    level1Width: 320*16,
    level1Height: 27*16
}

var config = 
{
    type: Phaser.AUTO,
    width: 256,
    height: 256,
    scene:[gameState], //array con las escenas
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
            gravity:{y:9.81 * 75}
        },
    }
};

var juego = new Phaser.Game(config);