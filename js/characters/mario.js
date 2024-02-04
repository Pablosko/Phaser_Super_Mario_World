class mario extends character
{
    constructor(_scene,_posX,_posY)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'mario');
        
        this.loadBigMarioAnimations();
        this.loadLittleMarioAnimations();
        this.checkPointPosition = { x: 0, y: 0}
        this.jumping = false;
        this.jumpFrames = 30;
        this.spinframes = 20;
        this.currentJumpFrames = 0;
        this.canJump = true;
        this.spining = false;
        this.cursores = this.scene.input.keyboard.createCursorKeys();
        this.jumpKey =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  
        this.spinKey =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);  
        this.runkey =  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);  
        this.body.setSize(this.width * 0.5, this.height);
        this.hp = 1;
        this.dead = false;
        //Yoshi variables
        this.yoshi = undefined;
        this.isBigMario = false;
        this.jumpSound = this.scene.sound.add('sound_jump', { loop: false });

    } 
    getDamage(damage)
    {
        this.hp -= damage;
        if(this.hp <= 0)
        {
            this.dead= true;
            this.onDie();
        }
        else if(this.hp == 1)
        {
            this.convertToSmallMario();
        }

    }

    convertToSmallMario()
    {
        this.isBigMario = false;
        this.setTexture('mario');
        this.setFrame(0);
        this.body.setSize(this.width * 0.5, this.height);
    }
    convertToBigMario()
    {
        this.isBigMario = true;
        this.hp = 2;
        const centroY = this.y + this.displayHeight * 0.4;
        this.body.setSize(this.width, this.height);
        this.body.setOffset(0, centroY - this.y);        
        this.setTexture('marioBig');
        this.setFrame(0);
    }
    onDie()
    {
        this.setTexture('marioDeath');
        this.scene.cameras.main.fadeOut(2000);
        this.scene.colliderMarioEnemies.active = false;
        this.scene.tweens.add({
            targets: this,
            y: this.y - 120, 
            duration: 1000,
            ease: 'Linear', 
            onComplete: () => {
                this.collider.active = false;
                this.collider2.active = false;
            }
        });

        this.scene.cameras.main.once('camerafadeoutcomplete', () => { 
            this.scene.showGameOverMenu(false);            
        
        });

    }

    jump()
    {
        this.jumpSound.play();

        this.body.setVelocityY(gamePrefs.PLAYER_JUMP_FORCE);
        this.anims.stop();
        if(this.isBigMario)
        {
            this.setFrame(8);
        }
        else{

            this.setFrame(11);
        }
        this.jumping = true;
    }
    ResetJump()
    {    
        this.currentJumpFrames = 0;
        this.jumping = false; 
        this.spining = false;
        this.body.checkCollision.up = false;
    }
    setColliders()
    {
       this.collider = this.scene.physics.add.collider
        (
            this.character,
            this.scene.walls,
            this.ResetJump,
            null,
            this
        );
        this.collider2 = this.scene.physics.add.collider
        (
            this.character,
            this.scene.pipes,
            this.ResetJump,
            null,
            this
        );
        this.body.setDragX(250);

    }
    CollideWithEnemie(_mario,_enemie)
    {
        if(_mario.body.touching.down && _enemie.body.touching.up && _enemie.isVulnerable())
        {
            _enemie.getDamage(1,_mario.body);
            _mario.jump();
        }
        if(!_mario.body.touching.down && !_enemie.body.touching.up && _enemie.canDealDamage())
        {
            this.scene.mario.getDamage(1);
        }        
    }
    OnWallCollide(_mario,_block)
    {
        if (_mario.body.touching.down && _block.body.touching.up)
            this.ResetJump();
        if (_mario.body.touching.up && _block.body.touching.down)
        {
                this.canJump = false
            this.body.setVelocityY(50);
        }
    }
    preUpdate(time,delta)
    {
        if(this.dead)
            return;
        if(this.yoshi != undefined)
        {
            this.yoshiInputs();
        }else
         this.normalInputs();



        super.preUpdate(time, delta);
    }
    normalInputs()
    {
        this.maxspeed = this.runkey.isUp ? gamePrefs.PLAYER_MAX_SPEED : gamePrefs.PLAYER_MAXRUN_SPEED;
        this.acceleration = this.runkey.isUp ? gamePrefs.PLAYER_ACCELERATION : gamePrefs.PLAYER_ACCELERATION * 0.8;
        if(this.cursores.left.isDown)
        {
            this.body.velocity.x -=   this.acceleration ;
            if(this.body.velocity.x < -this.maxspeed )
             this.body.setVelocityX(-this.maxspeed );            
            this.flipX = this.body.velocity.x > 0;
            //this.scene.TryParallax(-1);          
        }else
        if(this.cursores.right.isDown)
        {
            this.body.velocity.x +=  this.acceleration ;
            if(this.body.velocity.x >this.maxspeed )
                this.body.setVelocityX(this.maxspeed );            
            this.flipX = this.body.velocity.x > 0;
          //  this.scene.TryParallax(1);
        }
        {
            if(!this.jumping)
            {
                if(Math.abs(this.body.velocity.x) <= 0.1)
                {
                    this.anims.stop();
                    this.setFrame(0);
                }
                else 
                {
                    if(Math.abs(this.body.velocity.x) >=  gamePrefs.PLAYER_MAXRUN_SPEED * 0.9)
                    {
                        this.setAnimation('runBig', 'run');
                    }
                    else
                    {
                        this.setAnimation('walkBig', 'walk');
                    }                    
                }
            }
        }
        if(this.jumping && !this.spining)
        {
            if(this.body.velocity.y >= 0)
            {
                if(this.isBigMario)
                {
                    this.setFrame(8);
                }
                else
                {

                    this.setFrame(12);
                }
            }
        }
        if(this.jumpKey.isUp && !this.jumping)
        {
            this.currentJumpFrames = 0;
            this.canJump = true;
        }
        if(this.jumpKey.isDown && this.currentJumpFrames < this.jumpFrames && this.canJump) 
        {
            if(Phaser.Input.Keyboard.JustDown(this.jumpKey))
            {
                this.body.checkCollision.up = true;
            }
            this.currentJumpFrames++;
            this.jump();
            if(this.currentJumpFrames >= this.jumpFrames)
                this.canJump = false;
        }
        if(Phaser.Input.Keyboard.DownDuration(this.spinKey,250) && this.currentJumpFrames < this.spinframes && this.canJump) 
        {
            if(this.currentJumpFrames == 0)
                this.body.checkCollision.up = true;
            this.currentJumpFrames++;
            this.jump();
            this.setAnimation('spinBig', 'spin');
            this.spining = true;
            if(this.currentJumpFrames >= this.spinframes)
                this.canJump = false;
        }
    }
    yoshiInputs()
    {
        this.body.setAllowGravity(false);
        this.body.enabled = false;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.x = this.yoshi.getPlayerPositionX().x;
        this.y = this.yoshi.getPlayerPositionX().y;
        this.body.x = this.x;
        this.body.y = this.y;


        this.maxspeed = this.runkey.isUp ? gamePrefs.PLAYER_MAX_SPEED : gamePrefs.PLAYER_MAXRUN_SPEED;
        this.acceleration = this.runkey.isUp ? gamePrefs.PLAYER_ACCELERATION : gamePrefs.PLAYER_ACCELERATION * 0.8;
        if(this.cursores.left.isDown)
        {
            this.yoshi.move('left',this.acceleration,this.maxspeed);
        }else
        if(this.cursores.right.isDown)
        {
            this.yoshi.move('right',this.acceleration,this.maxspeed);
        }
        if(this.jumpKey.isDown)
        {
            this.yoshi.jump();
        }

    }
    startRiding(yoshi)
    {
        this.yoshi = yoshi;
        if(this.isBigMario)
        {
            this.setTexture('marioBigRidingYoshi');
            this.setFrame(1);
        }
        else
        {
            this.setTexture('marioRidingYoshi');
            this.setFrame(1);
        }
        this.anims.stop();

   

    }
    setAnimation(bigAnimation, smallAnimation)
    {
        if(this.isBigMario)
        {
            this.anims.play(bigAnimation,true );
        }
        else
        {
            this.anims.play(smallAnimation, true);
        }
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
            this.anims.create(
                {
                    key: 'grow',
                    frames: this.anims.generateFrameNumbers('growMario', { start: 0, end: 2 }),
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
}