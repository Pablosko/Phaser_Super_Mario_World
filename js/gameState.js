class gameState extends Phaser.Scene {
    constructor() {
        super({ key: 'main_scene' });
    }

    preload() {
        this.cameras.main.setBackgroundColor("112");
        this.load.setPath('assets/img/backgrounds');

        this.load.image('bg', 'background_level1.png');
        this.load.image('bg_start', 'bg_mariostart.png');
        this.load.image('bg_gameover', 'bg_gameover.png');
        this.load.image('bg_go_timeup', 'bg_gameover_timeup.png');
        this.load.image('bg_win', 'bg_clear.png');

        //Koopa Loads
        this.loadEnemiesSprites();
        this.loadMarioSprites();
        this.loadObjectsSprites();
        this.loadYoshiSprites();
        this.loadTileSets();

        this.load.setPath('assets/img/misc');
        this.load.spritesheet('blocks', 'blocks.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('powerUps', 'starmushroom.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('enredadera', 'plant_green.png', { frameWidth: 16, frameHeight: 16 })

        this.load.image('checkPointBar', 'checkpoint_bar.png');
        this.load.image('checkPointEndBar', 'checkpoint_end_bar.png');
        this.load.image('checkPointEnd', 'checkpoint_end.png');
        this.load.image('checkPoint', 'checkPoint.png');

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
        this.load.spritesheet('rugby', 'rugby_enemy.png', { frameWidth: 26, frameHeight: 27 });
        this.load.spritesheet('redPlant', 'planta_red.png', { frameWidth: 16, frameHeight: 21 })
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
        this.s = this.load.spritesheet('yoshiTongue', 'yoshi_tongue.png',
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
        const uiScene = this.scene.get('UIScene');
        this.customEmiter = new Phaser.Events.EventEmitter();

        //Variables
        this.win = false;
        this.retries = true;

        this.imagenTemporal = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg_start');
        this.imagenTemporal.setOrigin(0.5, 0.5);

        this.time.delayedCall(150, () => {
            this.imagenTemporal.destroy();
            this.loadAnimations();
            this.generateMap();

            this.bg = this.add.tileSprite(0, config.height * 0.95, config.width, 512, 'bg').setOrigin(0, 0.5);
            this.bg.setDepth(-50);
            this.bg.setScrollFactor(0, 1);

            this.mario = new mario(this, config.width * .2, config.height + 100);
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

        this.enredaderaGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.game_elements = this.map.getObjectLayer('game-elements');
        this.game_elements.objects.forEach(function (element) {
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
                    case "trasparentBlock":
                        this.data = { posX: element.x, posY: element.y, spriteTag: 'blocks', frame: 0 }
                        this.obj = new trasparentBlock(this, this.data);
                        this.allBlocks.add(this.obj);
                        break;
                case "normalBlock":
                    this.data = { posX: element.x, posY: element.y, spriteTag: 'blocks', frame: 1 }
                    this.obj = new normalBlock(this, this.data);
                    this.allBlocks.add(this.obj);
                    break;
                case "enredadera":
                    this.data = { posX: element.x, posY: element.y, spriteTag: 'enredadera', frame: 2 }
                    this.obj = new enredaderaBlock(this, this.data);
                    this.obj.setVisible(false);
                    this.enredaderaGroup.add(this.obj);
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
                    this.topoObj = new topo(this, element.x, element.y, 'topoFloor')
                    this.enemies.add(this.topoObj);
                    break;
                case "topoWall":
                    this.topoObj = new topo(this, element.x, element.y, 'topoWall')
                    this.enemies.add(this.topoObj);
                    break;
                case "koopa":
                    //create little kopa
                    this.CreateLittleKoopa(element.x,element.y, -1, 'redKoopa');
                    break;
                    
                case "shellGreen":
                        this.newKoopa = new koopa(this, element.x, element.y, 'redKoopa');
                        this.newKoopa.transformToLittle();
                        this.enemies.add(this.newKoopa);
                break;
                case "shellRed":
                            this.newKoopa = new koopa(this, element.x, element.y, 'redKoopa');
                            this.newKoopa.transformToLittle();
                            this.enemies.add(this.newKoopa);
                break;

                case "plant":
                    this.plant = new redPlant(this, element.x, element.y, 'redPlant');
                    this.plant.setSize(8, 8);
                    this.plant.setDepth(-25)
                    this.enemies.add(this.plant);
                break;
                case "enemyRugby":
                    this.enemies.add(new rugby(this, element.x, element.y, "rugbyEnemy"));
                    break;
                case "bars":
                    this.checkPointImg = this.add.image(element.x, element.y, 'checkPoint');
                    break;
                case "stickBars":
                    this.bar = new barsCheckPoints(this, element.x, element.y, 'checkPointBar', this.checkPointImg, false);
                    break;
                case "stickBarFat":
                    this.checkPointFatImg = this.add.image(element.x, element.y, 'checkPointEnd');
                    break;
                case "barsFat":
                    if (this.checkPointFatImg) {
                        this.bar2 = new barsCheckPoints(this, element.x, element.y, 'checkPointEndBar', this.checkPointFatImg, true);
                    }
                    break;
            }
        }, this);
    }

    createCollisions() {
        this.physics.add.collider(this.mario, this.lootBlocks, (_mario, _block) => { this.mario.OnWallCollide(_mario, _block) }, null, this);
        this.physics.add.collider(this.pBlock, this.allBlocks, (_mario, _block) => { }, null, this);
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
        this.loadRugbyAnimations();
        //Misc animations
        this.anims.create(
            {
                key: 'plantRedIdle',
                frames: this.anims.generateFrameNumbers('redPlant', { start: 0, end: 1 }),
                frameRate: 11,
                repeat: -1
            });
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
        this.anims.create(
            {
                key: 'openEgg',
                frames: this.anims.generateFrameNumbers('egg', { start: 0, end: 1 }),
                frameRate: 12,
                repeat: 3
            });
        this.anims.create(
            {
                key: 'yoshiSpawnAnim',
                frames: this.anims.generateFrameNumbers('yoshiSpawn', { start: 0, end: 4 }),
                frameRate: 6,
            });
        this.anims.create(
            {
                key: 'yoshiidle',
                frames: this.anims.generateFrameNumbers('yoshiSprites', { start: 0, end: 1 }),
                frameRate: 6,
                repeat: -1
            });

        this.anims.create(
            {
                key: 'walkingEmpty',
                frames: this.anims.generateFrameNumbers('yoshiSprites', { start: 6, end: 7 }),
                frameRate: 6,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'WalkingMario',
                frames: this.anims.generateFrameNumbers('yoshiWalks', { start: 0, end: 2 }),
                frameRate: 12,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'scarywalk',
                frames: this.anims.generateFrameNumbers('yoshiWalks', { start: 3, end: 5 }),
                frameRate: 6,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walkToEat',
                frames: this.anims.generateFrameNumbers('yoshiWalks', { start: 6, end: 8 }),
                frameRate: 6,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walkeating',
                frames: this.anims.generateFrameNumbers('yoshiWalks', { start: 9, end: 11 }),
                frameRate: 6,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'yoshiAttack',
                frames: this.anims.generateFrameNumbers('yoshiTongue', { start: 0, end: 1 }),
                frameRate: 100
            });
           
    }

    loadRugbyAnimations() {
        this.anims.create(
            {
                key: 'runRugby',
                frames: this.anims.generateFrameNumbers('rugby', { start: 0, end: 1 }),
                frameRate: 24,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'lookAroundCrouched',
                frames: this.anims.generateFrameNumbers('rugby', { start: 2, end: 4 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'hitCrouch',
                frames: this.anims.generateFrameNumbers('rugby', { start: 6, end: 7 }),
                frameRate: 11,
                repeat: -1
            });
        this.anims.create(
            {
                key: 'crouchBounceHead',
                frames: this.anims.generateFrameNumbers('rugby', { start: 8, end: 10 }),
                frameRate: 11,
                repeat: -1
            });
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
                repeat: 3
            });
        this.anims.create(
            {
                key: 'spawnTopoFloor',
                frames: this.anims.generateFrameNumbers('topo', { start: 5, end: 6 }),
                frameRate: 11,
                repeat: 3
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

    showGameOverMenu(isTime) {
        
        this.cameras.main.fadeIn(500);
        if(!this.retries)
        {
            this.scene.stop('UIScene');    
        }
        
        if (isTime) {
            this.bg_lose = this.add.image(this.cameras.main.width / 2 + this.cameras.main.scrollX, this.cameras.main.height / 2 + this.cameras.main.scrollY, 'bg_go_timeup');
        }
        else {
            this.bg_lose = this.add.image(this.cameras.main.width / 2 + this.cameras.main.scrollX, this.cameras.main.height / 2 + this.cameras.main.scrollY, 'bg_gameover');
        }
        this.bg_lose.setDepth(1000);
        if(this.retries)
        {
            this.time.delayedCall(400, function () 
            {
                this.retries = false;
                this.mario.returnToCheckPoint();
                this.bg_lose.destroy();
            }, [], this);
        }
        else
        {
            this.time.delayedCall(1500, function () {
                this.scene.stop('main_scene');
                this.scene.start('menu');
            }, [], this);
        }
    }  
    

    showWinMenu() {

        if(!this.win)
        {
            this.mario.dead = true;
            this.win = true;
            this.wid = this.cameras.main.width / 2 + this.cameras.main.scrollX;
            this.hei = this.cameras.main.height / 2 + this.cameras.main.scrollY;
    
            let currentTimeValue = this.scene.get('UIScene').getCurrentTime();
    
            this.events.emit('stopTime');
    
            this.bg_win = this.add.image(this.wid, this.hei, 'bg_win');
            this.bg_win.setDepth(50);
    
            this.time2 = this.add.bitmapText(this.wid * 0.68, this.hei * 1.01, 'UIfont', '' + currentTimeValue, 8).setDepth(5);
            this.multiplier = this.add.bitmapText(this.wid * 0.92, this.hei * 1.01, 'UIfont', '50', 8).setDepth(5);
            this.result = currentTimeValue * 50;
            this.resulttxt = this.add.bitmapText(this.wid * 1.2, this.hei * 1.01, 'UIfont', '' + this.result, 8).setDepth(5);
            this.events.emit('addPoints', this.result);
    
            this.time2.setDepth(105);
            this.multiplier.setDepth(105);
    
            this.resulttxt.setDepth(105);
    
            this.time.delayedCall(10000, function () {
                this.scene.stop('UIScene');
                this.scene.stop('main_scene');
                this.scene.start('menu');
            }, [], this);
        }

    }
}