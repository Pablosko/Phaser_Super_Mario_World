class enemy extends character
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);

    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
   
    isVulnerable()
    {
        return true;
    }
}