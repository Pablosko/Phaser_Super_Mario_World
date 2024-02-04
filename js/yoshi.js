
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
        this.attacking = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.attackSide = 0;

    }

    preUpdate(time, delta)
    {
        console.log(this.texture.key);

        super.preUpdate(time, delta);
        if (this.jumpCooldown > 0) 
            this.jumpCooldown -= delta;

            if (this.WhileJumpingEvent && this.WhileJumpingEvent.getProgress() === 1) {
                this.WhileJumpingEvent.remove();
            }
        if(this.jumping)
        {
            this.jump();
        } else if(Math.abs(this.body.velocity.x) > 0) {
            if(this.texture.key != "yoshiWalks" && !this.attacking) 
            {
                console.log(this.attacking);
                this.setTexture("yoshiWalks");
                this.anims.play('WalkingMario',true)
            }
        }else if(this.texture.key == "yoshiWalks" && this.texture.key != "yoshiSprites" && !this.attacking)
        {
            this.setTexture("yoshiSprites");
            this.anims.play('yoshiidle');
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

        this.colliderYoshiEnemies = this.scene.physics.add.collider(this, this.scene.enemies, (_yoshi, _enemy) => {
            _yoshi.CollideWithEnemie(_yoshi, _enemy);
            _enemy.CollideWithPlayer(_enemy, _yoshi);
        }, null, this);
    }

    CollideWithEnemie(_yoshi, _enemy)
    {
        if (_yoshi.body.touching.down && _enemy.body.touching.up && _enemy.isVulnerable()) {
            _enemy.getDamage(1, _yoshi.body);
            _yoshi.jump();
        }
        if (!_yoshi.body.touching.down && !_enemy.body.touching.up && _enemy.canDealDamage()) {
            
            // BAJAR MARIO DE YOSHI
        }
    }

    attack()
    {
        if(this.attacking)
            return;
        this.attacking = true;
        this.anims.stop();
        this.setTexture("yoshiTongue");
        this.setFrame(0);
        this.setOffsetOnAttack();
        
        this.scene.time.delayedCall(150, () => {this.setFrame(1)}, [], this);
        this.scene.time.delayedCall(500 + 150, () => {this.setFrame(0)}, [], this);
        this.scene.time.delayedCall(150 + 500 +150, () => {
            this.x -= this.offsetX;
            this.offsetY = 0;
            this.offsetX = 0;
            this.body.setOffset(0,0);

            this.attacking = false;
            this.setTexture("yoshiSprites");
            this.anims.play('yoshiidle');
        }, [], this);

      

    }
    setOffsetOnAttack()
    {
        this.attackSide = this.flipX;
        this.offsetX = this.flipX ? -10 : 10
        if(this.flipX)
        this.body.setOffset(-this.offsetX +11,0);
        this.offsetY = +6;
        this.x += this.offsetX;
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
    startJumping()
    {
        this.setTexture('yoshiSprites');
        this.setFrame(3);
        this.grounded = false;
        this.jumping = true;
        this.yoshiJumpEvent = this.scene.time.delayedCall(gamePrefs.yoshiJumpTime, () => {
            this.jumping = false;
        }, [], this);
    }
    jump()
    {
     
        console.log(gamePrefs.yoshiJump);
        this.body.velocity.y = gamePrefs.yoshiJump;
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
        if(this.attacking && (this.attackSide != this.flipX))
            this.setOffsetOnAttack();
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
        return {x: this.x - 7 * this.sign - this.offsetX,y: this.y - 10 + this.offsetY};
    }
  
}