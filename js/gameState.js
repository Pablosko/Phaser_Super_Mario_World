class gameState extends Phaser.Scene {
    constructor() {
        super({ key: 'main_scene' });
    }

    preload() {
        this.cameras.main.setBackgroundColor("112");
        this.load.setPath('assets/img');
        this.load.image('bg', 'backgrounds/background_level1.png');
        this.load.image('bg_start', 'backgrounds/bg_mariostart.png')
        this.load.image('bg_gameover', 'backgrounds/bg_gameover.png');
        //Koopa Loads

        this.loadEnemiesSprites();
        this.loadMarioSprites();
        this.loadObjectsSprites();
        this.loadYoshiSprites();
        this.loadTileSets();

        this.load.setPath('assets/img/misc');
        this.load.spritesheet('blocks', 'blocks.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('powerUps', 'starmushroom.png',
            { frameWidth: 16, frameHeight: 16 });

        this.load.setPath('assets/levels');
        this.load.tilemapTiledJSON('level1', 'level1.json');

        this.load.setPath('assets/fonts');
        this.load.bitmapFont('UIfont', 'Unnamed.png', 'Unnamed.xml');

        this.loadAudios();
    }

    loadEnemiesSprites() {
        this.load.setPath('assets/img/enemies')
        this.load.spritesheet('koopa', 'enemy_koopa_16x32.png',
            { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('l_koopa', 'enemy_koopaNoShield_16x16.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('koopaShell', 'enemy_bullet_16x16.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('topo', 'mole.png',
            { frameWidth: 16, frameHeight: 16 });
    }

    loadObjectsSprites() {
        this.load.setPath('assets/img/objects');
        this.load.spritesheet('yoshiCoin', 'coin_yoshi.png',
            { frameWidth: 16, frameHeight: 25 });
        this.load.spritesheet('normalCoin', 'normal_coins.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('buttonP', 'button_P.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('apple', 'apple.png',
            { frameWidth: 14, frameHeight: 13 });
        this.load.spritesheet('eyeCoin', 'eyecoin.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('lootBlock', 'lootBlock.png',
            { frameWidth: 16, frameHeight: 16 });

    }

    loadMarioSprites() {
        this.load.setPath('assets/img/mario');
        this.load.spritesheet('mario', 'little_mario.png', { frameWidth: 16, frameHeight: 22 });
        this.load.spritesheet('marioBig', 'bigmario_normal.png', { frameWidth: 16, frameHeight: 31 });
        this.load.spritesheet('marioBigRun', 'mariobig_run.png', { frameWidth: 18, frameHeight: 31 });
        this.load.spritesheet('marioBigRidingYoshi', 'mariobig_ridingYoshi.png', { frameWidth: 16, frameHeight: 22 });
        this.load.spritesheet('marioRidingYoshi', 'mariomini_ridingYoshi.png', { frameWidth: 16, frameHeight: 21 });
        this.load.spritesheet('growMario', 'grow_mario.png', { frameWidth: 16, frameHeight: 31 });
        this.load.image('marioDeath', 'mario_death.png');
    }

    loadYoshiSprites() {
        this.load.setPath('assets/img/yoshi');
        this.load.spritesheet('eggExplosion', 'egg_explosion.png',
            { frameWidth: 18, frameHeight: 19 });
        this.load.spritesheet('egg', 'yoshi_eggs.png',
            { frameWidth: 14, frameHeight: 16 });
        this.load.spritesheet('yoshiSpawn', 'yoshi_spawn.png',
            { frameWidth: 26, frameHeight: 32 });
        this.load.spritesheet('yoshiSprites', 'yoshi_sprites.png',
            { frameWidth: 26, frameHeight: 32 });
        this.load.spritesheet('yoshiTongue', 'yoshi_tongue.png',
            { frameWidth: 48, frameHeight: 32 });
        this.load.spritesheet('yoshiWalks', 'yoshi_walking.png',
            { frameWidth: 26, frameHeight: 32 });
    }

    loadTileSets() {
        this.load.setPath('assets/img/tilesets');
        this.load.image('tileset_ground', 'floor_tileset.png');
        this.load.image('tileset_pipes', 'pipes_tileset.png');
        this.load.image('tileset_vegetation', 'bush_tileset.png');
        this.load.image('tileset_arbusto', 'arbusto_big.png');
    }

    loadAudios() {
        this.load.setPath('assets/sounds');
        this.load.audio('music_gameover', 'game_over.wav');
        this.load.audio('music_game', 'overworld.mp3'); // DONE
        this.load.audio('sound_jump', 'jump.wav'); //Done
        this.load.audio('sound_pick_coin', 'pick_coin.wav'); // Done
        this.load.audio('sound_pick_mushroom', 'pick_mushroom.wav'); //
        this.load.audio('sound_pick_power_up', 'power_up.wav'); //
        this.load.audio('sound_spawn_power_up', 'power_up_appears.wav');
        this.load.audio('sound_ridingYoshi', 'riding_yoshi.wav');
        this.load.audio('sound_spin_jump', 'spin_jump.wav'); //
        this.load.audio('sound_death', 'mario_death.mp3');

    }

    create() {
        //temporal
        const uiScene = this.scene.get('UIScene');
        this.customEmiter = new Phaser.Events.EventEmitter();

        this.imagenTemporal = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg_start');
        this.imagenTemporal.setOrigin(0.5, 0.5);

        this.time.delayedCall(150, () => {
            this.imagenTemporal.destroy();
            this.loadAnimations();
            this.generateMap();
            // ?? touches dont move
             this.bg = this.add.tileSprite(config.width*0.5,config.height,config.width,1024-136,'bg').setOrigin(0.5,1);
             this.bg.setDepth(-50);
             this.bg.setScrollFactor(0);
            this.mario = new mario(this, config.width * .2, config.height * .8);
            this.generateGameElements();
            this.cameras.main.startFollow(this.mario);
            this.cameras.main.setBounds(0, 0, gamePrefs.level1Width, gamePrefs.level1Height);

            this.backgroundGameMusic = this.sound.add('music_game', { loop: true });
            this.timerEvent = this.time.addEvent({
                delay: 100,
                callback: () => { this.backgroundGameMusic.play(); },
                callbackScope: this,
                loop: false
            });

            this.createCollisions();
        });
    }

    generateMap() {
        this.map = this.add.tilemap('level1');
        //Cargo los tilesets
        this.map.addTilesetImage('tileset_ground');
        this.map.addTilesetImage('tileset_pipes');
        this.map.addTilesetImage('tileset_vegetation');
        this.map.addTilesetImage('tileset_arbusto');
        //Pinto las CAPAS/LAYERS
        this.walls = this.map.createLayer('layer_ground', 'tileset_ground');
        this.pipes = this.map.createLayer('layer_pipes', 'tileset_pipes');
        this.map.createLayer('layer_plantas', 'tileset_ground');
        this.map.createLayer('layer_vegetation_back', 'tileset_arbusto');
        this.vege = this.map.createLayer('layer_vegetation', 'tileset_arbusto');
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
        this.allBlocks = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        this.pBlock;
        this.enemies = this.physics.add.group({
            immovable: true,
        });

        this.coinsGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.game_elements = this.map.getObjectLayer('game-elements');
        this.game_elements.objects.forEach(function (element) {
            // ID can be -> fruit, normal_coin, yoshi_coin
            this.data = {};
            switch (element.type) {

                case "lootBlock":
                    this.data = { posX: element.x, posY: element.y, spriteTag: 'lootBlock', content: element.properties }
                    this.lootBlocks.add(new lootBlock(this, this.data));
                    this.allBlocks.add(this.object);
                    break;
                case "fruit":
                    this.object = new pickeableItem(this, element.x, element.y, "fruit", 'apple');
                    break;
                case "koopaShell":
                    this.enemies.add(new koopa(this, element.x, element.y, 'redKoopa'));
                    break;
                case "coin":
                    this.coinsGroup.add(new pickeableItem(this, element.x, element.y, "normal_coin", 'normalCoin'));
                    break;
                case "coinsYoshi":
                    this.object = new pickeableItem(this, element.x, element.y, "yoshi_coin", 'yoshiCoin');
                    break;
                case "yellowBlock":
                    this.data = { posX: element.x, posY: element.y, spriteTag: 'eyeCoin', content: element.properties }
                    this.object = new yellowEyeBlock(this, this.data);
                    this.allBlocks.add(this.object);
                    break;
                case "buttonP":
                    this.data = { posX: element.x, posY: element.y, spriteTag: 'buttonP', frame: 0 }
                    this.pBlock = new buttonPBlock(this, this.data);
                    break;
                case "cloud":
                    this.data = { posX: element.x, posY: element.y, spriteTag: 'blocks', frame: 3 }
                    this.object = new normalBlock(this, this.data);
                    this.allBlocks.add(this.object);
                    break;
                case "topoFloor":
                    //  const objectTopo = {posX : element.x, posY: element.y, spriteTag: 'blocks', frame : 3}
                    //this.object = new 
                    break;
                case "topoWall":
                    break;
            }
        }, this);
    }

    createCollisions() {
        this.physics.add.collider(this.mario, this.lootBlocks, (_mario, _block) => { this.mario.OnWallCollide(_mario, _block) }, null, this);
        this.physics.add.collider(this.pBlock, this.allBlocks, (_mario, _block) => { console.log("dsadsa") }, null, this);
        this.physics.add.collider(this.enemies, this.walls, (_enemie, _wall) => { }, null, this);
        this.colliderMarioEnemies = this.physics.add.collider(this.mario, this.enemies, (_mario, _enemie) => {
            _mario.CollideWithEnemie(_mario, _enemie);
            _enemie.CollideWithPlayer(_enemie, _mario);
        }, null, this);
        this.physics.add.collider(this.enemies, this.enemies, (_enemie1, _enemie2) => { _enemie1.collideWithEnemie(_enemie1, _enemie2) }, null, this);

    }

    loadAnimations() {
        this.loadYoshiAnimations();
        this.loadKoopaAnimations();
        this.loadMoleAnimations();
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

    loadYoshiAnimations() {

    }

    loadMoleAnimations() {
        this.anims.create(
            {
                key: 'walkTopo',
                frames: this.anims.generateFrameNumbers('topo', { start: 0, end: 1 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'spawnTopoWall',
                frames: this.anims.generateFrameNumbers('topo', { start: 3, end: 4 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'spawnTopoFloor',
                frames: this.anims.generateFrameNumbers('topo', { start: 5, end: 6 }),
                frameRate: 11,
                repeat: -1
            });
    }

    loadKoopaAnimations() {
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