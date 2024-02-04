
class yoshi extends pickeableItem 
{
    constructor(_scene, posX, posY, id, _spriteTag)
    {
        super(_scene, posX, posY, id, _spriteTag);
        this.areaZone.body.setImmovable(false);
        this.body.setSize(this.width * 0.7, this.height);
        this.body.setImmovable(false);
        this.body.setAllowGravity(true); 
        this.setColliders();
        this.anims.play("openEgg").on('animationcomplete', this.spawnYoshi, this);
        this.grounded = true;
        this.canBePick = false;
        this.body.setDragX(250);
        this.jumpCooldown = 0;
        this.jumpCooldownDuration = 250;
        this.WhileJumpingEvent;
        this.jumping = false;
        this.yoshiJumpEvent

    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta);
        if (this.jumpCooldown > 0) 
            this.jumpCooldown -= delta;

            if (this.WhileJumpingEvent && this.WhileJumpingEvent.getProgress() === 1) {
                this.WhileJumpingEvent.remove();
            }
        if(this.jumping)
        {
            this.jump();
        }
    }
    spawnYoshi()
    {
        this.body.setSize(26,32);
        this.body.setOffset(0,0);
        this.y -=10;
        this.body.y -=10;
        this.setTexture("yoshiSpawn");
        this.anims.play("yoshiSpawnAnim").on('animationcomplete',this.completeSpawn,this);
    }
    completeSpawn()
    {
        this.anims.stop();
        this.setTexture("yoshiSprites");
        this.anims.play('yoshiidle');
        this.canBePick = true;
        this.jumpEvent = this.scene.time.addEvent({
            delay: Phaser.Math.Between(250,750),  
            callback: () => {if(this.grounded){this.body.velocity.y -=  Phaser.Math.Between(120,200); this.grounded = false} },  
            callbackScope: this,
            loop: true  
        });
    }
    setColliders()
    {
      super.setColliders();


     this.scene.physics.add.collider
        (
            this,
            this.scene.walls,
            this.touchFloor,
            null,
            this
        );
        this.scene.physics.add.collider
        (
            this,
            this.scene.pipes,
            this.touchFloor,
            null,
            this
        );

        this.scene.physics.add.collider
        (
            this,
            this.scene.lootBlocks,
            this.touchFloor,
            null,
            this
        );
    }

    pickItem()
    {
        if(!this.canBePick)
            return;

        this.areaZone.body.setEnable(false); 
        //this.normalCoinSound.play();
        this.scene.mario.startRiding(this);
        this.scene.time.removeEvent(this.jumpEvent);
    }
    cosa()
    {
        
    }
    jump()
    {
        this.setTexture('yoshiSprites');
        this.body.velocity.y = -gamePrefs.yoshiJump;
        this.setFrame(3);
      
    }
    move(direcction,acceleration,maxspeed)
    {
        if(direcction == 'right')
        {
            this.body.velocity.x += acceleration ;
            if(this.body.velocity.x > maxspeed)
                this.body.setVelocityX(maxspeed);            
            this.flipX = this.body.velocity.x < 0;
            this.scene.mario.flipX = this.body.velocity.x > 0;
        }else if(direcction == 'left')
        {
            this.body.velocity.x -= acceleration ;
            if(this.body.velocity.x < -maxspeed)
             this.body.setVelocityX(-maxspeed);            
            this.flipX = this.body.velocity.x < 0;
            this.scene.mario.flipX = this.body.velocity.x > 0;
        }
    }
    touchFloor()
    {
        this.grounded = true;
        this.scene.time.removeEvent(this.WhileJumpingEvent);
    }
    getPlayerPositionX()
    {
        this.sign = 1;
        if(this.flipX)
            this.sign = -1;
        return {x: this.x - 7  * this.sign,y: this.y - 10};
    }
  
}