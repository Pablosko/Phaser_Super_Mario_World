class redKoopa extends character
{
    constructor(_scene,_posX,_posY)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'redKoopa');
        this.anims.play('RedKoopaIdle')
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}