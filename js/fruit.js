class fruit extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY)
    { //instanciar el objeto
        super(_scene,_posX,_posY,'fruit');
        _scene.add.existing(this);
        this.scene = _scene;

      
    }
    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }
}