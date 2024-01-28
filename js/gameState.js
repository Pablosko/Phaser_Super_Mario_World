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
        //this.load.image('bg_frontal','background_frontal.png');
        this.load.spritesheet('mario','mario/little_mario.png',
        {frameWidth:16,frameHeight:22});
        this.load.spritesheet('lootBlock','lootBlock.png',
        {frameWidth:16,frameHeight:16});
        this.load.spritesheet('koopa','enemy_koopa_16x32.png',
        {frameWidth:16,frameHeight:32});
        this.load.spritesheet('l_koopa','enemy_koopaNoShield_16x16.png',
        {frameWidth:16,frameHeight:16});
        this.load.spritesheet('koopaShell','enemy_bullet_16x16.png',
        {frameWidth:16,frameHeight:16});
        //this.load.image('bullet','spr_bullet_0.png');

        this.load.setPath('assets/img/tilesets');
        this.load.image('tileset_ground','floor_tileset.png');
        this.load.image('tileset_pipes','pipes_tileset.png');
        this.load.image('tileset_vegetation','bush_tileset.png');
        this.load.image('tileset_arbusto','arbusto_big.png');

        this.load.setPath('assets/levels');
        this.load.tilemapTiledJSON('level1','level1.json');

    }
    GenerateMap()
    {
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        this.map.addTilesetImage('tileset_ground');
        this.map.addTilesetImage('tileset_pipes');
        this.map.addTilesetImage('tileset_vegetation');
        this.map.addTilesetImage('tileset_arbusto');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_ground','tileset_ground');
        this.pipes = this.map.createLayer('layer_pipes','tileset_pipes');
        this.map.createLayer('layer_vegetation','tileset_vegetation');
        this.map.createLayer('layer_vegetation_back','tileset_arbusto');
        this.lootBlocks = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.fruits = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.enemies = this.physics.add.group({
            immovable: true,
        });

        this.game_elements = this.map.getObjectLayer('game-elements');
        this.game_elements.objects.forEach(function (element)
        {
            console.log(element);
            switch (element.type)
            {
                case "lootBlock":
                    this.lootBlocks.add(new lootBlock(this,element.x,element.y));
                break;
                case "fruit":
                    const fruitObj = {posX: element.x, posY: element.y }
                    this.fruitInst = new fruit(this, fruitObj, 'fruit');
                //  this.fruits.add(new fruit(this,element.x,element.y));
                break;
                case "koopaShell":
                    this.enemies.add(new koopa(this,element.x,element.y,'redKoopa'));
                break;
                case "coin":
                    const coinObj = { posX: element.x, posY: element.y }
                    this.coinInst = new coinPickeable(this, coinObj, 'coin');
                break;
            }
        },this);

        this.map.setCollisionByExclusion([-1], true, true, 'layer_ground');
        this.map.setCollisionByExclusion([-1], true, true, 'layer_pipes');
        this.map.createLayer('layer_ground_transparent','tileset_ground');
      
    }
    create()
    { 
        this.loadAnimations();
        this.GenerateMap();
        // this.bg = this.add.tileSprite(config.width*0.5,config.height,config.width,1024-136,'bg').setOrigin(0.5,1);
        //this.bg.setScrollFactor(0);
        
        this.mario = new mario(this,config.width*0.2,config.height*.5);

        this.cameras.main.startFollow(this.mario);
        this.cameras.main.setBounds(0,0,
            gamePrefs.level1Width,gamePrefs.level1Height);

        this.CreateCollisions();


    }
    CreateCollisions()
    {
        this.physics.add.collider(this.mario, this.lootBlocks,(_mario,_block)=>{this.mario.OnWallCollide(_mario,_block)}, null, this);
        this.physics.add.collider(this.enemies, this.walls,(_enemie,_wall)=>{}, null, this);
        this.physics.add.collider(this.mario, this.enemies,(_mario,_enemie)=>{
            _mario.CollideWithEnemie(_mario,_enemie);
            _enemie.CollideWithPlayer(_enemie,_mario);
        }, null, this);
        this.physics.add.collider(this.enemies, this.enemies,(_enemie1,_enemie2)=>{_enemie1.collideWithEnemie(_enemie1,_enemie2)}, null, this);
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
            frameRate: 11,
            repeat: -1
        });
        this.anims.create(
         {
                key: 'lootBlockAnimation',
                frames:this.anims.generateFrameNumbers('lootBlock', {start:0, end: 3}),
                frameRate: 11,
                repeat: -1
        });
        this.anims.create(
            {
                key: 'spin',
                frames:this.anims.generateFrameNumbers('mario', {start:14, end: 17}),
                frameRate: 25,
                repeat: -1
        });
        this.anims.create(
        {
                key: 'run',
                frames:this.anims.generateFrameNumbers('mario', {start:6, end: 8}),
                frameRate: 35,
                repeat: -1
        });
   
        this.anims.create(
        {
            key: 'redKoopa',
            frames:this.anims.generateFrameNumbers('koopa', {start:4, end: 5}),
            frameRate: 11,
            repeat: -1
        });
        this.anims.create(
     {
                key: 'l_redKoopa',
                frames:this.anims.generateFrameNumbers('l_koopa', {start:2, end: 3}),
                frameRate: 11,
                repeat: -1
        });
        this.anims.create(
        {
            key: 'greenKoopa',
            frames:this.anims.generateFrameNumbers('koopa', {start:1, end: 2}),
            frameRate: 11,
            repeat: -1
        });  
        this.anims.create(
            {
                key: 'greenKoopa_shell',
                frames:this.anims.generateFrameNumbers('koopaShell', {start:0, end: 0}),
                frameRate: 0,
                repeat: -1
            });  
            this.anims.create(
                {
                    key: 'redKoopa_shell',
                    frames:this.anims.generateFrameNumbers('koopaShell', {start:3, end: 3}),
                    frameRate: 0,
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
    CreateLittleKoopa(x,y,dir,type)
    {
        this.newKoopa = new koopa(this,x + 8,y + 16,'l_' + type);
        this.newKoopa.OnUnShelled(dir);
        this.enemies.add(this.newKoopa);
    }
    update()
    { 
    }
}