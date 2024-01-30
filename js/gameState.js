class gameState extends Phaser.Scene {
    constructor() {
        super({ key: 'main_scene' });
    }

    preload() {
        this.cameras.main.setBackgroundColor("112");
        this.load.setPath('assets/img');
        this.load.image('bg', 'backgrounds/background_level1.png')

        //Mario Load sprites
        this.load.spritesheet('mario', 'mario/little_mario.png', { frameWidth: 16, frameHeight: 22 });
        this.load.spritesheet('marioBig', 'mario/bigmario_normal.png', { frameWidth: 16, frameHeight: 31 });
        this.load.spritesheet('marioBigRun', 'mario/mariobig_run.png', { frameWidth: 18, frameHeight: 28 });
        this.load.spritesheet('marioBigRidingYoshi', 'mario/mariobig_ridingYoshi.png', { frameWidth: 16, frameHeight: 22 });
        this.load.spritesheet('marioRidingYoshi', 'mario/mariomini_ridingYoshi.png', { frameWidth: 16, frameHeight: 21 });

        //Koopa Loads
        this.load.spritesheet('lootBlock', 'lootBlock.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('koopa', 'enemy_koopa_16x32.png',
            { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('l_koopa', 'enemy_koopaNoShield_16x16.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('koopaShell', 'enemy_bullet_16x16.png',
            { frameWidth: 16, frameHeight: 16 });

        
        this.load.setPath('assets/img/objects');
        this.load.spritesheet('yoshiCoin', 'coin_yoshi.png',
            { frameWidth: 16, frameHeight: 25 });
        this.load.spritesheet('normalCoin', 'normal_coins.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('buttonP', 'button_P.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('apple', 'apple.png',
            { frameWidth: 14, frameHeight: 13 });
        this.load.spritesheet('eyeCoin', 'eyecoin.png', { frameWidth: 16, frameHeight: 16 })


        this.load.setPath('assets/img/tilesets');
        this.load.image('tileset_ground', 'floor_tileset.png');
        this.load.image('tileset_pipes', 'pipes_tileset.png');
        this.load.image('tileset_vegetation', 'bush_tileset.png');
        this.load.image('tileset_arbusto', 'arbusto_big.png');

        this.load.setPath('assets/levels');
        this.load.tilemapTiledJSON('level1', 'level1.json');

        this.load.setPath('assets/fonts');
        this.load.bitmapFont('UIfont', 'Unnamed.png', 'Unnamed.xml');
    }

    GenerateMap() {
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        this.map.addTilesetImage('tileset_ground');
        this.map.addTilesetImage('tileset_pipes');
        this.map.addTilesetImage('tileset_vegetation');
        this.map.addTilesetImage('tileset_arbusto');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_ground', 'tileset_ground');
        this.pipes = this.map.createLayer('layer_pipes', 'tileset_pipes');
        this.map.createLayer('layer_vegetation', 'tileset_vegetation');
        this.map.createLayer('layer_plantas', 'tileset_ground');
        this.map.createLayer('layer_vegetation_back', 'tileset_arbusto');

        //Set de los colliders
        this.map.setCollisionByExclusion([-1], true, true, 'layer_ground');
        this.map.setCollisionByExclusion([-1], true, true, 'layer_pipes');
        this.map.createLayer('layer_ground_transparent', 'tileset_ground');
    }

    generateGameElements() {
        this.lootBlocks = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.enemies = this.physics.add.group({
            immovable: true,
        });

        this.game_elements = this.map.getObjectLayer('game-elements');
        this.game_elements.objects.forEach(function (element) {
            // ID can be -> fruit, normal_coin, yoshi_coin
            switch (element.type) {
                case "lootBlock":
                    this.lootBlocks.add(new lootBlock(this, element.x, element.y));
                    break;
                case "fruit":
                    this.object = new pickeableItem(this, element.x, element.y, "fruit", 'apple');
                    break;
                case "koopaShell":
                    this.enemies.add(new koopa(this, element.x, element.y, 'redKoopa'));
                    break;
                case "coin":
                    this.object = new pickeableItem(this, element.x, element.y, "normal_coin", 'normalCoin');
                    break;
                case "coinsYoshi":
                    this.object = new pickeableItem(this, element.x, element.y, "yoshi_coin", 'yoshiCoin');
                    break;
                case "yellowBlock":
                    this.object = new pickeableItem(this, element.x, element.y, "eye_coin", 'eyeCoin')
                    break;
            }
        }, this);
    }

    create() {
        //temporal
        const uiScene = this.scene.get('UIScene');
        this.customEmiter = new Phaser.Events.EventEmitter();

        this.loadAnimations();
        this.GenerateMap();
        // ?? touches dont move
        // this.bg = this.add.tileSprite(config.width*0.5,config.height,config.width,1024-136,'bg').setOrigin(0.5,1);
        //  this.bg.setDepth(-50);
        // this.bg.setScrollFactor(0);


        this.mario = new mario(this, config.width * 0.2, config.height * .5);
        this.generateGameElements();
        this.cameras.main.startFollow(this.mario);
        this.cameras.main.setBounds(0, 0, gamePrefs.level1Width, gamePrefs.level1Height);

        this.CreateCollisions();
    }

    CreateCollisions() {
        this.physics.add.collider(this.mario, this.lootBlocks, (_mario, _block) => { this.mario.OnWallCollide(_mario, _block) }, null, this);
        this.physics.add.collider(this.enemies, this.walls, (_enemie, _wall) => { }, null, this);
        this.physics.add.collider(this.mario, this.enemies, (_mario, _enemie) => {
            _mario.CollideWithEnemie(_mario, _enemie);
            _enemie.CollideWithPlayer(_enemie, _mario);
        }, null, this);
        this.physics.add.collider(this.enemies, this.enemies, (_enemie1, _enemie2) => { _enemie1.collideWithEnemie(_enemie1, _enemie2) }, null, this);
    }
    loadAnimations() {
        this.loadLittleMarioAnimations();
        this.loadBigMarioAnimations();
        this.loadYoshiAnimations();
        this.loadKoopaAnimations();

        //Misc animations

        this.anims.create(
            {
                key: 'lootBlockAnimation',
                frames: this.anims.generateFrameNumbers('lootBlock', { start: 0, end: 3 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'normalCoinIdle',
                frames: this.anims.generateFrameNumbers('normalCoin', { start: 0, end: 3 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'yoshiCoinIdle',
                frames: this.anims.generateFrameNumbers('yoshiCoin', { start: 0, end: 3 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'appleIdle',
                frames: this.anims.generateFrameNumbers('apple', { start: 0, end: 2 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'eyeCoinImpact',
                frames: this.anims.generateFrameNumbers('eyeCoin', { start: 0, end: 3 }),
                frameRate: 11,
                repeat: -1
            });
    }


    loadLittleMarioAnimations() {
        /*
           0 -> IDLE 1 -> LOOK_UP 2 -> DUCK 3 al 5 -> WALK 6 al 8 -> RUN 9 -> SKID  10 -> PIPE 11 -> JUMP  12 -> FALL 13 -> RUN JUMP 14 al 17 -> SPIN JUMP 18 -> SLIDe 19 -> KICK
          20 al 22 -> SWIM 23 VICTORY
          */
        this.anims.create(
            {
                key: 'walk',
                frames: this.anims.generateFrameNumbers('mario', { start: 3, end: 5 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'spin',
                frames: this.anims.generateFrameNumbers('mario', { start: 14, end: 17 }),
                frameRate: 25,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'run',
                frames: this.anims.generateFrameNumbers('mario', { start: 6, end: 8 }),
                frameRate: 35,
                repeat: -1
            });

    }
    loadBigMarioAnimations() {
        this.anims.create(
            {
                key: 'walkBig',
                frames: this.anims.generateFrameNumbers('marioBig', { start: 3, end: 5 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'spinBig',
                frames: this.anims.generateFrameNumbers('marioBig', { start: 10, end: 13 }),
                frameRate: 25,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'runBig',
                frames: this.anims.generateFrameNumbers('marioBigRun', { start: 0, end: 2 }),
                frameRate: 35,
                repeat: -1
            });
    }
    loadYoshiAnimations() {

    }
    loadKoopaAnimations()
    {
        this.anims.create(
            {
                key: 'redKoopa',
                frames: this.anims.generateFrameNumbers('koopa', { start: 4, end: 5 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'l_redKoopa',
                frames: this.anims.generateFrameNumbers('l_koopa', { start: 2, end: 3 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'greenKoopa',
                frames: this.anims.generateFrameNumbers('koopa', { start: 1, end: 2 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'greenKoopa_shell',
                frames: this.anims.generateFrameNumbers('koopaShell', { start: 0, end: 0 }),
                frameRate: 0,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'redKoopa_shell',
                frames: this.anims.generateFrameNumbers('koopaShell', { start: 3, end: 3 }),
                frameRate: 0,
                repeat: -1
            });
    }


    TryParallax(dir) {
        //this.bg.tilePositionX += dir/2;
    }
    IsCameraMoving() {
        if (this.cameras.main.x != this.lastCamX) {
            this.lastCamX = this.cameras.main.x;
            return true;
        };
        return false;
    }
    CreateLittleKoopa(x, y, dir, type) {
        this.newKoopa = new koopa(this, x + 8, y + 16, 'l_' + type);
        this.newKoopa.OnUnShelled(dir);
        this.enemies.add(this.newKoopa);
    }
    update() {
    }
}