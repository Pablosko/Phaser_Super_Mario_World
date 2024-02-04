class topo extends enemy
{
    constructor(_scene,_posX,_posY,_type)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'topo');
        this.type = _type;
        this.canMove = false;
        this.hp = 1;
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
        this.enableObject = false;
        
        this.areaZone = this.scene.add.zone(_posX, _posY);     
        this.areaZone.setSize(128, 128);
        this.scene.physics.world.enable(this.areaZone);
        this.areaZone.body.setImmovable();
        this.areaZone.body.setAllowGravity(false);
        this.setColliders();
        this.spawned = false;
        this.setVisible(false);    
        this.canChangeDirection = true;
        this.timerEvent = this.scene.time.addEvent({
            delay: 2000,  
            callback: () => { 
                if(this.canChangeDirection && this.canMove)
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
        this.canMove = false;
        this.canChangeDirection = false;
        this.delayed = this.scene.time.delayedCall(500, function () {
            this.canChangeDirection = true;
            this.checkNewPathDir();
            this.canMove = true;
        }, [], this);
    }

    enableTopo()
    {
        this.setVisible(true);
        if(this.type === "topoFloor")
        {
            this.anims.play('spawnTopoFloor', true).on('animationcomplete', this.onSpawnComplete, this);
        }
        else
        {
            this.anims.play('spawnTopoWall', true).on('animationcomplete', this.onSpawnComplete, this);
        }

    }

    onSpawnComplete()
    {
        this.setFrame(2);
        this.moveTween = this.scene.tweens.add({
            targets: this,
            y:  this.y - 100,
            duration: 1000,
            yoyo: false,
            repeat: 0,
            onComplete: () => {
                this.body.setImmovable(false);
                this.body.setAllowGravity(true);
                this.canMove = true;
                this.spawned = true;
            }
        });
    }

    jump()
    {
        console.log("jump")
        this.timerEvent = this.time.addEvent({
            delay: 1500,  
            callback: this.jump,  
            callbackScope: this,
            loop: true  
        });
    }


    setColliders()
    {
        super.setColliders()

        this.overlapthing = this.scene.physics.add.overlap(
            this.scene.mario,
            this.areaZone,
            () => {
                if(!this.enableObject)
                {
                    this.enableObject = true;
                }
            },
            null,
            this
        );
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
        if(this.canMove)
        {
            this.anims.play('walkTopo', true)
            this.body.setVelocityX(-30 * this.pathDirection);
        }

        if(this.enableObject)
        {
            this.enableTopo();
            this.overlapthing.active = false;
            this.enableObject = false;
        }
    }
    CollideWithPlayer(enemy,player)
    {
        if(enemy.body == undefined)
            return;
        console.log("mario collide sheel")
        super.CollideWithPlayer(enemy,player);

    }
}