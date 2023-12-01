class mario extends character
{
    constructor(_scene,_posX,_posY)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'mario');
        
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
        this.body.checkCollision.up = false;
        this.body.setSize(this.width * 0.5, this.height);
        this.hp = 1;
    }

 
    jump()
    {
        this.body.setVelocityY(gamePrefs.PLAYER_JUMP_FORCE);
        this.anims.stop();
        this.setFrame(11);
        this.jumping = true;
    }
    ResetJump()
    {
        this.currentJumpFrames = 0;
        this.jumping = false; 
        this.spining = false;
      
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
    }
    OnWallCollide(_mario,_block)
    {
        if (_mario.body.touching.down && _block.body.touching.up)
            this.ResetJump();
        if (_mario.body.touching.up && _block.body.touching.down)
            this.body.setVelocityY(-10);
    }
    preUpdate(time,delta)
    {
        this.maxspeed = this.runkey.isUp ? gamePrefs.PLAYER_MAX_SPEED : gamePrefs.PLAYER_MAXRUN_SPEED;
        this.acceleration = this.runkey.isUp ? gamePrefs.PLAYER_ACCELERATION : gamePrefs.PLAYER_ACCELERATION * 0.8;
        if(this.cursores.left.isDown)
        {
            //this.nave.x -= gamePrefs.NAVE_SPEED;
            this.body.velocity.x -=   this.acceleration ;
            if(this.body.velocity.x < -this.maxspeed )
             this.body.setVelocityX(-this.maxspeed );
            
            this.flipX = this.body.velocity.x > 0;
            this.scene.TryParallax(-1);
            
     
        }else
        if(this.cursores.right.isDown)
        {
            //this.nave.x += gamePrefs.NAVE_SPEED;
            this.body.velocity.x +=  this.acceleration ;
            if(this.body.velocity.x >this.maxspeed )
                this.body.setVelocityX(this.maxspeed );
            
            this.flipX = this.body.velocity.x > 0;
            this.scene.TryParallax(1);


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
                        this.anims.play('run',true);
                    else
                        this.anims.play('walk',true);
                }

            }
        }
        if(this.jumping && !this.spining)
        {
            if(this.body.velocity.y >= 0)
            {
                this.setFrame(12);
            }
        }
        if(this.jumpKey.isUp && !this.jumping)
        {
            this.currentJumpFrames = 0;
            this.canJump = true;
        }
        if(this.jumpKey.isDown && this.currentJumpFrames < this.jumpFrames && this.canJump) 
        {
            this.currentJumpFrames++;
            this.jump();
            if(this.currentJumpFrames >= this.jumpFrames)
                this.canJump = false;
        }
        if( Phaser.Input.Keyboard.DownDuration(this.spinKey,250) && this.currentJumpFrames < this.spinframes && this.canJump) 
        {
            this.currentJumpFrames++;
            this.jump();
            this.anims.play('spin');
            this.spining = true;
            if(this.currentJumpFrames >= this.spinframes)
                this.canJump = false;
        }

        
        if(!this.character.body.onFloor())
        {

        }
        
        super.preUpdate(time, delta);
    }
}