class koopa extends enemy
{
    constructor(_scene,_posX,_posY,_type)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'koopa');
        this.anims.play(_type)
        this.type = _type;
        this.hp = 2;
        this.canMove = true;
        this.direction = 1;

       
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
        if(this.canMove)
            this.body.setVelocityX(-20 * this.direction);
    }
    transformToLittle()
    {
        this.body.setSize(16,16).setOffset(0,0);
        this.body.y += 16;
        this.anims.play(this.type + '_shell');
        this.body.setVelocityX(0);
        this.setDepth(2);
        this.canMove = false;

    }
    getDamage(damage,body)
    {
        console.log(this.hp);
        this.hp-= damage
        this.dir = Math.sign(this.body.x - body.x)
        if(this.hp == 1)
        {
            this.isShell = true;
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
        this.body.setVelocityX(20000 * dir);
        this.canMove = false;
    }
}