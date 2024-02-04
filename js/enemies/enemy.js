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
        this.flipSprite();
    }

    flipSprite()
    {
        this.flipX = this.body.velocity.x > 0;

    }

    collideWithEnemie(enemie1,enemie2)
    {
        this.pathDirection *= -1;
    }
    CollideWithPlayer(enemie,player)
    {
        
    }

    canDealDamage()
    {
        return true;
    }

    isVulnerable()
    {
        return true;
    }
}





























































































































































/*
if(this.body == 'mujer' && this.body.isAlive == true)
    if(this.age < 18)
    {
        this.time.delayedCall(69, this.goPrision(), [], this);
        return this.canFuck = true;
    }
    return this.canFuck = true
*/