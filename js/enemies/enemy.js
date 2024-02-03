class enemy extends character
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        this.pathDirection = 1;

    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
        this.flipX = this.body.velocity.x > 0;

    }
    collideWithEnemie(enemie1,enemie2)
    {
        this.pathDirection *= -1;
    }
    CollideWithPlayer(enemie,player)
    {
        
    }
    isVulnerable()
    {
        return true;
    }
}