class rugby extends enemy {
    constructor(_scene,_posX,_posY,_type) {
        super(_scene,_posX,_posY,'rugby');
        this.anims.play('runRugby')
        this.type = _type;
        this.hp = 3;
        this.canMove = true;
        this.canChangeDirection = true;
        this.crouched = false;
        this.dead = false;
        this.timerEvent = this.scene.time.addEvent({
            delay: 3000,  
            callback: () => { 
                if(this.canChangeDirection)
                {
                    this.changeDirection();
                }
             },  
            callbackScope: this,
            loop: true  
        });
    }

    checkNewPathDir()
    {
        if(this.dead)
            return;

        if (this.scene.mario.body.x < this.x) {
            this.pathDirection = 1;
        } else {
            this.pathDirection = -1;
        }
    }

    changeDirection()
    {
        if(this.dead)
            return;
        this.anims.stop('runRugby')
        this.canMove = false;
        this.canChangeDirection = false;
        this.setFrame(5);
        this.delayed = this.scene.time.delayedCall(500, function () {
            this.canChangeDirection = true;
            this.checkNewPathDir();
            this.canMove = true;
        }, [], this);
    }


    setColliders()
    {
        super.setColliders()
        this.scene.physics.add.collider
        (
            this.character,
            this.scene.enemies,
        );
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
        if(this.canMove)
        {
            this.anims.play('runRugby', true)
            this.body.setVelocityX(-40 * this.pathDirection);
        }
        else {
            // Detener el objeto
            this.body.setVelocityX(0);
        }
    }
    flipSprite()
    {
        this.flipX = this.body.velocity.x < 0;

    }
    CollideWithPlayer(enemie,player)
    {
        if(enemie.body == undefined)
            return;
        super.CollideWithPlayer(enemie,player);
        if(player.body.touching.down && enemie.body.touching.up)
        {
            this.canChangeDirection = false;
            this.canMove = false;
            if(!this.crouched)
            {
                this.anims.play('hitCrouch', true).on('animationcomplete', this.onHitedCrouch, this);
                this.scene.time.delayedCall(1500, function () {
                    this.canChangeDirection = true;
                    this.checkNewPathDir();
                    this.canMove = true;
                    this.crouched = false;
                }, [], this);
                 this.crouched = true;
            }
            else
            {
                this.anims.play('crouchBounceHead', true).on('animationcomplete', this.onHitedCrouch, this);
            }
        }
    }

    onHitedCrouch()
    {
        this.setFrame(7)
    }

    getDamage(damage,body)
    {
        this.hp-= damage

        if(this.hp <= 0)
        {
            this.dead =true;
            this.timerEvent.remove();
            if (this.delayed) {
                this.delayed.remove();
            }
            this.destroy(this);
        }
    }
}