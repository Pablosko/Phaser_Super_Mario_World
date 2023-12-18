class koopa extends enemy
{
    constructor(_scene,_posX,_posY,_type)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'koopa');
        this.anims.play(_type)
        this.type = _type;
        this.hp = 2;
        this.canMove = true;
        this.dash = false;
        this.isShell = false;


       
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
        if(this.canMove && !this.isShell)
            this.body.setVelocityX(-20 * this.pathDirection);
    }
    CollideWithPlayer(enemie,player)
    {
        console.log("mario collide sheel")
        super.collideWithEnemie(enemie,player);
        console.log(this.isShell);

        if(this.isShell && this.canMove)
        {
            this.dir = Math.sign(this.body.x - player.x);
            this.trowShell(this.dir)
        }
    }
    trowShell(dir)
    {
        this.canMove = true;
        this.body.setVelocityX(dir * 150);
    }
    transformToLittle()
    {
        this.body.setSize(16,16).setOffset(0,0);
        this.body.y += 16;
        this.anims.play(this.type + '_shell');
        this.body.setVelocityX(0);
        this.setDepth(2);
        this.canMove = false;
        this.isShell = true;
        this.scene.time.addEvent
        (
            {
                delay: 5, //ms
                callback:  ()=>{this.canMove = true;},
                callbackScope:  this,
                repeat: 1
            }
        );


    }
    getDamage(damage,body)
    {
        console.log(this.hp);
        this.hp-= damage
        this.dir = Math.sign(this.body.x - body.x)
        if(this.hp == 1)
        {
            this.transformToLittle();
            this.scene.CreateLittleKoopa(this.body.x,this.body.y,this.dir,this.type);
        }
        if(this.hp <= 0)
            this.destroy(this);
    }
    OnUnShelled(dir)
    { 
        this.hp = 1;
        this.body.setSize(16,16).setOffset(0,0);
        console.log(dir)
        
        this.canMove = false;
        this.scene.time.addEvent
        (
            {
                delay: 1, //ms
                callback:  ()=>{this.body.setVelocityX(200 * dir);},
                callbackScope:  this,
                repeat: 1
            }
        );
        this.scene.time.addEvent
        (
            {
                delay: 300, //ms
                callback:  ()=>{this.body.setVelocityX(0);},
                callbackScope:  this,
                repeat: 1
            }
        );
        this.scene.time.addEvent
        (
            {
                delay: 350, //ms
                callback:  ()=>{this.canMove = true; this.pathDirection = dir},
                callbackScope:  this,
                repeat: 1
            }
        );
    }
}