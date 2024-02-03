class topo extends enemy
{
    constructor(_scene,_posX,_posY,_type)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'topo');
        this.type = _type;
        this.canMove = false;
        this.body.setImmovable(false);
        this.body.setAllowGravity(false);

        //setear animacion de aparicion on complete Y and then collider on y walk
        
    }

    enableTopo()
    {
        this.setVisible(true);
        if(this.type = "topoFloor")
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
        if(this.type = "topoFlorr")
        {
            
        }
        this.timerEvent = this.time.addEvent({
            delay: 1500,  
            callback: this.jump,  
            callbackScope: this,
            loop: true  
        });
    }

    jump()
    {
        console.log("jump")
    }

    setColliders()
    {
        super.setColliders()
        this.scene.physics.add.collider
        (
            this.character,
            this.scene.enemies,
        );
        
        this.scene.physics.add.collider
        (
            this.character,
            this.scene.walls
        );
        this.scene.physics.add.collider
        (
            this.character,
            this.scene.pipes
        )
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
        if(this.canMove)
            this.body.setVelocityX(-20 * this.pathDirection);
    }
    CollideWithPlayer(enemy,player)
    {
        if(enemy.body ==undefined)
            return;
        console.log("mario collide sheel")
        super.CollideWithPlayer(enemy,player);
        if(enemy.canMove)
        {
            enemy.dir = Math.sign(enemy.body.x - player.body.x);
            enemy.trowShell(enemy.dir);
        }else
        {
            //mario get damage
        }
    }

    killTopo()
    {
        //Give points
        this.destroy(this);
    }

    collideWithEnemie(enemie1,enemie2)
    {
        super.collideWithEnemie(enemie1,enemie2)        
        
        if(enemie1.body.velocity.x != 0)
        {
            console.log(enemie1.body.velocity)
            console.log(enemie2)
            console.log("kill koopa")
            enemie2.getDamage(2000,enemie1);            
        }
    }
}