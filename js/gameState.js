class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    { 
        //Carga assets en memoria
        this.cameras.main.setBackgroundColor("112"); 
        this.load.setPath('assets/img');
        this.load.image('bg','background_level1.png')
        this.load.image('grass_tile','grass_tile.png');
        //this.load.image('bg_frontal','background_frontal.png');
        this.load.spritesheet('mario','mario/little_mario.png',
        {frameWidth:16,frameHeight:22});
        //this.load.image('bullet','spr_bullet_0.png');

        this.load.setPath('assets/img/tilesets');
        this.load.image('tileset_ground','floor_tileset.png');

        this.load.setPath('assets/levels');
        this.load.tilemapTiledJSON('level1','level1.json');

    }
    GenerateMap()
    {
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        this.map.addTilesetImage('tileset_ground');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_ground','tileset_ground');
     
        
        this.map.setCollisionByExclusion([-1], true, true, 'layer_ground');
        this.map.createLayer('layer_ground_transparent','tileset_ground');
      
    }
    create()
    { 
        this.GenerateMap();
        this.loadAnimations();
        // this.bg = this.add.tileSprite(config.width*0.5,config.height,config.width,1024-136,'bg').setOrigin(0.5,1);
        //this.bg.setScrollFactor(0);
        
        this.mario = new mario(this,config.width*0.2,config.height*.5);

        this.cameras.main.startFollow(this.mario);
        this.cameras.main.setBounds(0,0,
            gamePrefs.level1Width,gamePrefs.level1Height);

    }

    loadAnimations()
    {
        /*
         0 -> IDLE
        1 -> LOOK_UP
        2 -> DUCK
        3 al 5 -> WALK
        6 al 8 -> RUN
        9 -> SKID
        10 -> PIPE
        11 -> JUMP
        12 -> FALL
        13 -> RUN JUMP
        14 al 17 -> SPIN JUMP
        18 -> SLIDe
        19 -> KICK
        20 al 22 -> SWIM
        23 VICTORY
        */
        this.anims.create(
        {
            key: 'walk',
            frames:this.anims.generateFrameNumbers('mario', {start:3, end: 5}),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create(
            {
                key: 'spin',
                frames:this.anims.generateFrameNumbers('mario', {start:14, end: 17}),
                frameRate: 20,
                repeat: -1
        });
        this.anims.create(
            {
                key: 'run',
                frames:this.anims.generateFrameNumbers('mario', {start:6, end: 8}),
                frameRate: 50,
                repeat: -1
        });
  
    }
    TryParallax(dir)
    {
        //this.bg.tilePositionX += dir/2;
    }
    IsCameraMoving()
    {
        if (this.cameras.main.x != this.lastCamX)
        {
            this.lastCamX = this.cameras.main.x;
            return true;
        };
        return false;
    }
    update()
    { 
    }
}